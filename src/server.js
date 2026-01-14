import http from "node:http"
import { randomUUID } from "node:crypto";
import { json } from "./minddlewares/json.js";
import { Database } from "./database/database.js";


const database = new Database();
const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    
    await json(req, res);


    //vamos pecorrer nosso array de rotas, e retornar se o method for igual a alguma rota cadastrada.
    const route = routes.find((reute)=>{
        return route.method === method && route.path === url ;
    })
    if(route){
        return route.handler(req, res);
    }


})

server.listen(3333)

