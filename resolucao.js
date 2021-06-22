
//Correção de arquivo .json -

var brokenBD = LerArquivo()

// For para varrer a estrutra do arquivo json já convertido
for (var i in words) {

    // Executa a substituição dos caracteres especiais conforme solicitado
    brokenBD[i]['name'] = CorrigirNome(words[i]['name'])

    // Converte o conteudo da variavel Price para Float caso o conteudo seja string
    if (!Isnumber(words[i]['price'])) {
        brokenBD[i]['price'] = parseFloat(brokenBD[i]['price'])
    }

    // corrigir o problema do Quantity
    if (typeof brokenBD[i]['quantity'] == 'undefined') {
        brokenBD[i] = quantityadd()
    }


}
// Exportar o novo JSON com os dados do array words

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

console.log (BDsaida)

for (var i in BDsaida) {
    imprimirJSON(BDsaida[i]['category'])
    imprimirJSON(BDsaida[i]['name'])  
    imprimirJSON(BDsaida[i]['id'])
}

//Operação de Soma dos valores no campo price da array separados por categoria
//Valor do campo 'price' multiplicado pelo campo 'quantity'
//valores setados em 0 para soma em repetição
var priceAcess = 0;
var priceEletrodom = 0;
var priceEletronicos = 0;
var pricePan = 0;

for(i in BDsaida){
    //Validação para adicionar a soma de categoria junto a validação de que possui o produto em estoque
    if (BDsaida[i]['category'] == "Acessórios" && BDsaida[i]['quantity'] > 0 ){
    
        //Estrutura de soma em repetição 
        priceAcess += BDsaida[i]['price'] * BDsaida[i]['quantity'];
    
    }
 
    if (BDsaida[i]['category'] == "Eletrodomésticos" && BDsaida[i]['quantity'] > 0 ){
    
        
        priceEletrodom += BDsaida[i]['price'] * BDsaida[i]['quantity'];
      
    }    

    if (BDsaida[i]['category'] == "Eletrônicos" && BDsaida[i]['quantity'] > 0 ){
    
     
        priceEletronicos += BDsaida[i]['price'] * BDsaida[i]['quantity'];
     
    }   

    if (BDsaida[i]['category'] == "Panelas" && BDsaida[i]['quantity'] > 0 ){
    
    
        pricePan += BDsaida[i]['price'] * BDsaida[i]['quantity'];
    
    }           
}
//saida do resultado de soma por categoria
 console.log(priceAcess)
 console.log(priceEletrodom)
 console.log(priceEletronicos)
 console.log(pricePan)

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
function quantityadd(){
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

//Leitura de arquivos em JSON
function imprimirJSON(json) {
    console.log(JSON.stringify(json));
}
