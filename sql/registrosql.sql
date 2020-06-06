CREATE TABLE usuarios (
id_us int not null primary key auto_increment,
nombre varchar(64) not null,
apellidos varchar(64) not null,
telefono varchar(64) not null,
correo varchar(64) not null,
direccion varchar(128) not null,
contrasena varchar(64) not null,
tipousr char default 'N' not null
);
ALTER TABLE usuarios CHANGE COLUMN tipousr tipousr char null default 'N';