import express from 'express';
import beneficiariosRoutes from './routes/beneficiarios.routes.js';
import contratosRoutes from './routes/contratos.routes.js';
const app = express();
app.use(express.json());


app.use('/api', beneficiariosRoutes) ;
app.use('/api/',contratosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});




export default app;