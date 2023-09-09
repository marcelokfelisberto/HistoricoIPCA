import historicoInflacao from './dados_ipca.js';

function VerificaValor (valor) {
    let msg = [true, 'Parâmetro VALOR ok!'];
    if (valor<=0 || isNaN(valor)) { msg[0]=false; msg[1]='ERRO 404: Parâmetro VALOR Inválido';}
    return msg;
}

function VerificaAno (ano) {
    let min=historicoInflacao[0].ano;
    let max=historicoInflacao[historicoInflacao.length-1].ano;
    let msg = [true, 'Parâmetro ANO ok!'];
    if (ano<min || ano>max) {msg[0]=false; msg[1]='ERRO 400: ANO não encontrado';}
    if (isNaN(ano))         {msg[0]=false; msg[1]='ERRO 404: Parâmetro ANO Inválido';}
    return msg;
} 

function VerificaPeriodo (iniANO,iniMES,fimANO,fimMES) {
    let anomin=historicoInflacao[0].ano;
    let anomax=historicoInflacao[historicoInflacao.length-1].ano;
    let mesmin=historicoInflacao[0].mes;
    let mesmax=historicoInflacao[historicoInflacao.length-1].mes;
    let msg = [true, 'Período ok!'];
    if (iniMES<1 || iniMES>12 || isNaN(iniMES) || fimMES<1 || fimMES>12 || isNaN(fimMES) || isNaN(iniANO) || isNaN(fimANO) || fimANO<iniANO || (fimANO==iniANO && fimMES<iniMES)) {
        msg[0]=false;
        msg[1]='ERRO 404: Período Inválido';
    }
    if (iniANO<anomin || (iniANO==anomin && iniMES<mesmin) || fimANO>anomax || (fimANO==anomax && fimMES>mesmax) ) {
        msg[0]=false;
        msg[1]='ERRO 400: Período Indisponível';
    }
    return msg;
}

function VerificaID (ID) {
    let msg = [true, 'Parâmetro ID ok!'];
    let IDmax=historicoInflacao[historicoInflacao.length-1].id;
    if (ID<1 || ID>IDmax || isNaN(ID)) { msg[0]=false; msg[1]='ERRO 404: Parâmetro ID Inválido';}
    return msg;
}

export {VerificaValor, VerificaAno, VerificaPeriodo, VerificaID}