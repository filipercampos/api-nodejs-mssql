/**
 * Author: Filipe Campos
 * Description: Realiza testes 'calc.demo.js'
 * Data: 01/07/2020
 *
 * Documentação: http://chaijs.com/guide/styles/#assert
 *
 */

const chai = require('chai');
const calc = require('./demo');
const assert = chai.assert;

//describe => descrevendo o cenário de teste 
describe('TDD Calculadora', () => {

    //it => permite criar uma cadeia de testes e os casos de teste. 
    //asserts => são justamente o que queremos testar
    it('Teste: Adição 2 Números', () => {
        const op = calc.add(5, 5);
        const r = 10;
        assert.equal(op, r);
    });

    it('Teste: Subtração 2 Números', () => {
        const op = calc.sub(10, 5);
        const r = 5;
        assert.equal(op, r);
    });

    it('Teste: Multiplicação 2 Números', () => {
        const op = calc.mult(10, 5);
        const r = 50;
        assert.equal(op, r);
    });

    it('Teste: Divisão 2 Números', () => {
        const op = calc.div(18, 2);
        const r = 9;
        assert.equal(op, r);
    });
});