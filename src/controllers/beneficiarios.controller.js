import { pool } from '../db.js';

 export const getBeneficiarioById = async (req, res) => {

   try {
    const querySQL = "CALL sp_getBYID_beneficiarios(?)";
    const {id} = req.params;

    const [results] = await pool.query(querySQL, [id]);
    if (results.length === 0 ) {
      return res.status(404).json({
        status:false,
        message:'Beneficiario no encontrado'
      });
    }else {
      res.send(results[0]);
    }

   } catch(error) {
     res.send("Se ha generado un error", error); 
   }

 };

export const getBeneficiarios = async (req, res) => {
  const [rows] = await pool.query("CALL sp_getAll_beneficiarios()");
  res.json(rows[0]);
};

export const addBeneficiarios = async (req, res) => {

  try {
    const querySQL = "CALL sp_add_beneficiario(?,?,?,?,?)";
    const {apellidos, nombres, dni, telefono, direccion} = req.body;
    const [results] = await pool.query(querySQL, [
      apellidos,
      nombres,
      dni,
      telefono,
      direccion
    ]);
    if (results.affectedRows === 0) {
      res.json({status:false, message:'Error al crear el beneficiario'});
    } else {
      res.json({
        status:true,
        message:"Beneficiario creado",
      })
    }
    res.send(results);

  } catch(error) {
    res.json("Ha sucedido un error", error);
  }
};

export const updateBeneficiario = async (req, res) => {

  try{

    const querySQL = "CALL sp_update_beneficiario(?,?,?,?,?,?)";
    const {id} = req.params;
    const {apellidos, nombres, dni, telefono, direccion} = req.body;
    const [results] = await pool.query(querySQL,[
      id,
      apellidos,
      nombres,
      dni,
      telefono,
      direccion,
    ]);

    if ( results.affectedRows === 0) {
      return res.status(404).json({
        status:false,
        message:'Beneficiario no encontrado'
      });
    } else {
      return res.send({
        status:true,
        message:'Beneficiario actualizado'
      });
    }

  }
  catch(error) {
    res.send('Error: ', error);
  }
};