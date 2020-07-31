import { promises as fs } from "fs";

criaEstadoPorCidade();
let estadosCidades = [];
let state = null;
let city = null;

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
            }
        }       
    } catch (err) {
        console.log(err);
    }
}

//Exercício numero 2
async function CountCitiesUF(uf){

}