const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("./credentials.json");
const spreadsheetId = "11MHGu98oFgu7dqMObnetieV78BKnttZBSBOgAXd2Pg8";

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "Tucanazo",
});

async function getDataFromSheet() {
  const document = new GoogleSpreadsheet(spreadsheetId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();
  const sheet = document.sheetsByIndex[0]; // Primera hoja
  const respuestas = await sheet.getRows();
  return respuestas;
}

async function manipulateData(respuestas) {
  const sql = "insert into respuestas (pregunta1,pregunta2,pregunta3,pregunta4,pregunta5,pregunta6,pregunta7,pregunta8,pregunta9,pregunta10,pregunta11,pregunta12,pregunta13,pregunta14,pregunta15,pregunta16,pregunta17,pregunta18,pregunta19,pregunta20,pregunta21,pregunta22,pregunta23,pregunta24,pregunta25,pregunta26,pregunta27,pregunta28,pregunta29,pregunta30,pregunta31,pregunta32,pregunta33,pregunta34,pregunta35,pregunta36,pregunta37,pregunta38,pregunta39,pregunta40) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40)";
  for (let i = 0; i < respuestas.length; i++) {
    const row = respuestas[i];
    const respuesta = row._rawData;
    const query = {
      text: sql,
      values: respuesta,
    }
    // console.log(respuesta);
    pool.query(query,(err,res) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(res);
      }
    });
  }
}

async function main() {
  respuestas = await getDataFromSheet();
  manipulateData(respuestas);
}

main();