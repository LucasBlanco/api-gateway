
import { createRequestHandler } from '@shared';
import { usuariosServer } from '@servers';

const { router, emit, receive } = createRequestHandler(usuariosServer);

receive.post({
    ruta: '/usuario/create',
    emit: emit.post({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.post({
    ruta: '/usuario/cambiarPasswordPropia',
    emit: emit.post({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.post({
    ruta: '/usuario/cambiarPassword',
    emit: emit.post({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.delete({
    ruta: '/usuario/delete/:id',
    emit: emit.delete({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.post({
    ruta: '/usuario/habilitar',
    emit: emit.post({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.put({
    ruta: '/usuario/update/:id',
    emit: emit.put({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/all',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/paraCreacion',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/paraModificacion',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/paraRecuperarVenta',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/subordinables',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/get/:id',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/paraLogistica/:idPerfil',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});
receive.get({
    ruta: '/usuario/perfiles',
    emit: emit.get({
        ruta: '', /* TODO: Completar ruta*/
    }),
});

export default router;
