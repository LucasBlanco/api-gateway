export interface IServer {
    url: string;
}

export const preVentaServer: IServer = {
    url: 'http://preventaservice.test:8000',
};

export const controlesServer: IServer = {
    url: 'http://controles.test',
};

export const usuariosServer: IServer = {
    url: 'http://usuarios.test',
};

export const administracionServer: IServer = {
    url: 'http://administracion.test'
};

export const logisticaServer: IServer = {
    url: 'http://logistica.test'
};

export const liquidacionServer: IServer = {
    url: 'http://liquidacion.test'
};
