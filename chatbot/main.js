const msg_text = document.querySelector('.msg-text');
const msger_input= document.querySelector(".msger-input");


function mesgChat(message) {
    if (message && message.choices && message.choices.length > 0 ) {
        createMessageBox("bot", message.choices[0].message.content)
    } else {
        createMessageBox("bot", "Je n'ai pas su répondre")
    }
}

async function sendToChatGPT(text) {
    const apiURL = "https://api.openai.com/v1/chat/completions";
    try {
        const token = "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"
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer '+token,
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user",
                        "content": text
                    }
                ]
            })
        });
        const data = await response.json();
        console.log(data);
        mesgChat(data)
    } catch (error) {
        createMessageBox("bot", "Oups... une erreur est survenue lorsque j'ai essayé de vous répondre.")
        console.error(error)
    }
}

function sendMessage() {
    let text = $("input.msger-input").val();
    createMessageBox("user", text);
    sendToChatGPT(text);
    msger_input.value = "";
}

$(".msger-send-btn").click(sendMessage)


function createMessageBox(person, text) {
    if(person == "bot") {
        let date = new Date();
        let newMessage = $(`
            <div class="msg left-msg">
                <div  class="msg-img bot"></div>
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
                    </div>
                    <div class="msg-text">
                        ${text}
                    </div>
                </div>
            </div>
        `);
        $(".msger-chat").append(newMessage)
    }
    if(person == "user") {
        let date = new Date();
        let newMessage = $(`
            <div class="msg right-msg">
                <div  class="msg-img user"></div>
        
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">Vous</div>
                        <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
                    </div>
                    <div class="msg-text">
                        ${text}
                    </div>
                </div>
            </div>
        `);
        $(".msger-chat").append(newMessage)
    }
}
    