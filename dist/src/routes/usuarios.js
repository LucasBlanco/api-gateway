"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _shared_1 = require("@shared");
const _servers_1 = require("@servers");
const { router, emit, receive } = _shared_1.createRequestHandler(_servers_1.usuariosServer);
receive.post({
    ruta: '/usuario/create',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/usuario/cambiarPasswordPropia',
    emit: emit.post({
        ruta: '',
    }),
});
receive.post({
    ruta: '/usuario/cambiarPassword',
    emit: emit.post({
        ruta: '',
    }),
});
receive.delete({
    ruta: '/usuario/delete/:id',
    emit: emit.delete({
        ruta: '',
    }),
});
receive.post({
    ruta: '/usuario/habilitar',
    emit: emit.post({
        ruta: '',
    }),
});
receive.put({
    ruta: '/usuario/update/:id',
    emit: emit.put({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/all',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/paraCreacion',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/paraModificacion',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/paraRecuperarVenta',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/subordinables',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/get/:id',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/paraLogistica/:idPerfil',
    emit: emit.get({
        ruta: '',
    }),
});
receive.get({
    ruta: '/usuario/perfiles',
    emit: emit.get({
        ruta: '',
    }),
});
exports.default = router;
