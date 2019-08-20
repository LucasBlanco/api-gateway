export interface IPreVentaOut {
    hola: string;
}

export interface IPreVentaIn {
    chau: string;
}

export const mapToOutput = (preVenta: IPreVentaIn): IPreVentaOut => {
    return {
        hola: preVenta.chau,
    };
};

export const mapToInput = (preVenta: IPreVentaOut): IPreVentaIn => {
    return {
        chau: preVenta.hola,
    };
};

