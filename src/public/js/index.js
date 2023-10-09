//Con este socket vamos a establecer la comunicación con nuestro servidor
const socket = io();
let user;
const chatbox = document.getElementById("chatbox");
const messagesLogs = document.getElementById("messageLogs");

//Vamos a desarrollar el modal de auntenticación
Swal.fire({
    title: "Identificate",
    input:"text",
    text:"Ingresa el usuario para identificarte en el char",
    inputValidator: (value) =>{
        return !value && "Necesitas escribir un nombre de usuario para comenzar a chatear"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit("authenticated", user);
});

chatbox.addEventListener("keyup", evt => {
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length > 0){
            socket.emit("message", {user, message: chatbox.value})
            chatbox.value = " ";
        }
    }
    
})

socket.on("messageLogs", data => {
    let messages = " ";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br>`
    });
    messagesLogs.innerHTML = messages;
});

socket.on("newUserConected", data => {
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})
