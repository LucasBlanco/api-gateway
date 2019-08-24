"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _servers_1 = require("@servers");
const _shared_1 = require("@shared");
const _entities_1 = require("@entities");
const { router, emit, receive } = _shared_1.createRequestHandler(_servers_1.controlesServer);
receive.post({
    ruta: '/auditoria/auditar',
    emit: emit.post({
        ruta: '/auditorias',
    }),
});
receive.get({
    ruta: '/auditoria/all',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/auditoria/ventasParaAuditar',
    emit: emit.get({
        ruta: '',
    }),
});
receive.post({
    ruta: '/validacion/validar',
    emit: emit.post({
        ruta: '/validaciones/?XDEBUG_SESSION_START=PHPSTORM',
        mapRequest: _entities_1.mapValidacionOut,
    }),
});
receive.get({
    ruta: '/validacion/all',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/validacion/ventasAValidar',
    emit: emit.get({
        ruta: '',
    }),
});
exports.default = router;
