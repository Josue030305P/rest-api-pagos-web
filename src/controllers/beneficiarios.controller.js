import { pool } from '../db.js';

export const getBeneficiarios = async (req, res) => {
  const [rows] = await pool.query("CALL sp_getAll_beneficiarios()");
  res.json(rows);
};