import { Router } from 'express';
import UserRouter from './Users';
import PreVentaRouter from './preVentas';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/preVenta', PreVentaRouter);

// Export the base-router
export default router;
