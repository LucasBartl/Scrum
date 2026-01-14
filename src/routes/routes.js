//Importando banco de dados 
import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";


const database = new Database();
export const routes = [
    {
        method: "GET",
        path: "/tasks",
        handler: ((req, res) => {

            const tasks = database.select("tasks")

            return res
                .end(JSON.stringify(tasks));


        })
    },
    {
        method: "POST",
        path: "/tasks",
        handler:((req, res)=>{

        //Desestruturando o body para recuperar os parametros necessarios
        const { title, description, completed_at, created_at, updated_at } = req.body

        const task = ({
            id: randomUUID(),
            title,
            description, 
            completed_at: null, 
            created_at: Date(), 
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
        method: "PUT",
        path: "/tasks/:id",
        handler: ((req, res) => {

            const tasks = database.select("tasks")

            return res
                .end(JSON.stringify(tasks));


        })
    },

]