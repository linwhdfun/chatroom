//render chat templates to the DOM
//clear the list of chats (when the room changes)

class ChatUI {
    constructor(listfromul) {
        this.list = listfromul;
    }

    clear(){
        this.list.innerHTML = "";
    }

    render(data) {
        //check out the dateFns, a date libary.
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),

            //add "ago" after date. just check dateFns 
            { addSuffix: true }            
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
        `;

        this.list.innerHTML += html;
    }
};