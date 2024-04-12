const express = require("express");
const { route } = require("./coins");
const router = express.Router();
const users = [
    {lastName: "AZCONA", Name: "ANDRES"},
    {lastName: "ACERO GARCIA", Name: "SAMUEL"},
    {lastName: "ALJURI MARTINEZ", Name: "DAREK"},
    {lastName: "CEPEDA URIBE", Name: "JUAN FELIPE"},
    {lastName: "CHAVES PEREZ", Name: "ANA MARIA"},
    {lastName: "CRUZ PAVAS", Name: "CARLOS DAVID"},
    {lastName: "DIAZ ALGARIN", Name: "DIEGO NORBERTO"},
    {lastName: "DIAZ BERNAL", Name: "JORGE ESTEBAN"},
    {lastName: "DIAZ VARGAS", Name: "DAVID ESTEBAN"},
    {lastName: "FORERO PEÑA", Name: "JUAN JOSE"},
    {lastName: "GUTIERREZ DE PIÑERES BARBOSA", Name: "SANTIAGO"},
    {lastName: "LOPEZ HUERTAS", Name: "SAMUEL ESTEBAN"},
    {lastName: "MEDINA FERNANDEZ", Name: "MICHAEL STEVEN"},
    {lastName: "MORENO CARVAJAL", Name: "KATHERIN JULIANA"},
    {lastName: "MORENO PATARROYO", Name: "JUAN PABLO"},
    {lastName: "MUÑOZ SENDOYA", Name: "NICOLAS ESTEBAN"},
    {lastName: "NAVARRO CUY", Name: "SANTIAGO"},
    {lastName: "PARRADO MORALES", Name: "JUAN PABLO"},
    {lastName: "RAMIREZ CHINCHILLA", Name: "DANIEL SANTIAGO"},
    {lastName: "RESTREPO COCA", Name: "JUAN PABLO"},
    {lastName: "REYES GONZALEZ", Name: "GABRIELA"},
    {lastName: "RODRIGUEZ FALLA",Name: "JUAN JOSE"},
    {lastName: "RUIZ TORRES", Name: "VALENTINA"},
    {lastName: "SALAS GUTIERREZ", Name: "MARIANA"},
    {lastName: "SANCHEZ SANDOVAL", Name: "SEBASTIAN"},
    {lastName: "SARMIENTO GUARNIZO", Name: "JOSUE DAVID"},
    {lastName: "SOLER PRADO", Name: "SANTIAGO"},
    {lastName: "TAMAYO LOPEZ", Name: "MARIA FERNANDA"},
    {lastName: "URREA LARA", Name: "DEIVID NICOLAS"}
];

router.route("/")
.get((req, res) => {
    res.send("Bienvendio al modulo de Usuarios");
});

function sortUsers(req, res, next) {
    const { sort } = req.query;

    if (sort === "DESC") {
      users.sort((a, b) => b.lastName.localeCompare(a.lastName));
    } else {
      users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }
    next();
}
  
router.route("/:count")
.get(sortUsers, (req, res) => {
    const count = parseInt(req.params.count);
    const length = parseInt(users.length);

    if (count > users.length) {
        return res.send("No hay más datos disponibles. Pruebe con datos menores a "+length);
    }

    const limitedUsers = users.slice(0, count);
    res.json(limitedUsers);
});

router.post("/", (req, res) => {
  const { firstName, lastName, email, city, country } = req.body;

  // Validar que se proporcionen nombre, apellido y correo electrónico
  if (!firstName || !lastName || !email) {
    return res.status(400).send("Se requieren los parámetros obligatorios: nombre, apellido y correo electrónico.");
  }

  // Establecer valores predeterminados para ciudad y país si no se proporcionan
  const newCity = city || "Bogotá";
  const newCountry = country || "Colombia";

  const newUser = {
    firstName,
    lastName,
    email,
    city: newCity,
    country: newCountry
  };

  res.status(201).json(newUser);
});

module.exports = router;