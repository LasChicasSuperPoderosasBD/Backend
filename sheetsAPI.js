const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("./credentials.json");
const spreadsheetId = "1E49iXd7C_oDrL7hViLvLaXXRo1Pi2fVzYiZ2HlEO7gA";

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "prueba4",
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
  let seg_values = [];
  let seg_sentimiento_proteccion = respuesta[8];
  let seg_conocimiento_ciberseg = respuesta[9];
  let seg_conocimiento_vigilancia = respuesta[10];
  let seg_conocimiento_leyes = respuesta[11];
  seg_values.push(table_id);
  seg_values.push(table_id);
  seg_values.push(seg_sentimiento_proteccion);
  seg_values.push(seg_conocimiento_ciberseg);
  seg_values.push(seg_conocimiento_vigilancia);
  seg_values.push(seg_conocimiento_leyes);
  seg_values.push(table_id);
  let seg_sql = `insert into seguridad(id_seguridad,id_encuestado,sentimiento_proteccion,conocimiento_ciberseg,conocimiento_vigilancia,conocimiento_leyes,id_informacion_sensible) values($1,$2,$3,$4,$5,$6,$7)`;
  query = {
    text: seg_sql,
    values: seg_values,
  };
  console.log(query);
  await insertData(query);
}
async function insert_confianza_paginas(respuesta, table_id) {
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
  let cp_sql = `insert into confianza_paginas(id_confianza_paginas,nombre,direccion,datos_bancarios,preferencias) values($1,$2,$3,$4,$5)`;
  query = {
    text: cp_sql,
    values: cp_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_compras_online(respuesta, table_id) {
  let co_values = [];
  //let co_tipo_compras = respuesta[31];
  let co_frecuencia_compras = respuesta[32];
  //let co_formas_pago = respuesta[33];
  let co_mayor_miedo = respuesta[38];
  let co_publicidad_personalizada = respuesta[39];
  co_values.push(table_id);
  co_values.push(table_id);
  co_values.push(table_id);
  co_values.push("");
  co_values.push(co_frecuencia_compras);
  co_values.push(table_id);
  co_values.push(table_id);
  co_values.push(co_mayor_miedo);
  co_values.push(co_publicidad_personalizada);
  let co_sql = `insert into compras_online(id_compras_online,id_encuestado,id_tipo_compras,compras_uso,frecuencia_compras,id_forma_pago,id_confianza_paginas,mayor_miedo,publicidad_personalizada) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  query = {
    text: co_sql,
    values: co_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_encuestado(respuesta, table_id) {
  let enc_values = [];
  let enc_edad = respuesta[1];
  let enc_licenciatura = respuesta[2];
  let enc_genero = respuesta[3];
  let enc_valoracion_priv_ef = respuesta[13];
  let enc_actitud_ciberseg = respuesta[14];
  let enc_compras_en_linea = respuesta[30];
  enc_values.push(table_id);
  enc_values.push(enc_edad);
  enc_values.push(enc_licenciatura);
  enc_values.push(enc_genero);
  enc_values.push(table_id);
  enc_values.push(table_id);
  enc_values.push(enc_valoracion_priv_ef);
  enc_values.push(enc_actitud_ciberseg);
  enc_values.push(enc_compras_en_linea);
  let enc_sql = `insert into encuestado (id_encuestado,edad,licenciatura,genero,id_dispositivos,id_frecuencia_uso,valoracion_priv_ef,actitud_ciberseg,compras_en_linea) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  query = {
    text: enc_sql,
    values: enc_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_redes_sociales(respuesta, table_id) {
  let rs_values = [];
  // let rs_redes_uso = respuesta[15];
  let rs_tiempo_redes = respuesta[16];
  let rs_razon_uso = respuesta[17];
  // let rs_contenido_compartido = respuesta[18];
  let rs_perfiles_publicos = respuesta[19];
  let rs_interaccion_desconocidos = respuesta[20];
  let rs_acceso_desconocidos = respuesta[21];
  let rs_herramientas_privacidad = respuesta[22];
  let rs_servicios_personalizados = respuesta[23];
  let rs_contenido_sin_vigilancia = respuesta[24];
  let rs_contenido_observado = respuesta[25];
  //let rs_sentimientos = respuesta[26];
  let rs_impacto_redes_vida = respuesta[27];
  // let rs_uso_stalkeo = respuesta[28];
  let rs_comparacion_redes = respuesta[29];
  rs_values.push(table_id);
  rs_values.push(table_id);
  rs_values.push(table_id);
  rs_values.push(rs_tiempo_redes);
  rs_values.push(rs_razon_uso);
  rs_values.push(table_id);
  rs_values.push(rs_perfiles_publicos);
  rs_values.push(rs_interaccion_desconocidos);
  rs_values.push(rs_acceso_desconocidos);
  rs_values.push(rs_herramientas_privacidad);
  rs_values.push(rs_servicios_personalizados);
  rs_values.push(rs_contenido_sin_vigilancia);
  rs_values.push(rs_contenido_observado);
  rs_values.push(table_id);
  rs_values.push(rs_impacto_redes_vida);
  rs_values.push(table_id);
  rs_values.push(rs_comparacion_redes);
  let rs_sql = `insert into redes_sociales(id_red_social,id_encuestado,id_redes_uso,tiempo_redes,razon_uso,id_contenido_compartido,perfiles_publicos,interaccion_desconocidos,acceso_desconocidos,herramientas_privacidad,servicios_personalizados,contenido_sin_vigilancia,contenido_observado,id_sentimientos_post_uso,impacto_redes_vida,id_uso_stalkeo,comparacion_redes) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`;
  query = {
    text: rs_sql,
    values: rs_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_conclusion(respuesta, table_id) {
  let con_values = [];
  let con_actitud_ciberseg = respuesta[40];
  let con_vigilancia = respuesta[41];
  let con_aprender_ciberseg = respuesta[42];
  con_values.push(table_id);
  con_values.push(table_id);
  con_values.push(con_actitud_ciberseg);
  con_values.push(con_vigilancia);
  con_values.push(con_aprender_ciberseg);
  let con_sql = `insert into conclusion (id_conclusion,id_encuestado,actitud_ciberseg,vigilancia,aprender_ciberseg) values($1,$2,$3,$4,$5)`;
  query = {
    text: con_sql,
    values: con_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_informacion_sensible(respuesta, table_id) {
  let informacion_sensible = respuesta[12];
  let array_informacion_sensible = informacion_sensible.split(",");
  let is_values = [table_id, false, false, false, false, false, false, false];
  array_informacion_sensible.forEach((elem) => {
    if (elem.includes("Nombre y apellidos")) {
      is_values[1] = true;
    }
    if (elem.includes("Dirección de casa u oficina")) {
      is_values[2] = true;
    }
    if (elem.includes("Número telefónico")) {
      is_values[3] = true;
    }
    if (elem.includes("Correo electrónico")) {
      is_values[4] = true;
    }
    if (elem.includes("Redes sociales")) {
      is_values[5] = true;
    }
    if (elem.includes("Información bancaria")) {
      is_values[6] = true;
    }
    if (elem.includes("Información sobre gustos y preferencias")) {
      is_values[7] = true;
    }
  });
  let is_text = `insert into informacion_sensible(id_informacion_sensible,nombre,direccion,telefono,email,redes_sociales,info_bancaria,info_preferencias) values($1,$2,$3,$4,$5,$6,$7,$8)`;
  let query = {
    text: is_text,
    values: is_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_tipo_compras(respuesta, table_id) {
  let tipo_compras = respuesta[31];
  let array_tipo_compras = tipo_compras.split(",");
  let tp_values = [table_id, false, false, false, false, false, false];
  array_tipo_compras.forEach((elem) => {
    if (elem.includes("Ropa")) {
      tp_values[1] = true;
    }
    if (elem.includes("Despensa")) {
      tp_values[2] = true;
    }
    if (elem.includes("Servicios de delivery (Rappi, Uber Eats, etc.)")) {
      tp_values[3] = true;
    }
    if (elem.includes("Suscripciones a servicios digitales")) {
      tp_values[4] = true;
    }
    if (elem.includes("Dispositivos electrónicos")) {
      tp_values[5] = true;
    }
    if (elem.includes("Otro")) {
      tp_values[6] = true;
    }
  });
  let tp_text = `insert into tipo_compras(id_tipo_compras,ropa,despensa,delivery,suscripciones,dispositivos_electronicos,otros) values($1,$2,$3,$4,$5,$6,$7)`;
  let query = {
    text: tp_text,
    values: tp_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_forma_pago(respuesta, table_id) {
  let forma_pago = respuesta[33];
  let array_forma_pago = forma_pago.split(",");
  let fp_values = [table_id, false, false, false, false];
  array_forma_pago.forEach((elem) => {
    if (elem.includes("Tarjeta de crédito")) {
      fp_values[1] = true;
    }
    if (elem.includes("Tarjeta de débito")) {
      fp_values[2] = true;
    }
    if (elem.includes("Tarjetas prepago")) {
      fp_values[3] = true;
    }
    if (elem.includes("Paypal o similares")) {
      fp_values[4] = true;
    }
  });
  let fp_text = `insert into forma_pago(id_forma_pago,credito,debito,prepago,paypal) values($1,$2,$3,$4,$5)`;
  let query = {
    text: fp_text,
    values: fp_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_sentimientos_post_uso(respuesta, table_id) {
  let sentimientos_post_uso = respuesta[26];
  let array_sentimientos_post_uso = sentimientos_post_uso.split(",");
  let spu_values = [table_id, false, false, false, false, false, false, false];
  array_sentimientos_post_uso.forEach((elem) => {
    if (elem.includes("Feliz")) {
      spu_values[1] = true;
    }
    if (elem.includes("Triste")) {
      spu_values[2] = true;
    }
    if (elem.includes("Enojado")) {
      spu_values[3] = true;
    }
    if (elem.includes("Indiferente")) {
      spu_values[4] = true;
    }
    if (elem.includes("Nostálgico")) {
      spu_values[5] = true;
    }
    if (elem.includes("Celoso")) {
      spu_values[6] = true;
    }
    if (elem.includes("Amenazado")) {
      spu_values[7] = true;
    }
  });
  let spu_text = `insert into sentimientos_post_uso(id_sentimientos_post_uso,feliz,triste,enojado,indiferente,nostalgico,celoso,amenazado) values($1,$2,$3,$4,$5,$6,$7,$8)`;
  let query = {
    text: spu_text,
    values: spu_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_uso_stalkeo(respuesta, table_id) {
  let uso_stalkeo = respuesta[28];
  let array_uso_stalkeo = uso_stalkeo.split(",");
  let us_values = [table_id, false, false, false, false, false];
  array_uso_stalkeo.forEach((elem) => {
    if (
      elem.includes(
        "Una escuela que investiga para decidir si acepta a un estudiante"
      )
    ) {
      us_values[1] = true;
    }
    if (elem.includes("Una empresa que investiga a un potencial empleado")) {
      us_values[2] = true;
    }
    if (
      elem.includes("Una empresa que busca posibles compradores de su producto")
    ) {
      us_values[3] = true;
    }
    if (
      elem.includes(
        "Una persona que busca información sobre otra persona por curiosidad"
      )
    ) {
      us_values[4] = true;
    }
    if (
      elem.includes(
        "En ningún caso es correcto investigar sobre los datos personales de otros"
      )
    ) {
      us_values[5] = true;
    }
  });
  let us_text = `insert into uso_stalkeo(id_uso_stalkeo,escuela,empleador,producto,persona,nunca) values($1,$2,$3,$4,$5,$6)`;
  let query = {
    text: us_text,
    values: us_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_contenido_compartido(respuesta, table_id) {
  let cc_stalkeo = respuesta[18];
  let array_cc_stalkeo = cc_stalkeo.split(",");
  let cc_values = [table_id, false, false, false, false, false, false];
  array_cc_stalkeo.forEach((elem) => {
    if (elem.includes("Memes")) {
      cc_values[1] = true;
    }
    if (elem.includes("Música y videos populares")) {
      cc_values[2] = true;
    }
    if (elem.includes("Fotos personales")) {
      cc_values[3] = true;
    }
    if (elem.includes("Ideas propias")) {
      cc_values[4] = true;
    }
    if (elem.includes("Información útil para los demás")) {
      cc_values[5] = true;
    }
    if (elem.includes("Solo me gusta ver lo que hay pero no publico nada")) {
      cc_values[6] = true;
    }
  });
  let cc_text = `insert into contenido_compartido(id_contenido_compartido, memes,musica,fotos,ideas,info_util,nada) values($1,$2,$3,$4,$5,$6,$7)`;
  let query = {
    text: cc_text,
    values: cc_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_redes_uso(respuesta, table_id) {
  let ru_stalkeo = respuesta[15];
  let ru_values = [table_id, false, false, false, false, false, false];
  if (ru_stalkeo.includes("Facebook")) {
    ru_values[1] = true;
  }
  if (ru_stalkeo.includes("Snapchat")) {
    ru_values[2] = true;
  }
  if (ru_stalkeo.includes("Whatsapp")) {
    ru_values[3] = true;
  }
  if (ru_stalkeo.includes("Tinder")) {
    ru_values[4] = true;
  }
  if (ru_stalkeo.includes("Club Penguin")) {
    ru_values[5] = true;
  }
  if (ru_stalkeo.includes("Ninguna")) {
    ru_values[6] = true;
  }
  let ru_text = `insert into redes_uso(id_redes_uso,convencionales,multimedia,comunicacion,citas,penguin,ninguna) values($1,$2,$3,$4,$5,$6,$7)`;
  let query = {
    text: ru_text,
    values: ru_values,
  };
  console.log(query);
  await insertData(query);
}

async function insert_dispositivos(respuesta, table_id) {
  let dispositivos = respuesta[4];
  let array_dispositivos = dispositivos.split(",");
  let d_values = [table_id, false, false, false, false];
  array_dispositivos.forEach((elem) => {
    if (elem.includes("Laptop")) {
      d_values[1] = true;
    }
    if (elem.includes("Tablet")) {
      d_values[2] = true;
    }
    if (elem.includes("Celular")) {
      d_values[3] = true;
    }
    if (elem.includes("Computadora de escritorio")) {
      d_values[4] = true;
    }
  });
  let d_text = `insert into dispositivos(id_dispositivos,laptop,tablet,celular,computadora_escritorio) values($1,$2,$3,$4,$5)`;
  let query = {
    text: d_text,
    values: d_values,
  };
  console.log(query);
  await insertData(query);
}

async function manipulateData(respuestas) {
  const indexResult = await getNumberRows();
  let index = parseFloat(indexResult.rows[0].count);
  console.log(index);
  for (let i = index; i < respuestas.length; i++) {
    const row = respuestas[i];
    const respuesta = row._rawData;
    let table_id = i + 1;
    console.log(table_id);
    console.log(respuesta);
    await insert_frecuencia_uso(respuesta,table_id);
    await insert_informacion_sensible(respuesta, table_id);
    await insert_tipo_compras(respuesta,table_id);
    await insert_forma_pago(respuesta,table_id);
    await insert_sentimientos_post_uso(respuesta,table_id);
    await insert_uso_stalkeo(respuesta,table_id);
    await insert_contenido_compartido(respuesta,table_id);
    await insert_redes_uso(respuesta,table_id);
    await insert_dispositivos(respuesta,table_id);
    await insert_confianza_paginas(respuesta,table_id);
    await insert_encuestado(respuesta,table_id);
    await insert_seguridad(respuesta,table_id);
    await insert_conclusion(respuesta,table_id);
    await insert_compras_online(respuesta,table_id);
    await insert_redes_sociales(respuesta,table_id);
    console.log("------------------------------------------------------");
  }
}

const insertData = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        return reject(error);
      } else {
        return resolve(res);
      }
    });
  });
};

const getNumberRows = () => {
  return new Promise((resolve, reject) => {
    pool.query("select count(*) from encuestado", (err, res) => {
      if (err) {
        return reject(error);
      } else {
        return resolve(res);
      }
    });
  });
};

async function main() {
  respuestas = await getDataFromSheet();
  await manipulateData(respuestas);
  pool.end();
}

main();
