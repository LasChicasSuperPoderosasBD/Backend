create table frecuencia_uso(
	id_frecuencia_uso numeric(4) primary key,
	redes_sociales varchar(100) not null,
	compras_online varchar(100) not null,
	streaming varchar(100) not null
);
create table seguridad(
	id_seguridad numeric(4) primary key,
	sentimiento_proteccion varchar(100) not null,
	conocimiento_ciberseg varchar(100) not null,
	conocimiento_vigilancia varchar(100) not null,
	conocimiento_leyes varchar(100) not null,
	informacion_sensible varchar(500) not null
);
create table confianza_paginas(
	id_confianza_paginas numeric(4) primary key,
	nombre varchar(100) not null,
	direccion varchar(100) not null,
	datos_bancarios varchar(100) not null,
	preferencias varchar(100) not null
);
create table compras_online (
	id_compras_online numeric(4) primary key,
	tipo_compras varchar(500) not null,
	compras_uso varchar(100) not null,
	frecuencia_compras varchar(100) not null,
	formas_pago varchar(500) not null,
	id_confianza_paginas numeric(4) references confianza_paginas(id_confianza_paginas),
	mayor_miedo varchar(100) not null,
	publicidad_personalizada varchar(100) not null
);
create table encuestado (
	id_encuestado numeric(4) primary key,
	edad varchar(100) not null,
	licenciatura varchar(100) not null,
	genero varchar(100) not null,
	dispositivos varchar(500) not null,
	id_frecuencia_uso numeric(4) references frecuencia_uso(id_frecuencia_uso),
	valoracion_priv_ef varchar(100) not null,
	actitud_ciberseg varchar(100) not null,
	compras_en_linea varchar(100) not null
);
create table redes_sociales (
	id_red_social numeric(4) primary key,
	id_encuestado numeric(4) references encuestado(id_encuestado),
	redes_uso varchar(500) not null,
	tiempo_redes varchar(100) not null,
	razon_uso varchar(100) not null,
	contenido_compartido varchar(500) not null,
	perfiles_publicos varchar(100) not null,
	interaccion_desconocidos varchar(100) not null,
	acceso_desconocidos varchar(100) not null,
	herramientas_privacidad varchar(100) not null,
	servicios_personalizados varchar(100) not null,
	contenido_sin_vigilancia varchar(100) not null,
	contenido_observado varchar(100) not null,
	sentimientos varchar(500) not null,
	impacto_redes_vida varchar(100) not null,
	uso_stalkeo varchar(500) not null,
	comparacion_redes varchar(100)
);
create table conclusion (
	id_conclusion numeric(4) primary key,
	id_encuestado numeric(4) references encuestado(id_encuestado),
	actitud_ciberseg varchar(100) not null,
	vigilancia varchar(100) not null,
	aprender_ciberseg varchar(100) not null
);