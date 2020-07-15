//dom queries
const ul = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");


//add a new chat
newChatForm.addEventListener("submit", e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();

    chatroom.addChat(message).then(() => {
        newChatForm.reset();
    }).catch((err) => {
        console.log(err);
    });
});


//update username
newNameForm.addEventListener("submit", e => {
    e.preventDefault();

    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //reset the form
    newNameForm.reset();

    //show then hide the update message
    updateMssg.innerText = `you name was updated to ${newName}`;
    setTimeout(() => {
        updateMssg.innerText = "";
    }, 3000);
});


//update the chat room
rooms.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        chatUI.clear();

        chatroom.updateRoom(e.target.getAttribute("id"));

        chatroom.getChats((dataCallBackedFromFirestore) => {
            chatUI.render(dataCallBackedFromFirestore);
        });
    };
});


//check localstorage for a name
const username = localStorage.username ? localStorage.username : "annon";


//class instances
const chatUI = new ChatUI(ul);
const chatroom = new Chatroom("general", username);


//get the chat and render
chatroom.getChats((receivedData) => {
    chatUI.render(receivedData);
});