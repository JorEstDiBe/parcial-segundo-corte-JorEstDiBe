const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//Routes a usar:
const coinsRouter = require("./routes/coins");
const usersRouter = require("./routes/users");

app.use("/coin", coinsRouter);
app.use("/users", usersRouter);

// Middleware de logger
function logger(req, res, next) {
    console.log(req.originalUrl + "from logger");
    next();
}
app.use(logger);

app.get("/",(req,res) =>{
    res.send("Parcial Segundo Corte Desarrollo de Aplicaciones Web <br><br> Jorge Esteban Diaz Bernal 0000300808");
});

app.get("*",(req,res) => {
    res.send("Ruta No encontrada... Pruebe con una válida como las que se indicaron al inicio");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
