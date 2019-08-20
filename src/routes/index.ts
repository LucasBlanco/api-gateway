import { Router } from 'express';
import PreVentaRouter from './preVentas';
import ControlesRouter from './controles';
import UsuariosRouter from './usuarios';
import AdministracionRouter from './administracion';
import LiquidacionRouter from './liquidacion';
import LogisticaRouter from './logistica';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/', ControlesRouter);
router.use('/', PreVentaRouter);
router.use('/', UsuariosRouter);
router.use('/', AdministracionRouter);
router.use('/', LiquidacionRouter);
router.use('/', LogisticaRouter);

// Export the base-router
export default router;
