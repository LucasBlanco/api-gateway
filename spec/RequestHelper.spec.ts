
import request from 'request-promise-native';
import allSettled from 'promise.allsettled';

describe('Request Helper', () => {

    const urlTest1 = 'http://localhost:3000/testApiGateway1';
    const urlTest2 = 'http://localhost:3000/testApiGateway2';
    const urlTestCombinada = 'http://localhost:3000/testCombinedEmitter';
    const urlTestSuccessParalell = 'http://localhost:3000/testParalellSuccessEmitter';
    const urlTestParcialErrorParalell = 'http://localhost:3000/testParalellParcialErrorEmitter';
    const urlTestCompleteErrorParalell = 'http://localhost:3000/testParalellCompleteErrorEmitter';
    const urlTestConQueryParams = 'http://localhost:3000/testApiGatewayConId';
    const urlTestConDosQueryParams = 'http://localhost:3000/testApiGatewayConDosId';

    describe('Redireccion simple para get', () => {
        it('Deberia devolver GET', () => {
            return request({
                uri: urlTest1,
                json: true,
            }).then((response) => expect(response).toBe('GET'));
        });
    });

    describe('Redireccion con una combinacion doble para get', () => {
        it('Deberia devolver [GET, GET]', () => {
            return request({
                uri: urlTestCombinada,
                json: true,
            }).then((response) => expect(response).toEqual(['GET', 'GET']));
        });
    });

    describe('Un Query params', () => {
        it('Deberia devolver 1', () => {
            return request({
                uri: urlTestConQueryParams + '/1',
                json: true,
            }).then((response) => expect(response).toEqual({ id: '1' }));
        });
    });

    describe('Multiples Query params', () => {
        it('Deberia devolver 1', () => {
            return request({
                uri: urlTestConDosQueryParams + '/1/2',
                json: true,
            }).then((response) => expect(response).toEqual({ id: '1', id2: '2' }));
        });
    });

    describe('Querys paralelas', () => {
        it('Deberia devolver GET', () => {
            return request({
                uri: urlTestSuccessParalell,
                json: true,
            }).then((response) => expect(response).toEqual('GET'));
        });

        it('Deberia devolver GET', () => {
            return request({
                uri: urlTestParcialErrorParalell,
                json: true,
            }).then((response) => expect(response).toEqual('GET'));
        });
        it('Deberia devolver Error', () => {
            return request({
                uri: urlTestCompleteErrorParalell,
                json: true,
            }).catch((response) => expect(response).toEqual({
                'error': 'StatusCodeError: 404 - "Not Found"'
            }));

        });
    });

});
