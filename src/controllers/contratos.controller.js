import { pool } from "../db.js";
import { Pago } from "../helper.js";

export const getContratos = async (req, res) => {
  try {
    const querySQL = "SELECT * FROM list_contratos";
    const [results] = await pool.query(querySQL);

    res.json(results);
  } catch (error) {
    res.send("ERROR: ", error);
  }
};
export const addContrato = async (req, res) => {
    const { idbeneficiario, monto, interes, fechainicio, diapago, numcuotas } = req.body;

    if (
        monto <= 0 || interes < 0 || numcuotas <= 0 || diapago < 1 || diapago > 31
    ) {
        return res.status(400).json({ status: false, message: "Valores de contrato inválidos." });
    }

    try {
        const [contratoResultSets] = await pool.query("CALL sp_add_contrato(?, ?, ?, ?, ?, ?)", [
            idbeneficiario,
            monto,
            interes,
            fechainicio,
            diapago,
            numcuotas,
        ]);

        const idcontrato = contratoResultSets[0]?.[0]?.idcontrato;

        if (!idcontrato) {
            return res.status(500).json({
                status: false,
                message: "Error al obtener el ID del contrato generado por el SP. Asegúrate de que el SP devuelve SELECT LAST_INSERT_ID() AS idcontrato;",
            });
        }

        const tasaPeriodica = interes / 100;
        const valorCuotaFija =
            Math.round(Pago(tasaPeriodica, numcuotas, monto) * 100) / 100;

        for (let i = 1; i <= numcuotas; i++) {
            
            //console.log(`Cuota ${i}: idcontrato=${idcontrato}, numcuota=${i}, fechapago=NULL, monto=${valorCuotaFija}, penalidad=0, medio=NULL`);

            await pool.query(
                "INSERT INTO pagos(idcontrato, numcuota, fechapago, monto, penalidad, medio) VALUES (?,?,?,?,?,?)",
                [
                    idcontrato,
                    i,
                    null,       
                    valorCuotaFija,
                    0.00,         
                    null          
                ]
            );
        }

        res.status(201).json({
            status: true,
            message: "Contrato y cuotas iniciales registrados exitosamente (fechas de pago pendientes).",
            idcontrato: idcontrato,
        });

    } catch (error) {
        console.error("Error al registrar contrato y cuotas:", error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: false, message: 'Error: Datos duplicados. (Ej. DNI, Contrato).' });
        }
        res.status(500).json({ status: false, message: "Error interno del servidor al registrar contrato y/o cuotas." });
    }
};