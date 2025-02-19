const generarClaveRastreo=()=> {
    const fechaOperacion = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Solo mayúsculas y números
    let clave = "";

    for (let i = 0; i < 8; i++) {
        clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return `${fechaOperacion}${clave}`;

}


module.exports = generarClaveRastreo;


