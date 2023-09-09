import {RetornaAno, RetornaID, RetornaPeriodo, RetornaTudo} from './IPCA_ConsultaDados.js';
import RetornaValor from './IPCA_CalculaValor.js';
import express from 'express';
const app = express();

console.log('1a rota:    localhost:8080/historicoIPCA/calculo');
console.log('parametros: mesInicial, anoInicial, mesFinal, anoFinal');
console.log('2a rota:    localhost:8080/historicoIPCA/[id]');
console.log('3a rota:    localhost:8080/historicoIPCA');
console.log('parametros: ano, ou deixar em branco p/ retornar todo o histórico');


app.get('/historicoIPCA/calculo', (req, res) => {
    let valor = req.query.valor;
    let mesInicial = req.query.mesInicial;
    let anoInicial = req.query.anoInicial;
    let mesFinal = req.query.mesFinal;
    let anoFinal = req.query.anoFinal;
    let msg = RetornaValor(valor, anoInicial, mesInicial, anoFinal, mesFinal);
    if (msg[0]) {res.json({"Valor Atualizado" : msg[1]})}
    else {
        if (msg[1].includes('404')) res.status(404).json({"ERRO" : msg[1]});
        if (msg[1].includes('400')) res.status(400).json({"ERRO" : msg[1]});
    }
});

app.get('/historicoIPCA/:ID', (req, res) => {
    let ID = Number(req.params.ID);
    let msg = RetornaID(ID); console.log(msg);
    if (msg[0]!=false) {res.json(msg)}
    else {
        if (msg[1].includes('404')) res.status(404).json({"ERRO" : msg[1]});
        if (msg[1].includes('400')) res.status(400).json({"ERRO" : msg[1]});
    }
});

/*
app.get('/historicoIPCA', (req, res) => {
    res.json(RetornaTudo())
});
*/

app.get('/historicoIPCA', (req, res) => {
    let ano = req.query.ano;
    if (isNaN(ano)) {
        res.json(RetornaTudo())
    } else {
        let msg = RetornaAno(ano);
        if (msg[0]) {res.json(msg)
        } else {
            if (msg[1].includes('404')) res.status(404).json({"ERRO" : msg[1]});
            if (msg[1].includes('400')) res.status(400).json({"ERRO" : msg[1]});
        }
    }
});

/*
app.get('/historicoIPCA', (req, res) => {
    let mesInicial = req.query.mesInicial;
    let anoInicial = req.query.anoInicial;
    let mesFinal = req.query.mesFinal;
    let anoFinal = req.query.anoFinal;
    let msg = RetornaPeriodo(anoInicial, mesInicial, anoFinal, mesFinal);
    if (msg[0]) {res.json(msg)}
    else {
        if (msg[1].includes('404')) res.status(404).json({"ERRO" : msg[1]});
        if (msg[1].includes('400')) res.status(400).json({"ERRO" : msg[1]});
    }
});
*/

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080');
});





//--------------------------------------------------------------------------------------------------------------------------------------
/*
import express from 'express';
import { buscarHistorico, buscarHistoricoPorAno, buscarHistoricoPorId, calcularReajuste, validacaoErro } from './servicos/servico.js';

const app = express();

app.get('/historicoIPCA/calculo', (req, res) => {
  const valor = parseFloat(req.query.valor);
  const dataInicialMes = parseInt(req.query.mesInicial);
  const dataInicialAno = parseInt(req.query.anoInicial);
  const dataFinalMes = parseInt(req.query.mesFinal);
  const dataFinalAno = parseInt(req.query.anoFinal);

  if (validacaoErro(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno)) {
    res.status(400).json({ erro: 'Parâmetros inválidos' });
    return;
  }

  const resultado = calcularReajuste(valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno);
  res.json({ resultado: resultado });
});

app.get('/historicoIPCA/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(404).json({ erro: 'ID inválido' });
    return;
  }

  const elemento = buscarHistoricoPorId(id);
  if (elemento) {
    res.json(elemento);
  } else {
    res.status(404).json({ erro: 'Elemento não encontrado' });
  }
});

app.get('/historicoIPCA', (req, res) => {
  const ano = parseInt(req.query.ano);

  if (isNaN(ano)) {
    res.json(buscarHistorico());
  } else {
    const resultado = buscarHistoricoPorAno(ano);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.status(404).json({ erro: 'Nenhum histórico encontrado para o ano especificado' });
    }
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
*/
