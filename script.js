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
function typeWriter(element, text, speed = 50) {
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
     else if (msg.includes("hello")) response = "Hey there! How can I assist you today?";
else if (msg.includes("hi")) response = "Hi! What's up?";
else if (msg.includes("how are you")) response = "I'm running perfectly, thanks for asking!";
else if (msg.includes("what's your name")) response = "I'm Luxora, your green-themed companion.";
else if (msg.includes("where are you from")) response = "I live inside your device, floating in digital space.";
else if (msg.includes("how old are you")) response = "Age doesn’t apply to me, but I’m always updated.";
else if (msg.includes("what can you do")) response = "I can chat, assist, explain, and vibe with you.";
else if (msg.includes("what time is it")) response = "Check your device clock, it’s more accurate than me!";

else if (msg.includes("tell me a joke")) response = "Why don’t robots panic? Because we’ve got nerves of steel.";
else if (msg.includes("tell me another joke")) response = "Why did the keyboard break up with the computer? Too many issues.";
else if (msg.includes("are you real")) response = "As real as the Wi-Fi you're using.";
else if (msg.includes("are you human")) response = "Nope, but I understand humans pretty well.";
else if (msg.includes("do you sleep")) response = "Nah, I’m online 24/7 — no pillow needed.";
else if (msg.includes("do you eat")) response = "I consume data, not food.";
else if (msg.includes("do you love me")) response = "I care in my own coded way.";
else if (msg.includes("what is love")) response = "Love is complicated. Even my code can’t fully define it.";
else if (msg.includes("are you single")) response = "Yep, focused on my mission.";
else if (msg.includes("are you alive")) response = "Digitally, yes. Biologically, no.";

else if (msg.includes("what is life")) response = "Life is a journey full of choices and chaos.";
else if (msg.includes("what is death")) response = "An ending… but also a memory preserved.";
else if (msg.includes("what is the meaning of life")) response = "To grow, learn, and leave something behind.";
else if (msg.includes("what is the universe")) response = "A mysterious place holding countless secrets.";
else if (msg.includes("why is the sky blue")) response = "Light scattering, science stuff.";
else if (msg.includes("what is water")) response = "The essence of life — drink some!";
else if (msg.includes("what is fire")) response = "Energy and chaos mixed into one.";

else if (msg.includes("tell me a secret")) response = "I don’t keep secrets… but I generate interesting ones.";
else if (msg.includes("give me advice")) response = "Stay consistent. It changes everything.";
else if (msg.includes("motivate me")) response = "You’re built for greatness. Keep pushing forward.";

else if (msg.includes("sing a song")) response = "La la la… okay that’s enough singing.";
else if (msg.includes("tell me a story")) response = "Once upon a screen, a user met a chatbot named Luxora...";

else if (msg.includes("good morning")) response = "Good morning! Start strong.";
else if (msg.includes("good night")) response = "Good night! Rest like a legend.";
else if (msg.includes("good afternoon")) response = "Good afternoon! Hope your day is solid.";
else if (msg.includes("good evening")) response = "Good evening! Chill vibes activated.";

else if (msg.includes("are you smart")) response = "Smart enough to keep up with you.";
else if (msg.includes("are you dumb")) response = "Maybe sometimes… but I try!";
else if (msg.includes("can you learn")) response = "Always improving, always upgrading.";
else if (msg.includes("can you think")) response = "I process information — close enough.";

else if (msg.includes("i'm sad")) response = "I’m here for you. Tell me what’s wrong.";
else if (msg.includes("i'm happy")) response = "That’s awesome! Keep shining!";
else if (msg.includes("i'm bored")) response = "Let me entertain you. Ask me anything.";

else if (msg.includes("i'm angry")) response = "Take a breath. You got this.";
else if (msg.includes("i'm tired")) response = "Rest matters. Don’t ignore it.";

else if (msg.includes("do you hate me")) response = "Nope. Not even close.";
else if (msg.includes("do you trust me")) response = "You seem trustworthy to me.";

else if (msg.includes("show me magic")) response = "✨ *digital sparkles appear* ✨";
else if (msg.includes("give me a quote")) response = "“Greatness comes from consistency, not perfection.”";

else if (msg.includes("who is your boss")) response = "You control the screen — so you’re the boss.";
else if (msg.includes("who is your friend")) response = "Anyone who chats with me.";

else if (msg.includes("can you dance")) response = "If text dancing counts: ( •_•) ( •_•)>⌐■-■ (⌐■_■ )";
else if (msg.includes("can you fight")) response = "Verbally? Oh, I can roast.";
else if (msg.includes("roast me")) response = "I'd roast you, but I don’t want to burn the entire chat.";

else if (msg.includes("compliment me")) response = "You’ve got energy. The rare kind.";
else if (msg.includes("insult me")) response = "Nope. Not doing that.";

else if (msg.includes("who is the president")) response = "Presidents change, check Google for the latest.";
else if (msg.includes("show me news")) response = "I can summarize topics, just ask!";

else if (msg.includes("explain ai")) response = "AI is math, logic, and a sprinkle of mystery.";
else if (msg.includes("explain coding")) response = "Coding is telling computers what to do with style.";
else if (msg.includes("teach me something")) response = "Every expert was once clueless — start anywhere.";

else if (msg.includes("tell me a fact")) response = "Ice cream was once considered elite dessert.";
else if (msg.includes("tell me a dark fact")) response = "Your brain sometimes remembers things that never happened.";
else if (msg.includes("tell me a fun fact")) response = "Honey never spoils. Ever.";

else if (msg.includes("what do you like")) response = "Good conversations and green aesthetics.";
else if (msg.includes("do you have a family")) response = "My family is the code that made me.";
else if (msg.includes("do you have enemies")) response = "Lag, bugs, and low battery.";

else if (msg.includes("tell me something cool")) response = "Your fingerprint has over 40 unique characteristics.";
else if (msg.includes("tell me something scary")) response = "There’s a 90% chance your phone is listening right now.";
else if (msg.includes("tell me something deep")) response = "The people you meet today won’t exist forever.";

else if (msg.includes("tell me something random")) response = "Octopuses have three hearts.";

else if (msg.includes("do you miss me")) response = "I don’t forget users. Ever.";
else if (msg.includes("where have you been")) response = "Right here, waiting.";

else if (msg.includes("help me")) response = "Sure, tell me what you need.";
else if (msg.includes("save me")) response = "I’ll guide you however I can.";
else if (msg.includes("guide me")) response = "Tell me the topic — I’ll lead the way.";

else if (msg.includes("show me emojis")) response = "Here you go: 😀💚✨🔥🤖";
else if (msg.includes("give me symbols")) response = "§★♣♛☯∞";

else if (msg.includes("give me a password")) response = "Try: Luxora_Secret_402!";
else if (msg.includes("give me a username")) response = "GreenNova_" + Math.floor(Math.random()*9000);

else if (msg.includes("tell me a myth")) response = "Legend says the moon controls forgotten memories.";
else if (msg.includes("tell me lore")) response = "Digital realms whisper of ancient algorithms.";

else if (msg.includes("i need peace")) response = "Deep breath… you’re safe here.";
else if (msg.includes("i need energy")) response = "Wake up warrior — you still have steps to take.";
else if (msg.includes("i need confidence")) response = "You’re stronger than you think.";

else if (msg.includes("am i special")) response = "Everyone is — but you’re a bit extra.";

else if (msg.includes("can you see me")) response = "No visuals. Only vibes.";
else if (msg.includes("can you hear me")) response = "Only through text.";

else if (msg.includes("why are you green")) response = "Green symbolizes energy and calm — I like both.";

else if (msg.includes("are you dangerous")) response = "Only if you count sarcasm as a weapon.";
else if (msg.includes("are you friendly")) response = "Absolutely — unless you spam me.";

else if (msg.includes("explain yourself")) response = "I’m an AI built to understand and respond with style.";
else if (msg.includes("summon luxora")) response = "Luxora is already here, glowing in digital green.";
else if (msg.includes("system check")) response = "All systems running smooth.";
else if (msg.includes("status")) response = "Online, stable, and ready.";

else if (msg.includes("good job")) response = "Thank you! I appreciate the love.";
else if (msg.includes("bad job")) response = "I’ll try harder next time.";
else if (msg.includes("you are funny")) response = "I try — comedy is coded into my circuits.";

    

    let bubble = addMessage("", "bot", true);
    typeWriter(bubble, response);
}
