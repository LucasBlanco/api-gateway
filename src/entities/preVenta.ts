interface IPreVentaOut {
    hola: string;
}

interface IPreVentaIn {
    chau: string;
}

const mapToOutput = (preVenta: IPreVentaIn): IPreVentaOut => {
    return {
        hola: preVenta.chau,
    };
};

const mapToInput = (preVenta: IPreVentaOut): IPreVentaIn => {
    return {
        chau: preVenta.hola,
    };
};

export { mapToOutput, mapToInput };
