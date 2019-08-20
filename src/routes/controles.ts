
import { controlesServer } from './serverRoutes';
import { createRequestHandler, createCombinedEmitter } from './requestHelper';
import { mapAuditoriaOut, mapAuditoriaIn } from '@entities';
import { mapValidacionOut, mapValidacionIn } from '@entities';
import { Router } from 'express';
// Init shared

const { router, emit, receive } = createRequestHandler(controlesServer);

/* AUDITORIA */
receive.post({
    ruta: '/auditoria/auditar',
    emit: emit.post({
        ruta: '/auditorias',
    }),
});

receive.get({
    ruta: '/auditoria/all',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

receive.get({
    ruta: '/auditoria/ventasParaAuditar',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

/* VALIDACION */
receive.post({
    ruta: '/validacion/validar',
    emit: emit.post({
        ruta: '/validaciones/?XDEBUG_SESSION_START=PHPSTORM',
        mapRequest: mapValidacionOut,
    }),
});

receive.get({
    ruta: '/validacion/all',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

receive.get({
    ruta: '/validacion/ventasAValidar',
    emit: emit.get({
        ruta: '', // TODO: Completar ruta
    }),
});

export default router;
