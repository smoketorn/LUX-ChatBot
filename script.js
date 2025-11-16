const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

// Load memory
let memory = JSON.parse(localStorage.getItem("luxMemory")) || {};

function saveMemory() {
    localStorage.setItem("luxMemory", JSON.stringify(memory));
}

// ENTER to send
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    let text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => botReply(text), 600);
}

function addMessage(message, type, isTyping=false) {
    let div = document.createElement("div");
    div.classList.add("message", type);

    let icon = type === "bot"
        ? `<i class="ri-robot-2-fill" style="color:gold;"></i> `
        : `<i class="ri-user-3-fill" style="color:gold;"></i> `;

    div.innerHTML = icon + (isTyping ? "" : message);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;

    return div;
}

// TYPEWRITER EFFECT
function typeWriter(element, text, speed = 30) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            chatbox.scrollTop = chatbox.scrollHeight;
            setTimeout(typing, speed);
        }
    }
    typing();
}

function botReply(text) {
    let msg = text.toLowerCase();

    // TEACH MODE
    if (msg.startsWith("teach:")) {
        let parts = msg.replace("teach:", "").split("=");

        if (parts.length === 2) {
            let key = parts[0].trim();
            let value = parts[1].trim();

            memory[key] = value;
            saveMemory();

            let bubble = addMessage("", "bot", true);
            typeWriter(bubble, `Got it! "${key}" now means "${value}".`);
        } else {
            let bubble = addMessage("", "bot", true);
            typeWriter(bubble, "Use correct format: teach: question = answer");
        }
        return;
    }

    // MEMORY CHECK
    for (let key in memory) {
        if (msg.includes(key)) {
            let bubble = addMessage("", "bot", true);
            typeWriter(bubble, memory[key]);
            return;
        }
    }

    // DEFAULT ANSWERS
    let response = "I’m not sure about that yet. Teach me using: teach: question = answer";

    if (msg.includes("hi") || msg.includes("hello")) response = "Hello! How can I assist you today?";
    else if (msg.includes("who are you")) response = "I'm Luxora — your elegant green-themed chatbot.";
    else if (msg.includes("bye")) response = "Goodbye! Come back soon.";

    let bubble = addMessage("", "bot", true);
    typeWriter(bubble, response);
}
