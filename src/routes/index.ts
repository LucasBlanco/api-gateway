import { Router } from 'express';
import PreVentaRouter from './preVentas';
import ControlesRouter from './controles';
import UsuariosRouter from './usuarios';
import AdministracionRouter from './administracion';
import LiquidacionRouter from './liquidacion';
import LogisticaRouter from './logistica';
import TestRouter from 'spec/testRequestHelperServer';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/', ControlesRouter);
router.use('/', PreVentaRouter);
router.use('/', UsuariosRouter);
router.use('/', AdministracionRouter);
router.use('/', LiquidacionRouter);
router.use('/', LogisticaRouter);
router.use('/', TestRouter);

// Export the base-router
export default router;
