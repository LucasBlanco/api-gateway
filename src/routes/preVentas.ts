
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { preVentaServer, joaquin } from './serverRoutes';
import { createRequestHandler, map } from './requestHelper';
import { mapToOutput } from 'src/entities/preVenta';

// Init shared

const { router, createPromise, combinePromises, ...request } = createRequestHandler(joaquin);

request.post('/saludar', mapToOutput);

const queryJoaquim = combinePromises([
    createPromise().get('prueba1'),
    createPromise().get('prueba2'),
]);

request.get('/joaquin', queryJoaquim);

router.get('/hola', async (req: Request, res: Response) => {
    try {
        return res.status(OK).json({ hola: 'Hola' });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default router;
