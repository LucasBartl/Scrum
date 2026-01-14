import http from "node:http"
import { json } from "./minddlewares/json.js";
import { routes } from "./routes/routes.js";




const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    
    await json(req, res);


    //vamos pecorrer nosso array de rotas, e retornar se o method for igual a alguma rota cadastrada.
    const route = routes.find((route)=>{
        return route.method === method && route.path.test(url) ;
    })
    if(route){

        const routeParams = req.url.match(route.path);


        
        req.params ={... routeParams.groups};


        return route.handler(req, res);
    }

    return res
    .writeHead(404)
    .end("Rota não encontrada");
})

server.listen(3333);

