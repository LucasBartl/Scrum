//Importando file system direto do node
import fs from "node:fs/promises"

// Criando constante que vai armazenar o caminho do nosso banco de dados 

const pathDatabase = new URL('db.json', import.meta.url);



export class Database {

    #database = {};


    //Metodo responsavel pela criaçao do arquivo de banco de dados 
    #persist() {

        fs.writeFile(pathDatabase, JSON.stringify(this.#database));

    }

    //Metodo que vai carregar o banco de dados
    constructor() {
        fs.readFile(pathDatabase, "utf8").then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }


    //Metodo criado para pesquisa de dados dentro de tabelas
    select(table) {

        const data = this.#database[table];
        return data;

    }

    //Metodo criado para inserçao de dados na propriedade database
    insert(table, data) {

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();
        return data;
    }




    delete(table, id) {

        //Verifica se nas tabelas existe um id correspondente ao selecionado
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        // Verifica se encontrou o registro
        if (rowIndex > -1) {

            this.#database[table].splice(rowIndex, 1);
            this.#persist()

        }
    }

    update(table, id,data) {

        //Verifica se nas tabelas existe um id correspondente ao selecionado
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        // Verifica se encontrou o registro
        if (rowIndex > -1) {
        // Aqui envio os dados antigos {...this.#database[table][rowIndex] e mesclo com o novos de data
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex], ...data};
            this.#persist();

        }



    }

    modific(table, id,data) {

        //Verifica se nas tabelas existe um id correspondente ao selecionado
        const rowIndex = this.#database[table].findIndex((row) => row.id === id);
        // Verifica se encontrou o registro
        if (rowIndex > -1) {
        // Aqui envio os dados antigos {...this.#database[table][rowIndex] e mesclo com o novos de data
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex], ...data};
            this.#persist();

        }



    }

}