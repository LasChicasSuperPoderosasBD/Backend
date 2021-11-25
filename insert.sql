INSERT INTO public.frecuencia_uso (id_frecuencia_uso,redes_sociales,compras_online,streaming) VALUES
	 (1,'Muy frecuente','Muy frecuente','Ni mucho ni poco frecuente'),
	 (2,'Poco frecuente','Poco frecuente','Poco frecuente');
INSERT INTO public.seguridad (id_seguridad,sentimiento_proteccion,conocimiento_ciberseg,conocimiento_vigilancia,conocimiento_leyes,informacion_sensible) VALUES
	 (1,'No','Sí','Sí','Sí','Nombre y apellidos, Dirección de casa u oficina, Información bancaria'),
	 (2,'Sí','Sí','Sí','Sí','Nombre y apellidos, Correo electrónico, Redes sociales, Información bancaria');
INSERT INTO public.confianza_paginas (id_confianza_paginas,nombre,direccion,datos_bancarios,preferencias) VALUES
	 (1,'Ni confío ni desconfío','Ni confío ni desconfío','Ni confío ni desconfío','Ni confío ni desconfío'),
	 (2,'Desconfío','Desconfío','Desconfío','Desconfío');
INSERT INTO public.compras_online (id_compras_online,tipo_compras,compras_uso,frecuencia_compras,formas_pago,id_confianza_paginas,mayor_miedo,publicidad_personalizada) VALUES
	 (1,'Servicios de delivery (Rappi, Uber Eats, etc.), Otro','','De 2 a 3 veces a la semana','Tarjeta de crédito, Tarjeta de débito',1,'Robo de información bancaria','Personalizada'),
	 (2,'Servicios de delivery (Rappi, Uber Eats, etc.), Suscripciones a servicios digitales','','De 2 a 3 veces a la semana','Tarjeta de crédito, Tarjetas prepago',2,'Mala calidad de los productos','Aleatoria');
INSERT INTO public.encuestado (id_encuestado,edad,licenciatura,genero,dispositivos,id_frecuencia_uso,valoracion_priv_ef,actitud_ciberseg,compras_en_linea) VALUES
	 (1,'20-22','Sí','Hombre','Laptop, Celular',1,'Intento encontrar un balance','Prudente y moderado','Sí'),
	 (2,'20-22','Sí','No binario','Laptop, Tablet, Celular, Computadora de escritorio',2,'Eficiencia','Prudente y moderado','Sí');
INSERT INTO public.redes_sociales (id_red_social,id_encuestado,redes_uso,tiempo_redes,razon_uso,contenido_compartido,perfiles_publicos,interaccion_desconocidos,acceso_desconocidos,herramientas_privacidad,servicios_personalizados,contenido_sin_vigilancia,contenido_observado,sentimientos,impacto_redes_vida,uso_stalkeo,comparacion_redes) VALUES
	 (1,1,'Redes convencionales (Facebook, Twitter, Reddit, Linkedln), Redes de comunicación (Whatsapp, Telegram, Discord), Club Penguin','3 horas - 5 horas','Entretenimiento','Memes, Música y videos populares, Ideas propias','Sí','No','Sí','No','Depende de mi estado de ánimo al momento','Ni de acuerdo ni desacuerdo','Sí','Feliz, Triste, Enojado','Indistinto.','En ningún caso es correcto investigar sobre los datos personales de otros','Una herramienta'),
	 (2,2,'Redes multimedia (Snapchat, TikTok), Apps de citas (Tinder, Grindr, Bumble), Club Penguin','Mayor a 8 horas','Trabajo','Fotos personales, Ideas propias, Información útil para los demás','No','No','Sí','Sí','Busco el contenido que me interesa','Ni de acuerdo ni desacuerdo','No','Feliz, Enojado, Indiferente','Negativo. Empeoran mi vida.','En ningún caso es correcto investigar sobre los datos personales de otros','Una herramienta');
INSERT INTO public.conclusion (id_conclusion,id_encuestado,actitud_ciberseg,vigilancia,aprender_ciberseg) VALUES
	 (2,2,'Prudente y moderado','Sí','Sí'),
	 (1,1,'Prudente y moderado','Sí','Sí');