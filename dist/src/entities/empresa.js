"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function mapToInput(empresa) {
    const { razon_social } = empresa, datosEmpresa = tslib_1.__rest(empresa, ["razon_social"]);
    return Object.assign({ empresa: razon_social }, datosEmpresa);
}
exports.mapToInput = mapToInput;
function mapToOutput(_empresa) {
    const { empresa } = _empresa, datosEmpresa = tslib_1.__rest(_empresa, ["empresa"]);
    return Object.assign({}, datosEmpresa, { razon_social: empresa });
}
exports.mapToOutput = mapToOutput;
