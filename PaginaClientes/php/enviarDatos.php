<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Grupo"; // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre= $_POST["nombreCliente"];
    $email= $_POST["emailCliente"];
    $tlf= $_POST["telefonoCliente"];

}

$sql ="INSERT INTO Clientes (id, nombre, email, telefono) VALUES (?,?,?,?,?)";

$peticion=$conn ->prepare($sql);
$peticion-> bind_param("issss",$nombre, $email,$tlf);

try {
    $peticion->execute();
    echo "datos agregados correctamente";
} catch (Exeption $e) {
    echo "Error al agregar los datos".$e->getMenssage();
}

$conn->close();
?>
