const socket = io();

const params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("El nombre y la sala son necesarios");
}

const usuario = {
  nombre: params.get("nombre"),
  sala: params.get("sala"),
};

socket.on("connect", function() {
  console.log("Conectado al servidor");
  socket.emit("entrarChat", usuario, resp => {
    console.log("Usuarios conectados", resp);
  });
});

// escuchar
socket.on("disconnect", function() {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
//   "crearMensaje",
//   {
//     usuario: "Fernando",
//     mensaje: "Hola Mundo"
//   },
//   function(resp) {
//     console.log("respuesta server: ", resp);
//   }
// );

// Escuchar información
socket.on("crearMensaje", mensaje => {
  console.log("Servidor:", mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on("listaPersonas", personas => {
  console.log(personas);
});

// Mensajes privados
socket.on("mensajePrivado", mensaje => {
  console.log("Mensaje privado", mensaje);
});
