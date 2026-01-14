//Arquivo que intercepta e trata dados que chegam da nossa requisiçao


export async function json(req, res) {

    //Coleta os dados da requisiçao 
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    try {
        //corpo da requisiçao
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        req.body = null;
    }

    return res
        .setHeader("Content-type", "application/json")

} 