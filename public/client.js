const socket = io()

do{
    var  uname=prompt("Enter your name");
}
while(!uname);

let messageArea = document.querySelector(".message-area");
let textArea= document.querySelector("#textarea");

textArea.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        sendMessege(event.target.value);
    }
});

function sendMessege(message){
    let msg={
        user:uname,
        message:message
    }
////Appending Message in text Area   
    appendMessage(msg,"outgoing");
    textArea.value='';
    scrollBottom();
///Sending to Server
    socket.emit("message",msg);      
}

function appendMessage(msg,type){
    let textaDiv= document.createElement("div");
    let className =type;
    textaDiv.classList.add(className,"message");
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    textaDiv.innerHTML=markup;
    messageArea.appendChild(textaDiv);
}

///receive messages from server

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scrollBottom();
})

function scrollBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}