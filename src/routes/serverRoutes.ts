interface IServer {
    url: string,
    port: number
}

const preVentaServer: IServer = {
    url: 'http://localhost',
    port: 3000
};

const joaquin: IServer = {
    url: 'http://authService.test',
    port: 8000
}

export { preVentaServer, joaquin, IServer };
