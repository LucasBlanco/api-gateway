
import { controlesServer, preVentaServer } from '@servers';
import { createRequestHandler, createCombinedEmitter, createParalellEmitter } from '@shared';
import { mapAuditoriaOut, mapAuditoriaIn } from '@entities';
import { mapValidacionOut, mapValidacionIn } from '@entities';
// Init shared

const { router, emit, receive } = createRequestHandler();

const controlesRoute = controlesServer.url;
const preventaRoute = preVentaServer.url + '/preventas';
const oldRoute = 'http://ventaslaravel.test';

/* AUDITORIA */
receive.post({
    ruta: '/auditoria/auditar',
    emit: createParalellEmitter({
        emitters: [
            emit.post({ ruta: controlesRoute + '/auditorias' }),
            emit.post({ ruta: oldRoute + '/auditoria/auditar' }),
        ], // TODO: Dejar de paralelizar
    }),
});

receive.get({
    ruta: '/auditoria/all',
    emit: createParalellEmitter({
        emitters: [
            emit.get({ ruta: preventaRoute + '/auditables' }),
            emit.get({ ruta: oldRoute + '/auditoria/all' }),
        ], // TODO: Dejar de paralelizar
    }),
});

receive.get({
    ruta: '/auditoria/ventasParaAuditar',
    emit: createParalellEmitter({
        emitters: [
            emit.get({ ruta: preventaRoute + '/auditorias' }),
            emit.get({ ruta: oldRoute + '/auditoria/all' }),
        ], // TODO: Dejar de paralelizar
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
