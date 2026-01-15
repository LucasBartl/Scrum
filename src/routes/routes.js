//Importando banco de dados 
import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { buildParamsPath } from "../utils/buildParamspath.js";


const database = new Database();
export const routes = [
    {
        method: "GET",
        path: buildParamsPath("/tasks"),
        handler: ((req, res) => {

            const tasks = database.select("tasks")

            return res
                .end(JSON.stringify(tasks));


        })
    },
    {
        method: "POST",
        path: buildParamsPath("/tasks"),
        handler: ((req, res) => {

            //Desestruturando o body para recuperar os parametros necessarios
            const { title, description, completed_at, created_at, updated_at } = req.body

            const task = ({
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: Date()

            })

            //Nessa parte devemos informar o nome da tabela que ira adicionar e o item 
            database.insert("tasks", task);

            return res
                .writeHead(202)
                .end();


        })
    },
    {
        method: "DELETE",
        path: buildParamsPath("/tasks/:id"),
        handler: ((req, res) => {

            //Recuperando número id de dentro de Params

            const { id } = req.params;

            //Selecionamos a tabela e o id q serao deletados
            database.delete("tasks", id);

            return res
                .end("Deletado!");


        })
    },
    {
        method: "PUT",
        path: buildParamsPath("/tasks/:id"),
        handler: ((req, res) => {

            const { title, description, updated_at } = req.body;
            const { id } = req.params;


            //Selecionamos a tabela e o id q serao deletados
            database.update("tasks", id, {
                title,
                description,
                updated_at: Date(),

            })

            return res
                .end("Atualizado!");


        })
    },
    {
        method: "PATCH",
        path: buildParamsPath("/tasks/:id"),
        handler: ((req, res) => {

            const { completed_at } = req.body;
            const { id } = req.params;


            //Selecionamos a tabela e o id q serao deletados


            if (completed_at === true) {

                database.modific("tasks", id, {
                    completed_at: new Date().toISOString(),    
                })

            } else {

                database.modific("tasks", id, {
                    completed_at:null,

                })
            }

            return res
                .end("Atualizado!");


        })
    },

]