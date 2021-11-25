const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("./credentials.json");
const spreadsheetId = "1E49iXd7C_oDrL7hViLvLaXXRo1Pi2fVzYiZ2HlEO7gA";

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "prueba",
});

async function getDataFromSheet() {
  const document = new GoogleSpreadsheet(spreadsheetId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();
  const sheet = document.sheetsByIndex[0]; // Primera hoja
  const respuestas = await sheet.getRows();
  return respuestas;
}

async function insert_frecuencia_uso(respuesta, table_id) {
  console.log("Inserts para frecuencia_uso");
  let fu_redes_sociales = respuesta[5];
  let fu_compas_online = respuesta[6];
  let fu_streaming = respuesta[7];
  let fu_values = [];
  fu_values.push(table_id);
  fu_values.push(fu_redes_sociales);
  fu_values.push(fu_compas_online);
  fu_values.push(fu_streaming);
  console.log(fu_values);
  let fu_sql = `insert into frecuencia_uso(id_frecuencia_uso,redes_sociales,compras_online,streaming) values($1,$2,$3,$4)`;
  let query = {
    text: fu_sql,
    values: fu_values,
  };
  await insertData(query);
}

async function insert_seguridad(respuesta, table_id) {
  console.log("Inserts para seguridad");
  let seg_values = [];
  let seg_sentimiento_proteccion = respuesta[8];
  let seg_conocimiento_ciberseg = respuesta[9];
  let seg_conocimiento_vigilancia = respuesta[10];
  let seg_conocimiento_leyes = respuesta[11];
  let seg_informacion_sensible = respuesta[12];
  seg_values.push(table_id);
  seg_values.push(seg_sentimiento_proteccion);
  seg_values.push(seg_conocimiento_ciberseg);
  seg_values.push(seg_conocimiento_vigilancia);
  seg_values.push(seg_conocimiento_leyes);
  seg_values.push(seg_informacion_sensible);
  console.log(seg_values);
  let seg_sql = `insert into seguridad(id_seguridad,sentimiento_proteccion,conocimiento_ciberseg,conocimiento_vigilancia,conocimiento_leyes,informacion_sensible) values($1,$2,$3,$4,$5,$6)`;
  query = {
    text: seg_sql,
    values: seg_values,
  };
  await insertData(query);
}
async function insert_confianza_paginas(respuesta, table_id) {
  console.log("Inserts para confianza_paginas");
  let cp_values = [];
  let cp_nombre = respuesta[34];
  let cp_direcccion = respuesta[35];
  let cp_datos_bancarios = respuesta[36];
  let cp_preferencias = respuesta[37];
  cp_values.push(table_id);
  cp_values.push(cp_nombre);
  cp_values.push(cp_direcccion);
  cp_values.push(cp_datos_bancarios);
  cp_values.push(cp_preferencias);
  console.log(cp_values);
  let cp_sql = `insert into confianza_paginas(id_confianza_paginas,nombre,direccion,datos_bancarios,preferencias) values($1,$2,$3,$4,$5)`;
  query = {
    text: cp_sql,
    values: cp_values,
  };
  await insertData(query);
}

async function insert_compras_online(respuesta, table_id) {
  console.log("Inserts para compras_online");
  let co_values = [];
  let co_tipo_compras = respuesta[31];
  let co_frecuencia_compras = respuesta[32];
  let co_formas_pago = respuesta[33];
  let co_mayor_mieda = respuesta[38];
  let co_publicidad_personalizada = respuesta[39];
  co_values.push(table_id);
  co_values.push(co_tipo_compras);
  co_values.push("");
  co_values.push(co_frecuencia_compras);
  co_values.push(co_formas_pago);
  co_values.push(table_id);
  co_values.push(co_mayor_mieda);
  co_values.push(co_publicidad_personalizada);
  console.log(co_values);
  let co_sql = `insert into compras_online(id_compras_online,tipo_compras,compras_uso,frecuencia_compras,formas_pago,id_confianza_paginas,mayor_miedo,publicidad_personalizada) values($1,$2,$3,$4,$5,$6,$7,$8)`;
  query = {
    text: co_sql,
    values: co_values,
  };
  await insertData(query);
}

async function insert_encuestado(respuesta, table_id) {
  console.log("Inserts para encuestado");
  let enc_values = [];
  let enc_edad = respuesta[1];
  let enc_licenciatura = respuesta[2];
  let enc_genero = respuesta[3];
  let enc_dispositivos = respuesta[4];
  let enc_valoracion_priv_ef = respuesta[13];
  let enc_actitud_ciberseg = respuesta[14];
  let enc_compras_en_linea = respuesta[30];
  enc_values.push(table_id);
  enc_values.push(enc_edad);
  enc_values.push(enc_licenciatura);
  enc_values.push(enc_genero);
  enc_values.push(enc_dispositivos);
  enc_values.push(table_id);
  enc_values.push(enc_valoracion_priv_ef);
  enc_values.push(enc_actitud_ciberseg);
  enc_values.push(enc_compras_en_linea);
  console.log(enc_values);
  let enc_sql = `insert into encuestado(id_encuestado,edad,licenciatura,genero,dispositivos,id_frecuencia_uso,valoracion_priv_ef,actitud_ciberseg,compras_en_linea) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  query = {
    text: enc_sql,
    values: enc_values,
  };
  await insertData(query);
}

async function insert_redes_sociales(respuesta, table_id) {
  console.log("Insert para redes_sociales");
  let rs_values = [];
  let rs_redes_uso = respuesta[15];
  let rs_tiempo_redes = respuesta[16];
  let rs_razon_uso = respuesta[17];
  let rs_contenido_compartido = respuesta[18];
  let rs_perfiles_publicos = respuesta[19];
  let rs_interaccion_desconocidos = respuesta[20];
  let rs_acceso_desconocidos = respuesta[21];
  let rs_herramientas_privacidad = respuesta[22];
  let rs_servicios_personalizados = respuesta[23];
  let rs_contenido_sin_vigilancia = respuesta[24];
  let rs_contenido_observado = respuesta[25];
  let rs_sentimientos = respuesta[26];
  let rs_impacto_redes_vida = respuesta[27];
  let rs_uso_stalkeo = respuesta[28];
  let rs_comparacion_redes = respuesta[29];
  rs_values.push(table_id);
  rs_values.push(table_id);
  rs_values.push(rs_redes_uso);
  rs_values.push(rs_tiempo_redes);
  rs_values.push(rs_razon_uso);
  rs_values.push(rs_contenido_compartido);
  rs_values.push(rs_perfiles_publicos);
  rs_values.push(rs_interaccion_desconocidos);
  rs_values.push(rs_acceso_desconocidos);
  rs_values.push(rs_herramientas_privacidad);
  rs_values.push(rs_servicios_personalizados);
  rs_values.push(rs_contenido_sin_vigilancia);
  rs_values.push(rs_contenido_observado);
  rs_values.push(rs_sentimientos);
  rs_values.push(rs_impacto_redes_vida);
  rs_values.push(rs_uso_stalkeo);
  rs_values.push(rs_comparacion_redes);
  console.log(rs_values);
  let rs_sql = `insert into redes_sociales(id_red_social,id_encuestado,redes_uso,tiempo_redes,razon_uso,contenido_compartido,perfiles_publicos,interaccion_desconocidos,acceso_desconocidos,herramientas_privacidad,servicios_personalizados,contenido_sin_vigilancia,contenido_observado,sentimientos,impacto_redes_vida,uso_stalkeo,comparacion_redes) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`;
  query = {
    text: rs_sql,
    values: rs_values,
  };
  await insertData(query);
}

async function insert_conclusion(respuesta, table_id) {
  console.log("Inserts para conclusión");
  let con_values = [];
  let con_actitud_ciberseg = respuesta[40];
  let con_vigilancia = respuesta[41];
  let con_aprender_ciberseg = respuesta[42];
  con_values.push(table_id);
  con_values.push(table_id);
  con_values.push(con_actitud_ciberseg);
  con_values.push(con_vigilancia);
  con_values.push(con_aprender_ciberseg);
  console.log(con_values);
  let con_sql = `insert into conclusion(id_conclusion,id_encuestado,actitud_ciberseg,vigilancia,aprender_ciberseg) values($1,$2,$3,$4,$5)`;
  query = {
    text: con_sql,
    values: con_values,
  };
  await insertData(query);
}

async function manipulateData(respuestas) {
  for (let i = 0; i < respuestas.length; i++) {
    const row = respuestas[i];
    const respuesta = row._rawData;

    let table_id = i + 1;

    // Tabla frecuencia_uso
    await insert_frecuencia_uso(respuesta, table_id);

    // Tabla Seguridad
    await insert_seguridad(respuesta, table_id);

    // Tabla confianza_paginas
    await insert_confianza_paginas(respuesta, table_id);

    // Tabla compras_online
    await insert_compras_online(respuesta, table_id);

    // Tabla encuestado
    await insert_encuestado(respuesta, table_id);

    // Tabla redes_sociales
    await insert_redes_sociales(respuesta, table_id);

    // Tabla conclusion
    await insert_conclusion(respuesta, table_id);

    console.log("------------------------------------------------------");
  }
}

async function insertData(query) {
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(res);
    }
  });
}

async function main() {
  respuestas = await getDataFromSheet();
  await manipulateData(respuestas);
}

main();
