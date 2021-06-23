//Correção de arquivo .json -

const { stringify } = require('querystring')

var brokenBD = LerArquivo()

// For para varrer a estrutra do arquivo json já convertido
for (var i in brokenBD) {

    // Executa a substituição dos caracteres especiais conforme solicitado
    brokenBD[i]['name'] = CorrigirNome(brokenBD[i]['name'])

    // Converte o conteudo da variavel Price para Float caso o conteudo seja string
    if (!Isnumber(brokenBD[i]['price'])) {
        brokenBD[i]['price'] = parseFloat(brokenBD[i]['price'])
    }

    // corrigir o problema do Quantity
    if (typeof brokenBD[i]['quantity'] == 'undefined') {
        brokenBD[i] = quantityadd()
    }


}
// Exportar o novo JSON com os dados do array brokenBD

SalvarArquivo(brokenBD)

//-----------Validação do Banco de dados---------------//

//input do banco de dados corrigido
var BDsaida = ArqSaida()

// Ordenação por Categoria em ordem alfabetica e logo em seguida por ID
BDsaida.sort(function (a, b) {
    if (a.category > b.category) {
        return 1
    }
    if (a.category < b.category) {
        return -1
    }
    if (a.id > b.id) {
        return 1
    }
    if (a.id < b.id) {
        return -1
    }
    return 0
})

console.log(BDsaida)

console.log(' ')
console.log('Ordenação por categoria e ID')
console.log(' ')

for (var i in BDsaida) {
    imprimirJSON(BDsaida[i]['category'])
    imprimirJSON(BDsaida[i]['name'])
    imprimirJSON(BDsaida[i]['id'])
}

//Operação de Soma dos valores no campo price da array separados por categoria
//Valor do campo 'price' multiplicado pelo campo 'quantity'

var categoria = [];
var nret = 0;

for (i in BDsaida) {
    nret = Search(categoria, BDsaida[i]['category']);
    if (nret >= 0) {
        categoria[nret]['price'] += BDsaida[i]['price'] * BDsaida[i]['quantity']
    }
    else {
        categoria.push({ category: BDsaida[i]['category'], price: BDsaida[i]['price'] * BDsaida[i]['quantity'] })
    }
    //Validação para adicionar a soma de categoria junto a validação de que possui o produto em estoque

}
console.log(' ')
console.log('Total por categoria')
console.log(' ')

for (i in categoria) {

    imprimirJSON(categoria[i]['category'] + ' ' + categoria[i]['price'].toLocaleString('pt-br', {style:'currency', currency: 'BRL'}))
  

}



//--------- Funções -----------//

// LerArquivo (função adaptada do site: https://www.ti-enxame.com/pt/javascript/como-ler-um-arquivo-json-local-externo-em-javascript/1043362222/)
function LerArquivo() {

    var fs = require('fs');
    // Leitura do arquivo JSON
    var data = fs.readFileSync('./broken-database.json', 'utf8');
    // Transforma os dados do arquivo em estrutura de array json
    var dados = JSON.parse(data);

    return dados
}

function ArqSaida() {

    var fs = require('fs');
    // Leitura do arquivo JSON
    var dataBD = fs.readFileSync('./saida.json', 'utf8');
    // Transforma os dados do arquivo em estrutura de array json
    var dadosBD = JSON.parse(dataBD);

    return dadosBD
}

//  Salva Arquivo (a função utilizada é basicamente a de ler o arquivo com algumas alterações como ao inves de readfile usamos o writefile)
function SalvarArquivo(oObj) {

    var fs = require('fs');
    // Leitura do arquivo JSON

    var dados = JSON.stringify(oObj);

    fs.writeFileSync('./saida.json', dados);
    // Transforma os dados do arquivo em estrutura de array json

}

//função para adicionar o quantity
function quantityadd() {
    var quantadd = { id: brokenBD[i]['id'], name: brokenBD[i]['name'], price: brokenBD[i]['price'], category: brokenBD[i]['category'], quantity: 0 }

    return quantadd
}

// Função para correção dos nomes
function CorrigirNome(val) {

    var cRet = ''

    cRet = val.split("ø").join("o").split("æ").join("a").split("¢").join("c").split("ß").join("b")

    return cRet
}


// Verifica se o conteudo passado como parametro é do tipo numerico/float
function Isnumber(val) {

    return typeof val == "number"
}

//Transformar em dados de saida arquivos em JSON
function imprimirJSON(json) {
    console.log(JSON.stringify(json));
}
//Função que localiza um elemento dentro da array
function Search(vetor, elemento) {

    var nret = -1
    //função dentro da array para localizar a posição do elemento passado como parametro
    nret = vetor.map(function (e) { return e.category; }).indexOf(elemento)

    return nret

}
