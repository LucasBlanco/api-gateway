"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _servers_1 = require("@servers");
const _shared_1 = require("@shared");
const { router, emit, receive } = _shared_1.createRequestHandler(_servers_1.liquidacionServer);
receive.get({
    ruta: '/liquidacion/user',
    emit: emit.get({
        ruta: '',
    }),
});
receive.post({
    ruta: '/liquidacionAdmin/liquidar',
    emit: emit.post({
        ruta: '',
    }),
});
receive.get({
    ruta: '/liquidacionAdmin/completa',
    emit: emit.get({
        ruta: '',
    }),
});
exports.default = router;
