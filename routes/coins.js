const express = require("express");
const router = express.Router();

router.route("/")
.get((req, res) => {
    res.send("Bienvenido al sistema de seguimiento del valor en tiempo real de criptomonedas<br><br>Para poder consultar el valor de la criptomoneda el día de hoy, en la barra de navegación añada /coin/Nombre de la criptomoneda <br><br> Ejemplo: /coin/bitcoin");
});

router.route("/:coinType")
.get(async (req, res) => {
    try{
        const coinType = req.params.coinType;

        const response = await fetch("https://api.coincap.io/v2/assets/"+coinType);
        const data = await response.json();

        if(data && data !== null && data.data && data.data.priceUsd){
            const priceUsd = data.data.priceUsd;
            res.send("El precio en dolares para la moneda "+coinType+" al dia de hoy es: "+priceUsd);
        }else {
            res.send("Esa moneda no fue encontrada en la base de datos, intente de nuevo con otra...")
        }
    }
    catch(error){
        res.send("Lo sentimos, se encontro un error al procesar la solicitud de busqueda de la moneda, intentelo de nuevo mas tarde...")
    }
});
module.exports = router;

