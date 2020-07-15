//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");

        //JS give it undefined in creation phase.
        //firestore return a function to it,
        //after calling getChats() in execute phase.
        this.unsub;
    }

    //creating a method
    async addChat(message) {
        //format a chat obj
        const now = new Date();
        const chat = {
            message, //message: message
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document, notces it is still inside async addChat
        const response = await this.chats.add(chat);
        return response;
    }

    //make sure to understand the callback
    getChats(callBackWithData) {
        this.unsub = this.chats
            //complex queries(where medthod only return same room)
            .where("room", "==", this.room)
            .orderBy("created_at")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        //update the ui
                        callBackWithData(change.doc.data());
                    };
                });
            });
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem("username", username);
    }

    updateRoom(room) {
        this.room = room;
        console.log("room updated");

        //firestore return FUNCTION to this.unsub in on execute phase.
        //that is why you can run it like a function.
        //need to if check.
        //this.unsub has undefined value before getChats() is called.
        if (this.unsub) {
            this.unsub();
        };
    }
}


//const generalroom = new Chatroom("gaming", "lucis");
//console.log(chatroom);


// setTimeout(() => {
//     chatroom.updateRoom("gaming");
//     chatroom.updateName("yoshi")
//     chatroom.getChats((data) => {
//         console.log(data);
//     });
//     chatroom.addChat("hello");
// }, 3000);


// chatroom.updateRoom("gaming");


//generalroom.addChat("testing!!!!")
// chatroom.addChat("hello everyone").then(() => {
//     console.log("chat added");
// }).catch((err) => {
//     conbsole.log(err);
// });


//this actrully worked....
// const callBackWithData = (data) => {
//     console.log(data);
// };

// chatroom.getChats();