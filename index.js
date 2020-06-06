const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//const Font = require('ascii-art-font');

const rutaAcceso = require('./routes/acceso');
const rutaUsuarios = require('./routes/usuarios');

const app = express();
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/corsconfig');


app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

dotenv.config();
app.get('/',index);

app.use("/login",rutaAcceso);
app.use(auth);
app.use("/users",rutaUsuarios);

app.use(notFound);

app.listen(process.env.PORT || 3000,()=>{
    console.log("App en el puerto 3000");
});
