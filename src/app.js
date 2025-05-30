import express from 'express';
import beneficiariosRoutes from './routes/beneficiarios.routes.js';

const app = express();
app.use(express.json());
app.use('api/', beneficiariosRoutes) ;






export default app;