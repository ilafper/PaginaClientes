
$(document).ready(async function() {
    // Lista de clientes inicial
    let clientes = [];
    let img="/img/persona";
    // Generar las tarjetas de clientes existentes

    async function datosBBDD() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '../php/creacion.php', // Asegúrate de que la ruta es correcta
                type: 'POST',
                data: $(this).serialize(),
                success: function(response) {
                    resolve(JSON.parse(response));
                },
                error: function(xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    async function generarTarjetas() {
        let datosClientes= await datosBBDD();
        datosClientes = datosClientes.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        for (const cliente of datosClientes) {
            let tarjetaCliente = `
                <div class="tarjeta" data-id="${cliente.id}">
                    <img class="persona" src="${img}" alt="Foto de Cliente">
                    <h3>${cliente.nombre}</h3>
                    <p>Email: ${cliente.email}</p>
                    <p>Teléfono: ${cliente.telefono}</p>
                    <div class="botones">
                        <a class="borrar" href=""><img src="/img/borrar.png" alt=""></a>
                        <a class="editar" href=""><img src="/img/usuario.png" alt=""></a>
                    </div>
                </div>`;
            $(".contenedor").append(tarjetaCliente); // Agregar la tarjeta al contenedor
        }
    }

    await generarTarjetas();
    // CREAR TARJETA CLIENTE
    $(".guarda").click(function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Obtener los valores del formulario
        let nombreCliente = $("#nombreCliente").val();
        let emailCliente = $("#emailCliente").val();
        let telefonoCliente = $("#telefonoCliente").val();

        // Enviar datos al servidor con AJAX
        $.ajax({
            url: '../php/enviarDatos.php', // Asegúrate de que la ruta es correcta
            type: 'POST',
            data: {
                nombreCliente: nombreCliente,
                emailCliente: emailCliente,
                telefonoCliente: telefonoCliente
            },
            success: function(response) {
                let data = JSON.parse(response);
                if (data.status === "success") {
                    let nuevoCliente = {
                        id: data.id, // ID del cliente insertado
                        img: "/img/persona.png", // Imagen por defecto
                        nombre: nombreCliente,
                        email: emailCliente,
                        telefono: telefonoCliente
                    };

                    // Agregar el nuevo cliente a la lista y generar la tarjeta
                    clientes.push(nuevoCliente);
                    generarTarjetas();

                    // Limpiar los campos del formulario
                    $("#nombreCliente").val('');
                    $("#emailCliente").val('');
                    $("#telefonoCliente").val('');
                } else {
                    console.error("Error al guardar el cliente:", data.message);
                }
            },
            error: function() {
                //console.error("Error en la conexión con el servidor");
            }
        });
    });
});
