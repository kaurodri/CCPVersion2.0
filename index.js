let txt = 'ATx3x6x9x14x19x24x34x44x54x69x84x99x114x129x144' +
    '\nCTx15x30x45x70x95x120x170x220x270x345x420x495x570x645x720' +
    '\nBLx2x4x6x9x12x15x21x27x33x42x51x60x69x78x87' +
    '\nEVx12x24x36x56x76x96x136x176x216x276x336x296x456x516x576' +
    '\nHPx2x4x6x9x12x15x19x23x27x31x35x39x44x49x54';
let dados = txt.split("\n");
const players = [];
let tam = dados.length;

var c = 0;
while (c < tam) {
    try {
        let dadi = dados[c].split("x")
        dadi.shift()
        players.push([dados[c].split("x")[0], dadi])
        c++;
    } catch (erro) {
        console.log('[Erro] - :' + erro.message)
    }
}
var lista = new Map(players)

function calcular() {

    // Obter valores das caixas de entrada
    var valor1 = Number(document.getElementById("valor1").value);
    var valor2 = Number(document.getElementById("valor2").value);

    // Obter valores das caixas de seleção
    var potencia = Number(document.getElementById("potencia").value);
    var opcao = document.getElementById("opcao").value;
    var base = valor1;

    // Calcular o valor da exponenciação de acordo com a opção selecionada
    switch (opcao) {
        case "AT":
            var resultado = (base * lista.get(opcao)[potencia - 1]) / 100;
            break;
        case "CT":
            var resultado = (base * lista.get(opcao)[potencia - 1]) / 100;
            break;
        case "BL":
            var resultado = (100 * lista.get(opcao)[potencia - 1]) / 100;
            break;
        case "EV":
            var resultado = (base * lista.get(opcao)[potencia - 1]) / 100;
            break;
        case "HP":
            var resultado = (base * lista.get(opcao)[potencia - 1]) / 100;
            break;
        default:
            alert("Selecione uma opção válida!");
            return;
    }

    function result(concordancia, falta) {
        if (concordancia) {
            if (base != 0) {
                alert("Parabéns! Seu Clon está Perfeito.");
            } else {
                alert("Preencha os campos");
            }
        } else {
            alert("Ops! Seu Clon não está Perfeito. Você está perdendo " + falta);
        }
    }

    // Verificar se o resultado bate com o valor da segunda caixa de entrada
    if (opcao == "AT" || opcao == "HP") {
        let a = resultado - 1 < valor2 && valor2 < resultado + 1;
        let b = Math.trunc(resultado - valor2) + " de " + opcao;
        result(a, b)
    }
    if (opcao == "BL") {
        let a = valor2.toFixed(2) == resultado.toFixed(2);
        let b = (resultado - valor2).toFixed(2) + "% de " + opcao;
        result(a, b)
    }
    if (opcao == "EV" || opcao == "CT") {
        let a = valor2.toFixed(2) == resultado.toFixed(2);
        let b = (resultado - valor2).toFixed(2) + "% de " + opcao;
        result(a, b)
    }
}

{
    document.getElementById("opcao").addEventListener("change", function () {
        if (document.getElementById("opcao").value == "BL") {
            document.getElementById("valor1").type = 'text';
            document.getElementById("valor1").value = "00.00%";
            document.getElementById("valor1").readOnly = true;
            
        } else {
            document.getElementById("valor1").type = 'number';
            document.getElementById("valor1").value = "0";
            document.getElementById("valor1").readOnly = false;
        }
    })
}

{
    const myInput = document.getElementById("valor2");
    myInput.addEventListener("input", function () {
        if(document.getElementById("opcao").value == "BL"){
            if (myInput.value > lista.get(document.getElementById("opcao").value)[Number(document.getElementById("potencia").value) - 1]){
                myInput.value = '';
                alert("Por favor coloque um número válido. " + lista.get(document.getElementById("opcao").value)[Number(document.getElementById("potencia").value) - 1]);
            }
        } else {
            if (myInput.value > (Number(document.getElementById("valor1").value) * lista.get(document.getElementById("opcao").value)[Number(document.getElementById("potencia").value) - 1]) / 100) {
                myInput.value = '';
                alert("Por favor coloque um número válido.");
            }
        }
    });
}

{ //Atualizar texto do atributo. 
    let opcao = document.getElementById("opcao");
    let textoClon = document.getElementById("textoClon");

    const atributos = { //mapeamento
        "AT" : "Ataque",
        "CT" : "Golpe Crítico",
        "BL" : "Bloquear",
        "EV" : "Evitar",
        "HP" : "HP Max"
    }

    function atualizarAtt() {
        const valor = opcao.value;
        textoClon.textContent = atributos[valor];
    }

    opcao.addEventListener("change", atualizarAtt);
}

{ //Atualizar imagem do clon.
    let opcao = document.getElementById("potencia");
    var textoClon = document.getElementById("clonNum");

    const clons = { //mapeamento
        "1": "banco-imagens/clon-1.png",
        "2": "banco-imagens/clon-2.png",
        "3": "banco-imagens/clon-3.png",
        "4": "banco-imagens/clon-4.png",
        "5": "banco-imagens/clon-5.png",
        "6": "banco-imagens/clon-6.png",
        "7": "banco-imagens/clon-7.png",
        "8": "banco-imagens/clon-8.png",
        "9": "banco-imagens/clon-9.png",
        "10": "banco-imagens/clon-10.png",
        "11": "banco-imagens/clon-null.png",
        "12": "banco-imagens/clon-null.png",
        "13": "banco-imagens/clon-null.png",
        "14": "banco-imagens/clon-null.png",
        "15": "banco-imagens/clon-15.png"
    };

    function atualizarClon() {
        const valor = opcao.value;
        textoClon.src = clons[valor];
    }

    opcao.addEventListener("change", atualizarClon);
}  

{ //Atualizar imagem do atributo.
    let opcao = document.getElementById("opcao");
    let baseAtt = document.getElementById("baseatt");

    const atributo = { //mapeamento
        "AT" : "banco-imagens/att-at.png",
        "CT" : "banco-imagens/att-ct.png",
        "BL" : "banco-imagens/att-bl.png",
        "EV" : "banco-imagens/att-ev.png",
        "HP" : "banco-imagens/att-hp.png"
    }

    function atualizarAtt() {
        const valor = opcao.value;
        baseAtt.src = atributo[valor]; 
    }

    opcao.addEventListener("change", atualizarAtt)
}