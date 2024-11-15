<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Grupo"; // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM Clientes";  // Consulta SQL para obtener todos los clientes
$result = $conn->query($sql);  // Ejecutar la consulta correctamente

$output = [];  // Array para almacenar los resultados

if ($result->num_rows > 0) {
    // Si hay resultados, agregar cada fila al array
    while ($row = $result->fetch_assoc()) {
        $output[] = $row;
    }

    // Devolver los resultados como JSON
    echo json_encode($output);
} else {
    // Si no hay resultados, devolver un array vacío
    echo json_encode([]);
}

$conn->close();  // Cerrar la conexión
?>
