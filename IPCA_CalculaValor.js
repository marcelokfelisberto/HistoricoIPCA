import historicoInflacao from './dados_ipca.js';
import {VerificaValor} from './IPCA_ValidaParametros.js'
import {RetornaPeriodo} from './IPCA_ConsultaDados.js'

function RetornaValor(BaseDeCalculo,ANOi,MESi,ANOf,MESf) {

    let IPCAPeriodo = RetornaPeriodo(ANOi,MESi,ANOf,MESf);
    if (IPCAPeriodo[0]==false) {return IPCAPeriodo}
    let msg = VerificaValor(BaseDeCalculo);
    if (msg[0]) {
        let fim = IPCAPeriodo.length;
        let valor = BaseDeCalculo;
        let taxa = 0;
        for (let i=0; i<fim; i++) {
            taxa = IPCAPeriodo[i].ipca;
            valor*=(1+taxa/100);
        }
        return [msg[0], valor.toFixed(2)];
    } else {return msg}
}
/*
let ANOi = 2015;
let MESi = 1;
let ANOf = 2015;
let MESf = 12;
let BaseDeCalculo = 1000.00;
console.log(RetornaValor(BaseDeCalculo,ANOi,MESi,ANOf,MESf));
*/
export default RetornaValor;