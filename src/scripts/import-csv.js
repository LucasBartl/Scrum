import fs from "node:fs";
import { parse } from "csv-parse";

// Caminho do CSV (arquivo deve existir)
const csvPath = new URL("tasks.csv", import.meta.url);

async function importCsv() {

  // Cria um stream de leitura do arquivo CSV
  const stream = fs.createReadStream(csvPath);

  // Conecta o stream ao parser de CSV
  const Parse = stream.pipe(
    parse({
      columns: true,        // usa o header (title, description)
      skip_empty_lines: true,
      delimiter: ";" // Não usa ;
    })
  );

  // Itera linha por linha do CSV
  for await (const record of Parse) {
    const { title, description } = record;

    // Envia cada linha para a API
    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    console.log(`Task importada: ${title}`);
  }
}

// Executa o script
importCsv();
