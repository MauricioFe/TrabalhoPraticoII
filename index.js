import { promises as fs } from "fs";


let estadosCidades = [];
let state = null;
let city = null;
//criaEstadoPorCidade();
//retEstadosComMaisCidades();
//retEstadosComMenosCidades();
async function criaEstadoPorCidade() {
    try {
        const estados = JSON.parse(await fs.readFile("./cidades-estados/Estados.json"));
        const cidades = JSON.parse(await fs.readFile("./cidades-estados/Cidades.json"));
        for (const estado of estados) {
            state = estado;
            for (const cidade of cidades) {
                city = cidade;
                if (state.ID === city.Estado) {
                    estadosCidades.push({ cidade: city.Nome, estado: state.Nome, UF: state.Sigla })
                    await fs.writeFile(`./resultStates/${state.Sigla}.json`, JSON.stringify(estadosCidades));
                }
                if (state.ID !== city.Estado) {
                    estadosCidades = [];
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

//Exercício numero 2
async function countCitiesUF(uf) {
    const data = JSON.parse(await fs.readFile(`./resultStates/${uf}.json`));
    let count = 0;
    for (const item of data) {
        count++;
    }
    return count;
}


//Exercício numero 3
async function retEstadosComMaisCidades() {
    const estados = JSON.parse(await fs.readFile("./cidades-estados/Estados.json"));
    let quantidade = 0;
    const quantCidadeEstado = [];
    let count = 0;
    for (const estado of estados) {
        quantidade = await countCitiesUF(estado.Sigla);
        quantCidadeEstado[count] = ({ UF: estado.Sigla, quant: quantidade })
        count++;
    }

    quantCidadeEstado.sort((a, b) => {
        return b.quant - a.quant;
    })

    const topFive = quantCidadeEstado.slice(0, 5);
    console.log(topFive);
}
//Exercicio 4
async function retEstadosComMenosCidades() {
    const estados = JSON.parse(await fs.readFile("./cidades-estados/Estados.json"));
    let quantidade = 0;
    const quantCidadeEstado = [];
    let count = 0;
    for (const estado of estados) {
        quantidade = await countCitiesUF(estado.Sigla);
        quantCidadeEstado[count] = ({ UF: estado.Sigla, quant: parseInt(quantidade) })
        count++;
    }

    quantCidadeEstado.sort((a, b) => {
        return a.quant - b.quant;
    })
    console.log(quantCidadeEstado.slice(0, 5));

}

async function retCidadeMaiorNomePorEstado() {
    const estados = JSON.parse(await fs.readFile("./cidades-estados/Estados.json"));
    let quantidade = 0;
    const cidade = [];
    let count = 0;
    for (const estado of estados) {
        cidade.push({UF: estado.cigla})
    }
}