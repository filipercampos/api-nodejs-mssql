'use strict';

const BaseController = require('./baseController');
const VeiculoRepository = require('../domain/repositories/veiculoRepository');

class VeiculoController extends BaseController {
    constructor() {
        super(new VeiculoRepository());;
    }
}
 
module.exports = new VeiculoController();