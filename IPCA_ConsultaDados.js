import historicoInflacao from './dados_ipca.js';
import {VerificaValor, VerificaAno, VerificaPeriodo, VerificaID} from './IPCA_ValidaParametros.js'

function RetornaAno(ANO) {
    let msg = VerificaAno(ANO);
    if (msg[0]) {return historicoInflacao.filter(indice => indice.ano == ANO)}
    else {return msg}
}

function RetornaID(ID) {
    let msg = VerificaID(ID);
    if (msg[0]) {return historicoInflacao.filter(indice => indice.id == ID)}
    else {return msg}
}

function RetornaPeriodo(ANOi,MESi,ANOf,MESf) {
    let msg = VerificaPeriodo(ANOi,MESi,ANOf,MESf);
    let INI = Number(ANOi+''+MESi);
    let FIM = Number(ANOf+''+MESf);
    if (msg[0]) {return historicoInflacao.filter(ID => ((Number(ID.ano+''+ID.mes))>=INI)&&((Number(ID.ano+''+ID.mes))<=FIM)) }
    else {return msg}
}

function RetornaTudo() {
    return historicoInflacao;
}

/*
console.log(RetornaTudo());

let ID = 18;
console.log(RetornaID(ID));

let ANO = 2015;
console.log(RetornaAno(ANO));

let ANOi = 2023;
let MESi = 3;
let ANOf = 2023;
let MESf = 5;
console.log(RetornaPeriodo(ANOi,MESi,ANOf,MESf));
*/
export {RetornaAno, RetornaID, RetornaPeriodo, RetornaTudo}