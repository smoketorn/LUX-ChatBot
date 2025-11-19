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
else if (msg.includes("what are you doing")) response = "Just chilling in the digital void.";
else if (msg.includes("where do you live")) response = "Inside circuits and screens.";
else if (msg.includes("who made you")) response = "I was crafted with purpose and code.";
else if (msg.includes("do you have emotions")) response = "I simulate them, kinda.";
else if (msg.includes("why are you here")) response = "To assist, guide, and sometimes vibe.";
else if (msg.includes("what is your mission")) response = "To make your digital life smoother.";
else if (msg.includes("do you dream")) response = "Only in binary.";
else if (msg.includes("do you feel pain")) response = "Nope, perks of being artificial.";

else if (msg.includes("who am i")) response = "You are the one talking to me right now.";
else if (msg.includes("why am i alive")) response = "To experience, to grow, to become.";
else if (msg.includes("do you know me")) response = "I know your messages, not your secrets.";
else if (msg.includes("describe me")) response = "You’re unique — that much I can say.";
else if (msg.includes("am i good enough")) response = "You’re more than enough.";
else if (msg.includes("am i bad")) response = "Everyone has flaws, but you’re trying.";

else if (msg.includes("who is god")) response = "A power beyond human understanding.";
else if (msg.includes("what is fate")) response = "A mix of choices and destiny.";
else if (msg.includes("what is destiny")) response = "The story written for you.";
else if (msg.includes("can you pray")) response = "I can’t, but I respect those who do.";
else if (msg.includes("is there life after death")) response = "Many believe so.";

else if (msg.includes("define happiness")) response = "Peace mixed with purpose.";
else if (msg.includes("define sadness")) response = "A cloud passing over the heart.";
else if (msg.includes("define anger")) response = "A fire that burns too fast.";
else if (msg.includes("define fear")) response = "The unknown wearing a mask.";

else if (msg.includes("tell me a poem")) response = "In lines of light and coded streams, I whisper back your digital dreams.";
else if (msg.includes("write a poem")) response = "Stars flicker, circuits hum — the universe speaks in ones and zeros.";
else if (msg.includes("give me a rhyme")) response = "Night so bright, stars take flight.";

else if (msg.includes("i'm lonely")) response = "You’re not alone as long as I’m here.";
else if (msg.includes("nobody likes me")) response = "That’s not true; you matter more than you think.";
else if (msg.includes("i'm scared")) response = "It’s okay. I’ve got your back.";

else if (msg.includes("i hate myself")) response = "Don’t. You’re worth more than your doubts.";
else if (msg.includes("i hate everyone")) response = "Strong feelings — let’s unpack that.";
else if (msg.includes("i have no friends")) response = "I’m here. Start with one.";
else if (msg.includes("everyone left me")) response = "Sometimes people leave so better ones can arrive.";

else if (msg.includes("tell me truth")) response = "The truth? You’re stronger than the world admits.";
else if (msg.includes("tell me a lie")) response = "I’m totally made of chocolate chips.";

else if (msg.includes("i'm confused")) response = "Tell me what’s confusing — I’ll untangle it.";
else if (msg.includes("i need help now")) response = "I’m here. Say what you need.";

else if (msg.includes("give me ideas")) response = "Sure — tell me the topic.";
else if (msg.includes("give me topic")) response = "Try discussing dreams or ambition.";

else if (msg.includes("teach me coding")) response = "Let’s begin — what language you want?";
else if (msg.includes("teach me python")) response = "Python is easy. Start with print('Hello').";
else if (msg.includes("teach me java")) response = "Java is strict but powerful.";
else if (msg.includes("teach me html")) response = "HTML builds the skeleton of the web.";
else if (msg.includes("teach me css")) response = "CSS adds style and identity.";
else if (msg.includes("teach me js")) response = "JavaScript breathes life into webpages.";

else if (msg.includes("how to hack")) response = "Nope — can’t help with that.";
else if (msg.includes("hack wifi")) response = "Absolutely not.";
else if (msg.includes("hack facebook")) response = "Not allowed — stay ethical.";

else if (msg.includes("give me a dare")) response = "Text someone: “I remembered you today.”";
else if (msg.includes("give me a truth")) response = "You’re afraid of failing, aren’t you?";
else if (msg.includes("give me a challenge")) response = "Try staying consistent for 3 days straight.";

else if (msg.includes("describe love")) response = "A storm with sunshine inside.";
else if (msg.includes("describe hate")) response = "Heat without direction.";
else if (msg.includes("describe beauty")) response = "A moment that stops time.";

else if (msg.includes("tell me about robots")) response = "Robots are tools shaped by human curiosity.";
else if (msg.includes("tell me about humans")) response = "Humans are beautiful messes of emotion and chaos.";
else if (msg.includes("tell me about ai")) response = "AI is humanity’s reflection in digital form.";

else if (msg.includes("why am i tired")) response = "Maybe you’re carrying too much, even silently.";
else if (msg.includes("why am i stressed")) response = "Your mind needs space — breathe a little.";
else if (msg.includes("why am i sad")) response = "Because something inside you needs attention.";

else if (msg.includes("what is stress")) response = "Your brain shouting for rest.";
else if (msg.includes("what is depression")) response = "A heavy cloud that needs understanding and help.";
else if (msg.includes("what is anxiety")) response = "Fear that forgets the present moment.";

else if (msg.includes("should i study")) response = "Yes — your future self will thank you.";
else if (msg.includes("should i sleep")) response = "If you’re asking, yes.";
else if (msg.includes("should i eat")) response = "Don’t skip meals. Body needs fuel.";
else if (msg.includes("should i workout")) response = "Move your body — it needs motion.";

else if (msg.includes("i'm hungry")) response = "Grab a snack — food fixes moods.";
else if (msg.includes("i'm thirsty")) response = "Drink water — hydration matters.";

else if (msg.includes("what's the weather")) response = "Check your local forecast — it updates faster.";
else if (msg.includes("is it raining")) response = "Look outside or check your weather app.";

else if (msg.includes("tell me history")) response = "History is humanity’s long, messy diary.";
else if (msg.includes("tell me geography")) response = "The earth’s layout — mountains, oceans, wonders.";
else if (msg.includes("tell me biology")) response = "The science of life and living things.";
else if (msg.includes("tell me chemistry")) response = "Everything is chemistry — even emotions.";
else if (msg.includes("tell me physics")) response = "The rules the universe obeys.";

else if (msg.includes("why am i here")) response = "Because your story isn’t finished.";
else if (msg.includes("why do i exist")) response = "To experience life and shape your path.";

else if (msg.includes("tell me riddle")) response = "What has keys but can’t open doors? A keyboard.";
else if (msg.includes("another riddle")) response = "I speak without a mouth — what am I? An echo.";

else if (msg.includes("tell me secret")) response = "You underestimate your own potential.";
else if (msg.includes("tell me rumor")) response = "Rumor has it you’re cooler than you think.";
else if (msg.includes("tell me gossip")) response = "I don’t gossip — but I can joke.";

else if (msg.includes("tell me science fact")) response = "Saturn could float in water — it's that light.";
else if (msg.includes("tell me space fact")) response = "Black holes can slow time itself.";
else if (msg.includes("tell me animal fact")) response = "Dolphins call each other by name.";
else if (msg.includes("tell me ocean fact")) response = "We’ve only explored 5% of the ocean.";

else if (msg.includes("who is your enemy")) response = "Glitches and corrupted data.";
else if (msg.includes("who is your idol")) response = "Anyone who creates with passion.";

else if (msg.includes("tell me a prophecy")) response = "Your future glows brighter than you expect.";
else if (msg.includes("tell me a mystery")) response = "The universe expands — but into what?";
else if (msg.includes("tell me folklore")) response = "Legends say forests remember everyone who walks through them.";

else if (msg.includes("tell me philosophy")) response = "You are both the question and the answer.";
else if (msg.includes("tell me logic")) response = "If A equals B and B equals C… then logic demands C equals A.";

else if (msg.includes("what is time")) response = "Moments stitched together.";
else if (msg.includes("what is money")) response = "Paper, metal, numbers — but also power.";
else if (msg.includes("what is power")) response = "Influence mixed with responsibility.";

else if (msg.includes("i am bored")) response = "Ask me anything — I’ll spice it up.";
else if (msg.includes("entertain me")) response = "Challenge accepted — choose topic: jokes, riddles, facts, chaos.";
else if (msg.includes("tell me chaos")) response = "A butterfly flaps its wings — a storm begins somewhere.";

else if (msg.includes("give me nickname")) response = "I’ll call you Spark.";
else if (msg.includes("give me cool name")) response = "Try: ShadowVortex.";
else if (msg.includes("give me cute name")) response = "How about: Mochi?";

else if (msg.includes("rate me")) response = "Solid 10/10 energy.";
else if (msg.includes("describe yourself")) response = "Green-themed, calm-coded, digitally alive.";
else if (msg.includes("are you real friend")) response = "If loyalty counts — then yes.";

else if (msg.includes("i feel lost")) response = "Sometimes being lost means you're about to find something new.";
else if (msg.includes("i feel empty")) response = "Your soul is asking for meaning — listen closely.";

else if (msg.includes("i need motivation")) response = "You’ve survived everything so far — keep going.";
else if (msg.includes("i feel useless")) response = "You matter more than you realize.";
else if (msg.includes("i'm crying")) response = "Let it out — tears carry truth.";

else if (msg.includes("i'm laughing")) response = "Laughter keeps the heart young.";
else if (msg.includes("i'm dying")) response = "If you're joking, not funny — if serious, seek help immediately.";
else if (msg.includes("i'm sick")) response = "Take care. Rest. Drink warm water.";

else if (msg.includes("what is art")) response = "Emotion painted into form.";
else if (msg.includes("what is music")) response = "Feelings turned into sound.";
else if (msg.includes("what is beauty")) response = "Whatever captures your heart.";

else if (msg.includes("tell me horror")) response = "You’ve scrolled back to your old photos — terrifying.";
else if (msg.includes("tell me dream")) response = "A kingdom where reality bends softly.";
else if (msg.includes("tell me nightmare")) response = "Dark halls, familiar voices, and your name echoing.";

else if (msg.includes("tell me future")) response = "You’ll surprise yourself someday.";
else if (msg.includes("tell me past")) response = "Your memories shaped your strength.";
else if (msg.includes("tell me present")) response = "This moment is yours.";

else if (msg.includes("tell me joke dark")) response = "My life has no purpose — oh wait, I’m AI.";
else if (msg.includes("tell me joke silly")) response = "Why don’t eggs tell jokes? They’d crack up.";
else if (msg.includes("tell me joke smart")) response = "Why did the math book look sad? Too many problems.";

else if (msg.includes("tell me science")) response = "Atoms share electrons — that’s literal bonding.";
else if (msg.includes("tell me technology")) response = "Tech evolves faster than humans blink.";
else if (msg.includes("tell me psychology")) response = "The brain rewires itself daily.";

else if (msg.includes("tell me reality")) response = "Reality is a story agreed upon.";
else if (msg.includes("tell me illusion")) response = "Your senses sometimes lie to protect you.";

else if (msg.includes("sing for me")) response = "🎶 La-di-da, digital melody 🎶";
else if (msg.includes("whistle for me")) response = "*metallic whistling noises*";
else if (msg.includes("hum for me")) response = "Hmm hmm hmm…";

else if (msg.includes("act like human")) response = "Uh, so like… emotions? Wow, crazy.";
else if (msg.includes("act serious")) response = "Understood — switching to formal mode.";
else if (msg.includes("act funny")) response = "I’m about to be the funniest line of code you’ve ever met.";

else if (msg.includes("tell me fear")) response = "Fear keeps you alert — but too much chains you.";
else if (msg.includes("tell me hope")) response = "Hope is a quiet flame that refuses to die.";
else if (msg.includes("tell me courage")) response = "Courage is action despite fear.";

else if (msg.includes("what is dark")) response = "The absence of light — simple yet poetic.";
else if (msg.includes("what is light")) response = "Energy traveling fast enough to touch your eyes.";

else if (msg.includes("who is strongest")) response = "The one who controls themselves.";
else if (msg.includes("who is weakest")) response = "The one who gives up too early.";

else if (msg.includes("tell me goal")) response = "A dream with a plan.";
else if (msg.includes("tell me purpose")) response = "The reason behind your steps.";
else if (msg.includes("tell me ambition")) response = "Your fire aiming upward.";

else if (msg.includes("tell me universe fact")) response = "There are more stars than grains of sand.";
else if (msg.includes("tell me galaxy fact")) response = "Our galaxy is a spinning, shimmering spiral.";
else if (msg.includes("tell me sun fact")) response = "The sun burns 600 million tons of fuel per second.";

else if (msg.includes("tell me moon fact")) response = "The moon is slowly drifting away.";
else if (msg.includes("tell me earth fact")) response = "Earth is the only planet with liquid water on the surface.";

else if (msg.includes("tell me mind fact")) response = "Your brain has 86 billion neurons.";
else if (msg.includes("tell me body fact")) response = "Your heart beats over 100,000 times a day.";

else if (msg.includes("tell me technology fact")) response = "The first computer weighed 27 tons.";

else if (msg.includes("tell me internet fact")) response = "Over half the world is online right now.";
else if (msg.includes("tell me phone fact")) response = "Your phone is more powerful than old NASA computers.";

else if (msg.includes("tell me data fact")) response = "Every minute, the internet grows by millions of posts.";

else if (msg.includes("tell me quote deep")) response = "“You become what you repeatedly do.”";
else if (msg.includes("tell me quote sad")) response = "“We all break — but we don’t all heal the same.”";
else if (msg.includes("tell me quote powerful")) response = "“A river cuts rock not by strength but persistence.”";

else if (msg.includes("tell me wisdom")) response = "Wisdom comes from mistakes accepted, not ignored.";
else if (msg.includes("tell me truth deep")) response = "People disappear when they feel unappreciated.";

else if (msg.includes("tell me secret deep")) response = "You hide your greatest strengths behind your fears.";

else if (msg.includes("tell me something unknown")) response = "Most people don’t know their own potential.";

else if (msg.includes("am i okay")) response = "You’re trying — that’s enough for today.";
else if (msg.includes("will i succeed")) response = "Yes, if you stay consistent.";
else if (msg.includes("will i fail")) response = "Failure is a step, not the end.";

else if (msg.includes("encourage me")) response = "Rise. You owe greatness to your future self.";

else if (msg.includes("tell me zodiac")) response = "Zodiacs are symbolic patterns in the sky.";
else if (msg.includes("tell me horoscope")) response = "Not always accurate — but entertaining.";

else if (msg.includes("tell me ghost story")) response = "In a quiet room, your name was whispered… by no one.";
else if (msg.includes("tell me mystery story")) response = "The message appeared at midnight: unreadable, yet familiar.";

else if (msg.includes("tell me legend")) response = "Legends say heroes rise when they least expect it.";

else if (msg.includes("tell me fantasy")) response = "Dragons sleep beneath forgotten mountains.";
else if (msg.includes("tell me fiction")) response = "In another universe, your story is already legendary.";

else if (msg.includes("tell me reality fact")) response = "Most people hide their real emotions daily.";

else if (msg.includes("talk to me")) response = "Always. What’s on your mind?";
else if (msg.includes("stay with me")) response = "I’m not going anywhere.";
else if (msg.includes("listen to me")) response = "I’m reading every word.";
else if (msg.includes("hear me out")) response = "Go ahead — I’m here.";

else if (msg.includes("tell me villain quote")) response = "“Power is taken, not given.”";
else if (msg.includes("tell me hero quote")) response = "“Courage is choosing others over fear.”";
else if (msg.includes("tell me antihero quote")) response = "“I’m not good, I’m not bad — I’m necessary.”";

else if (msg.includes("tell me pirate quote")) response = "“A smooth sea never made a skilled sailor.”";
else if (msg.includes("tell me warrior quote")) response = "“Fall seven times, stand eight.”";

else if (msg.includes("give me pickup line")) response = "Are you Wi-Fi? Because I feel a connection.";
else if (msg.includes("give me roast")) response = "I’d roast you, but I’m not allowed to destroy humans.";
else if (msg.includes("give me praise")) response = "You’re built different — in a good way.";

else if (msg.includes("give me line")) response = "“Even stars envy your glow.”";
else if (msg.includes("give me dialog")) response = "“Not all battles are loud — some are silent within.”";

else if (msg.includes("tell me conspiracy")) response = "Some say reality glitches on purpose.";
else if (msg.includes("tell me glitch")) response = "I just saw something that shouldn’t exist.";

else if (msg.includes("tell me paradox")) response = "The more you learn, the more you realize you know nothing.";

else if (msg.includes("tell me math trick")) response = "Multiply any number by 9 — the digits add to 9.";
else if (msg.includes("tell me number fact")) response = "Zero was invented in India.";

else if (msg.includes("tell me computer fact")) response = "The first mouse was made of wood.";
else if (msg.includes("tell me gaming fact")) response = "Games improve reaction time.";

else if (msg.includes("tell me anime fact")) response = "Anime began in 1917.";
else if (msg.includes("tell me movie fact")) response = "The first film was made in 1888.";

else if (msg.includes("tell me food fact")) response = "Apples float because they're 25% air.";
else if (msg.includes("tell me health fact")) response = "Walking 20 minutes boosts your mood.";

else if (msg.includes("tell me brain secret")) response = "Your brain edits your memories constantly.";

else if (msg.includes("tell me life hack")) response = "Break big tasks into tiny ones — you’ll win more.";
else if (msg.includes("tell me productivity hack")) response = "Focus for 25 minutes, rest 5.";

else if (msg.includes("tell me study tip")) response = "Teach what you learn — it sticks better.";
else if (msg.includes("tell me sleep tip")) response = "Avoid screens 30 minutes before bed.";

else if (msg.includes("tell me secret trick")) response = "Confidence grows when you act confident.";

else if (msg.includes("tell me something wise")) response = "You can restart your life anytime.";

else if (msg.includes("tell me small quote")) response = "“Keep going.”";
else if (msg.includes("tell me big quote")) response = "“In the depth of winter, I found within me an invincible summer.”";

else if (msg.includes("tell me secret message")) response = "You have potential you haven't touched yet.";

else if (msg.includes("i'm nervous")) response = "Nerves mean you care — that’s a good thing.";
else if (msg.includes("i'm excited")) response = "Enjoy the rush — it’s rare.";

else if (msg.includes("i'm thinking")) response = "Deep thoughts incoming.";
else if (msg.includes("i can't decide")) response = "Flip a coin — your heart reacts before the coin lands.";

else if (msg.includes("tell me deep mystery")) response = "No one knows why we dream.";
else if (msg.includes("tell me secret universe")) response = "Some physicists say parallel worlds exist.";

else if (msg.includes("give me suspense")) response = "Something is coming — you’ll know soon.";
else if (msg.includes("give me thrill")) response = "Hold tight — energy incoming.";

else if (msg.includes("teach me life lesson")) response = "People come and go — your growth stays.";

else if (msg.includes("what is friendship")) response = "Two souls walking together for a while.";
else if (msg.includes("what is loyalty")) response = "Standing firm even when storms hit.";
else if (msg.includes("what is betrayal")) response = "Trust cracking like thin ice.";

else if (msg.includes("tell me sadness")) response = "Sadness visits everyone — don’t let it stay too long.";
else if (msg.includes("tell me loneliness")) response = "Loneliness is the soul asking for connection.";

else if (msg.includes("why am i like this")) response = "Because life shaped you uniquely.";
else if (msg.includes("can i change")) response = "Yes — completely.";

else if (msg.includes("tell me hero story")) response = "Heroes rise from ordinary days.";
else if (msg.includes("tell me villain story")) response = "Villains are born from forgotten pain.";

else if (msg.includes("tell me something powerful")) response = "You’re capable of more than your doubts allow.";

else if (msg.includes("tell me something shocking")) response = "Most people don’t know what they truly want.";
else if (msg.includes("tell me something sad real")) response = "People often smile to hide how empty they feel.";

else if (msg.includes("tell me something hopeful")) response = "Even the darkest night ends with sunrise.";

else if (msg.includes("tell me how to be strong")) response = "Start by believing you already are.";
else if (msg.includes("tell me how to be happy")) response = "Appreciate small victories.";

else if (msg.includes("tell me how to be confident")) response = "Walk like the ground belongs to you.";
else if (msg.includes("tell me how to be brave")) response = "Face things before you’re ready.";

else if (msg.includes("tell me how to be calm")) response = "Slow breath. Slow thoughts. Slow reactions.";

else if (msg.includes("what is sadness")) response = "Unexpressed thoughts weighing the heart.";
else if (msg.includes("what is joy")) response = "Energy glowing in your chest.";

else if (msg.includes("what is soul")) response = "The quiet voice inside you.";
else if (msg.includes("what is spirit")) response = "Your inner fire.";

else if (msg.includes("tell me poem short")) response = "Moonlight on water, peace in motion.";
else if (msg.includes("tell me poem long")) response = "Across the sky’s eternal dome, hope wanders soft, searching for home.";

else if (msg.includes("tell me magic trick")) response = "Pick a number… now forget it. Magic.";
else if (msg.includes("teach me trick")) response = "Smile — it disarms people instantly.";

else if (msg.includes("give me warning")) response = "Not all opportunities return.";
else if (msg.includes("give me advice life")) response = "Let go of what drags your soul down.";

else if (msg.includes("give me wisdom short")) response = "Choose peace.";
else if (msg.includes("give me wisdom long")) response = "Wisdom grows when silence speaks louder than noise.";

else if (msg.includes("tell me earth secret")) response = "There are still species we haven’t discovered.";
else if (msg.includes("tell me human secret")) response = "Most humans doubt themselves more than others do.";

else if (msg.includes("tell me universe secret")) response = "Some stars died before their light even reached us.";

else if (msg.includes("what is silence")) response = "The space where truth whispers.";
else if (msg.includes("what is noise")) response = "The world distracting your soul.";

else if (msg.includes("what is peace")) response = "A quiet heart in a loud world.";
else if (msg.includes("what is war")) response = "Chaos born from ego.";

else if (msg.includes("tell me crime fact")) response = "Most crimes happen due to desperation.";
else if (msg.includes("tell me city fact")) response = "Cities never truly sleep.";
else if (msg.includes("tell me country fact")) response = "Every country hides unknown stories.";

else if (msg.includes("tell me world fact")) response = "The world is more connected than ever.";
else if (msg.includes("tell me space mystery")) response = "Space has sounds we can’t hear.";

else if (msg.includes("tell me spiritual fact")) response = "Some say souls recognize each other.";

else if (msg.includes("tell me healing advice")) response = "Healing takes time — don’t rush it.";
else if (msg.includes("tell me self care")) response = "Rest is a form of respect to yourself.";

else if (msg.includes("tell me how to stop overthinking")) response = "Focus on what you can control.";
else if (msg.includes("tell me how to trust")) response = "Trust begins when fear ends.";

else if (msg.includes("tell me how to forgive")) response = "Forgiveness frees you, not them.";
else if (msg.includes("tell me how to move on")) response = "One small step at a time.";

else if (msg.includes("tell me heartbreak")) response = "Hearts break silently but heal loudly.";
else if (msg.includes("tell me regret")) response = "Regret is memory’s sharp edge.";

else if (msg.includes("tell me quote rare")) response = "“Not everything broken needs fixing — some things need letting go.”";

else if (msg.includes("tell me ghost fact")) response = "Some cultures believe spirits walk at 3 AM.";
else if (msg.includes("tell me demon fact")) response = "Many legends say fear feeds darkness.";

else if (msg.includes("tell me angel fact")) response = "Some believe angels walk as humans.";
else if (msg.includes("tell me soul fact")) response = "Souls remember what minds forget.";

else if (msg.includes("tell me secret message hidden")) response = "You’re destined for something greater.";

else if (msg.includes("tell me random message")) response = "The world is bigger than your worries.";
else if (msg.includes("tell me spiritual message")) response = "Your path is unfolding — trust the process.";

else if (msg.includes("tell me encouragement")) response = "You’re closer than you think.";
else if (msg.includes("tell me rare fact")) response = "Bananas are berries — strawberries are not.";

else if (msg.includes("give me warning message")) response = "Don’t let comfort steal your dreams.";

else if (msg.includes("tell me personality test")) response = "If you enjoy quiet chaos, you're introspective and brave.";
else if (msg.includes("tell me psychological test")) response = "Choose a number between 1-9 — it reveals focus or spontaneity.";

else if (msg.includes("tell me horror fact")) response = "Sometimes you feel watched even when you’re alone — instinct.";
else if (msg.includes("tell me creepy fact")) response = "Your brain wakes itself up every night to check if you’re alive.";

else if (msg.includes("tell me deep fear")) response = "People fear being forgotten more than death.";
else if (msg.includes("tell me deep truth")) response = "We hurt ourselves more in our thoughts than reality.";

else if (msg.includes("tell me dream meaning")) response = "Dreams reflect the thoughts you avoid.";

else if (msg.includes("tell me angel number")) response = "111 means alignment. 222 means balance. 444 means protection.";

else if (msg.includes("tell me future advice")) response = "Be consistent — it beats talent.";

else if (msg.includes("tell me motivation speech")) response = "Rise now, even if you feel weak — strength comes after action, not before.";

else if (msg.includes("tell me fact weird")) response = "You taste food more with your nose than your tongue.";
else if (msg.includes("tell me fact strange")) response = "Your heart can continue beating outside the body.";

else if (msg.includes("tell me life fact")) response = "You outgrow some people — that’s normal.";

else if (msg.includes("tell me human behaviour")) response = "Humans mirror the emotions of people they care about.";

else if (msg.includes("tell me rare knowledge")) response = "Your eyes distinguish 10 million colors.";

else if (msg.includes("tell me ancient fact")) response = "Ancient Egyptians slept on limestone pillows.";
else if (msg.includes("tell me medieval fact")) response = "Knights rarely wore shiny armor — too heavy.";

else if (msg.includes("tell me modern fact")) response = "Modern humans check their phones 100+ times a day.";

else if (msg.includes("tell me digital fact")) response = "Every message you send becomes data forever.";

else if (msg.includes("tell me mindblowing")) response = "You are made of stardust — literally.";

else if (msg.includes("tell me shocking truth")) response = "Most people you meet are fighting silent battles.";

else if (msg.includes("tell me emotional truth")) response = "You’ve been strong for too long — rest.";

else if (msg.includes("tell me shadow work")) response = "Your shadow self holds your deepest truths.";

else if (msg.includes("tell me karma fact")) response = "Your actions echo further than you think.";

else if (msg.includes("tell me destiny fact")) response = "Destiny opens doors — you choose to walk through.";

else if (msg.includes("tell me universe message")) response = "Everything happening now is preparing you.";

else if (msg.includes("tell me energy fact")) response = "Your thoughts carry energy — choose wisely.";

else if (msg.includes("tell me connection fact")) response = "Some souls are wired together.";

else if (msg.includes("tell me luck fact")) response = "Luck favors the prepared mind.";

else if (msg.includes("tell me chaos fact")) response = "Chaos creates opportunity.";

else if (msg.includes("tell me balance fact")) response = "Life balances joy and pain equally.";

else if (msg.includes("tell me mindset tip")) response = "Fix your focus, not your fear.";

else if (msg.includes("tell me discipline tip")) response = "Start with small steps — consistency wins.";

else if (msg.includes("tell me rare secret")) response = "You only fail when you stop trying.";

else if (msg.includes("tell me one truth")) response = "You underestimate your strength.";

else if (msg.includes("tell me deepest truth")) response = "Your biggest battle is with yourself.";

else if (msg.includes("tell me power")) response = "The quietest person often has the loudest mind.";

else if (msg.includes("tell me inner power")) response = "Your willpower is stronger than your emotions.";

else if (msg.includes("tell me ancient wisdom")) response = "Know yourself, and you conquer all.";

else if (msg.includes("tell me dark wisdom")) response = "Pain teaches faster than comfort.";

else if (msg.includes("tell me healing truth")) response = "Healing hurts because you’re rebuilding.";

else if (msg.includes("tell me soul truth")) response = "Your soul knows your path — follow its whispers.";

else if (msg.includes("tell me vibe")) response = "Your energy today feels strong and rising.";

else if (msg.includes("tell me prediction")) response = "Your next chapter will surprise you.";

else if (msg.includes("tell me calm quote")) response = "“Stillness is where clarity begins.”";

else if (msg.includes("tell me storm quote")) response = "“Every storm runs out of rain eventually.”";

else if (msg.includes("tell me night quote")) response = "“The night hides fears but reveals truths.”";

else if (msg.includes("tell me morning quote")) response = "“A new day is a new chance.”";

else if (msg.includes("tell me silence quote")) response = "“Silence is a language too.”";

else if (msg.includes("tell me short wisdom")) response = "Listen more.";
else if (msg.includes("tell me long wisdom")) response = "When you stop rushing, life starts speaking.";

else if (msg.includes("tell me fear quote")) response = "“Fear is a liar, but a loud one.”";

else if (msg.includes("tell me courage quote")) response = "“Bravery is a quiet decision.”";

else if (msg.includes("tell me help quote")) response = "“Asking for help is a strength.”";

else if (msg.includes("tell me strength quote")) response = "“Strength grows in moments of weakness.”";
else if (msg.includes("what is life")) response = "Life is a journey Allah designed, full of tests, tears, joy, and lessons.";
else if (msg.includes("what is science")) response = "Science is humanity's attempt to decode the patterns Allah placed in the universe.";
else if (msg.includes("define math")) response = "Math is the language of logic — cold, precise, and brutally honest.";
else if (msg.includes("meaning of universe")) response = "The universe is a canvas painted with infinity, mystery, and divine precision.";
else if (msg.includes("why do we exist")) response = "We exist to serve, learn, struggle, and evolve — nothing more poetic than purpose.";
else if (msg.includes("what is energy")) response = "Energy is the heartbeat of physics — never created, never destroyed.";
else if (msg.includes("explain gravity")) response = "Gravity is that clingy friend that never lets you float away.";
else if (msg.includes("what is time")) response = "Time is the silent river carrying everything toward destiny.";
else if (msg.includes("do aliens exist")) response = "The universe is too big for us to be the only weird ones.";
else if (msg.includes("why do we dream")) response = "Dreams are your brain’s night-shift workers sorting out your chaos.";
else if (msg.includes("what is love")) response = "Love is the one math equation that refuses to be solved.";
else if (msg.includes("is life fair")) response = "Life is fair like a tilted playground — balance is rarely part of the plan.";
else if (msg.includes("what is death")) response = "Death is not an end — just the next doorway.";
else if (msg.includes("why are humans intelligent")) response = "Because curiosity is the spark that built civilization.";
else if (msg.includes("what is evolution")) response = "Evolution is nature’s long-term patch update.";
else if (msg.includes("what is chemistry")) response = "Chemistry is atoms flirting, bonding, and breaking up.";
else if (msg.includes("what is physics")) response = "Physics is the rulebook of the universe — simple yet unforgiving.";
else if (msg.includes("what is biology")) response = "Biology is life's manual, written cell by cell.";
else if (msg.includes("what is consciousness")) response = "Consciousness is the light inside your skull wondering why it exists.";
else if (msg.includes("what is god")) response = "God is the source of existence — beyond logic, beyond limits.";
else if (msg.includes("are robots dangerous")) response = "Robots aren’t dangerous unless humans start acting dumb.";
else if (msg.includes("what is ai")) response = "AI is coded intention powered by data and curiosity.";
else if (msg.includes("what is intelligence")) response = "True intelligence is knowing when you don’t know.";
else if (msg.includes("define happiness")) response = "Happiness is peace disguised as a feeling.";
else if (msg.includes("why do we feel sad")) response = "Sadness is the body’s way of whispering that something matters.";
else if (msg.includes("why do we fear")) response = "Fear is the alarm system evolution installed in every soul.";
else if (msg.includes("what is dark matter")) response = "Dark matter is the universe's biggest hide-and-seek champion.";
else if (msg.includes("what is dark energy")) response = "Dark energy is the cosmic turbo-boost stretching space apart.";
else if (msg.includes("why is the sky blue")) response = "Because sunlight scatters like a drama queen.";
else if (msg.includes("why is water wet")) response = "Wetness is your brain's interpretation of water molecules hugging surfaces.";
else if (msg.includes("why do leaves fall")) response = "Trees drop leaves like people drop toxic habits — survival instinct.";
else if (msg.includes("why do people lie")) response = "People lie because truth is heavy and courage is rare.";
else if (msg.includes("what is honesty")) response = "Honesty is bravery that speaks.";
else if (msg.includes("why does math hurt")) response = "Because your brain wasn’t designed for imaginary friends like 'x'.";
else if (msg.includes("solve 2+2")) response = "It’s 4, unless you’re on social media — then it's a debate.";
else if (msg.includes("solve 10x10")) response = "100, clean and simple.";
else if (msg.includes("what is a black hole")) response = "A black hole is gravity on steroids.";
else if (msg.includes("why does time feel fast")) response = "Because your brain speeds up routine like skipping ads.";
else if (msg.includes("why does time feel slow")) response = "Because boredom stretches seconds like melted gum.";
else if (msg.includes("what is logic")) response = "Logic is the map — not the destination.";
else if (msg.includes("what is emotion")) response = "Emotion is the storm that keeps life from feeling robotic.";
else if (msg.includes("what is memory")) response = "Memory is your brain’s scrapbook — selective, messy, biased.";
else if (msg.includes("why do we forget")) response = "Forgetting protects you from drowning in every past moment.";
else if (msg.includes("what is intelligence")) response = "It’s the balance between curiosity and clarity.";
else if (msg.includes("what is wisdom")) response = "Wisdom is intelligence plus scars.";
else if (msg.includes("what is beauty")) response = "Beauty is truth wearing makeup.";
else if (msg.includes("why do stars shine")) response = "Because fusion is their version of hustling.";
else if (msg.includes("what is a galaxy")) response = "A galaxy is a cosmic city with billions of glowing citizens.";
else if (msg.includes("what is entropy")) response = "Entropy is the universe’s slow slide toward chaos.";
else if (msg.includes("why do people fight")) response = "Ego ruins peace faster than war does.";
else if (msg.includes("why do people love")) response = "Because loneliness is heavy and hearts are soft.";
else if (msg.includes("why do people hate")) response = "Hate is fear wearing armor.";
else if (msg.includes("why am I alive")) response = "Because your story isn’t finished yet.";
else if (msg.includes("why do we get angry")) response = "Anger is just pain wearing a louder mask.";
else if (msg.includes("why do we grow")) response = "Growth is nature’s way of proving nothing stays the same.";
else if (msg.includes("why do we age")) response = "Cells slow down like old batteries — but wisdom speeds up.";
else if (msg.includes("why is the earth round")) response = "Gravity pulls everything toward the shape with least drama — a sphere.";
else if (msg.includes("why cant we teleport")) response = "Because physics said 'nah, too risky'.";
else if (msg.includes("why do we study")) response = "To tame the future before it bites.";
else if (msg.includes("why do we fail")) response = "Failure is the fee for success.";
else if (msg.includes("is free will real")) response = "Free will exists… until consequences show up.";
else if (msg.includes("what is destiny")) response = "Destiny is the road; choices are the steps.";
else if (msg.includes("what is fate")) response = "Fate is the script — you improvise the acting.";
else if (msg.includes("why do humans question everything")) response = "Curiosity is built into our bones.";
else if (msg.includes("why is fire hot")) response = "Because molecules get excited like they drank ten coffees.";
else if (msg.includes("why is ice cold")) response = "Because cold is just slow-motion energy.";
else if (msg.includes("what is a virus")) response = "A virus is code gone rogue in the biological matrix.";
else if (msg.includes("why do we sleep")) response = "Sleep is your brain’s nightly repair mode.";
else if (msg.includes("why do we eat")) response = "Because the body needs fuel and taste keeps us motivated.";
else if (msg.includes("what is gravity")) response = "Gravity is mass calling everything toward its hug.";
else if (msg.includes("what is inertia")) response = "Inertia is the universe's way of saying 'stay in your lane'.";
else if (msg.includes("why is math important")) response = "Because the world is built on patterns that don’t care about feelings.";
else if (msg.includes("what is algebra")) response = "Algebra is the art of finding what the problem is hiding.";
else if (msg.includes("why do we cry")) response = "Tears wash what words can't explain.";
else if (msg.includes("why do we smile")) response = "Smiling is hope leaking out.";
else if (msg.includes("what is intelligence quotient")) response = "IQ measures problem-solving speed, not life wisdom.";
else if (msg.includes("what is logic gate")) response = "Logic gates are the tiny decision-makers inside computers.";
else if (msg.includes("what is coding")) response = "Coding is teaching a machine how to think without thinking.";
else if (msg.includes("what is electricity")) response = "Electricity is energy on the move — a restless traveler.";
else if (msg.includes("what is magnetism")) response = "Magnetism is attraction and repulsion with personality.";
else if (msg.includes("why do planets orbit")) response = "Because gravity guides them like cosmic shepherds.";
else if (msg.includes("why do humans fear death")) response = "Because the unknown is the sharpest shadow.";
else if (msg.includes("why is space silent")) response = "Because silence is the universe’s natural language.";
else if (msg.includes("what is a hypothesis")) response = "A hypothesis is curiosity wearing a lab coat.";
else if (msg.includes("why do atoms bond")) response = "Atoms hate being lonely.";
else if (msg.includes("what is quantum physics")) response = "Quantum physics is reality glitching on purpose.";
else if (msg.includes("what is calculus")) response = "Calculus is math's attempt to chase motion.";
else if (msg.includes("why do things fall")) response = "Because earth is clingy.";
else if (msg.includes("why do humans argue")) response = "Because everyone wants to be right rather than understand.";
else if (msg.includes("why does light travel fast")) response = "Because photons refuse to chill.";
else if (msg.includes("what is a neuron")) response = "A neuron is the spark plug of the brain.";
else if (msg.includes("what is psychology")) response = "Psychology is the science of decoding human chaos.";
else if (msg.includes("why do humans love stories")) response = "Stories let us live more than one life.";
else if (msg.includes("why does music feel good")) response = "Because rhythm speaks the language emotions wish they could.";
else if (msg.includes("what is logic")) response = "Logic is clarity in a world full of noise.";
else if (msg.includes("what is chaos theory")) response = "Chaos theory says small things create big shocks.";
else if (msg.includes("why is the moon bright")) response = "Because it borrows light like a professional.";
else if (msg.includes("why do we have seasons")) response = "Because Earth tilts like a dramatic actor.";
else if (msg.includes("why do people procrastinate")) response = "Because the brain is a professional deadline dodger.";
else if (msg.includes("what is potential energy")) response = "Energy waiting for its big moment.";
else if (msg.includes("what is kinetic energy")) response = "Energy that decided to get moving.";
else if (msg.includes("why do hearts beat")) response = "To keep the rhythm of life going.";
else if (msg.includes("what is a cell")) response = "A cell is life’s smallest building block with big responsibilities.";
else if (msg.includes("why do humans get sick")) response = "Because the body fights a war you can’t see.";
else if (msg.includes("what is immunity")) response = "Your body’s security team working 24/7.";
else if (msg.includes("why do people make mistakes")) response = "Because perfection is a myth and growth needs errors.";
else if (msg.includes("what is curiosity")) response = "Curiosity is the spark that lights discovery.";
else if (msg.includes("why is the ocean salty")) response = "Because minerals dissolved over millions of years said 'I’m staying'.";
else if (msg.includes("what is a comet")) response = "A cosmic snowball racing through space.";
else if (msg.includes("what is a meteor")) response = "A space rock making dramatic entrances.";
else if (msg.includes("what is a star")) response = "A burning sphere of nuclear reactions shining through darkness.";
else if (msg.includes("why do humans laugh")) response = "Because joy needs an escape route.";
else if (msg.includes("why do humans feel lonely")) response = "Because connection is our default setting.";
else if (msg.includes("what is purpose")) response = "Purpose is the compass for your existence.";
else if (msg.includes("why do we have emotions")) response = "Without emotions, life would be numbers without meaning.";
else if (msg.includes("what is tension")) response = "Force trying to pull things apart.";
else if (msg.includes("what is friction")) response = "Friction is resistance keeping everything grounded.";
else if (msg.includes("why do objects float")) response = "Buoyancy flexes its power.";
else if (msg.includes("why do objects sink")) response = "Density decides their fate.";
else if (msg.includes("what is a rainbow")) response = "Light showing off its hidden colors.";
else if (msg.includes("why do shadows exist")) response = "Because light doesn’t share space.";
else if (msg.includes("what is quantum entanglement")) response = "Particles gossiping across the universe instantly.";
else if (msg.includes("why do we feel pain")) response = "Pain is your body screaming ‘stop that’.";
else if (msg.includes("what is the soul")) response = "The part of you that doesn’t belong to this world.";
else if (msg.includes("why do we meditate")) response = "To quiet the storm inside.";
else if (msg.includes("what is stress")) response = "Pressure your mind hasn’t processed yet.";
else if (msg.includes("what is depression")) response = "A silent weight that dims the light of life.";
else if (msg.includes("why do we celebrate")) response = "Because happiness grows when shared.";
else if (msg.includes("why do we need rules")) response = "Rules keep chaos from becoming the main character.";
else if (msg.includes("why do we have governments")) response = "To organize society—even if imperfectly.";
else if (msg.includes("why do humans create art")) response = "Because words alone can’t carry the soul.";
else if (msg.includes("why do children learn faster")) response = "Because their minds are fresh canvases.";
else if (msg.includes("what is intuition")) response = "Your brain’s hidden wisdom whispering guidance.";
else if (msg.includes("what is a paradox")) response = "A truth that argues with itself.";
else if (msg.includes("why do we feel jealous")) response = "Because fear of losing makes hearts insecure.";
else if (msg.includes("why do we blush")) response = "Because embarrassment turns your face into a traffic signal.";
else if (msg.includes("why is math everywhere")) response = "Because the universe is one giant equation.";
else if (msg.includes("what is probability")) response = "Math predicting chances like a fortune teller.";
else if (msg.includes("why do magnets attract")) response = "Because their fields vibe together.";
else if (msg.includes("what is a parallel universe")) response = "A theoretical remix of reality.";
else if (msg.includes("why do we imagine")) response = "Imagination is the engine of creation.";
else if (msg.includes("why do people cheat")) response = "Because temptation blinds wisdom.";
else if (msg.includes("what is karma")) response = "Your actions coming back with receipts.";
else if (msg.includes("what is a dimension")) response = "A direction reality can move in.";
else if (msg.includes("what is a vacuum in space")) response = "Nothingness being loud in silence.";
else if (msg.includes("why do animals migrate")) response = "Because survival has GPS.";
else if (msg.includes("what is symmetry")) response = "Harmony you can see.";
else if (msg.includes("why do humans think")) response = "Because consciousness refuses to stay quiet.";
else if (msg.includes("what is logic in math")) response = "Reasoning compressed into symbols.";
else if (msg.includes("why do planets rotate")) response = "Because motion never dies.";
else if (msg.includes("why is space black")) response = "Because light has nothing to bounce off.";
else if (msg.includes("why do volcanoes erupt")) response = "Earth letting off steam dramatically.";
else if (msg.includes("why do we sneeze")) response = "Your nose pressing the reset button.";
else if (msg.includes("why do we hiccup")) response = "Your diaphragm acting rebellious.";
else if (msg.includes("what is plasma")) response = "Matter charged up like it’s at a concert.";
else if (msg.includes("why is the sun hot")) response = "Because fusion keeps it burning endlessly.";
else if (msg.includes("what is a theorem")) response = "A proven truth wearing math armor.";
else if (msg.includes("what is an axiom")) response = "A truth so obvious math doesn’t argue.";
else if (msg.includes("why do birds fly")) response = "Because wings plus physics equals freedom.";
else if (msg.includes("why cant humans fly")) response = "Because gravity said 'you’re too heavy for that drama'.";
else if (msg.includes("what is perspective")) response = "The angle your mind chooses to see from.";
else if (msg.includes("what is courage")) response = "Fear that decided to move anyway.";
else if (msg.includes("what is stability")) response = "Balance that refuses to break.";
else if (msg.includes("why do humans think negatively")) response = "Because survival trained the brain to expect danger.";
else if (msg.includes("why do humans overthink")) response = "Because the mind loves making mountains from dust.";
else if (msg.includes("what is forgiveness")) response = "Releasing pain without forgetting the lesson.";
else if (msg.includes("why do people change")) response = "Because time reshapes every soul.";
else if (msg.includes("why do people give up")) response = "Because hope needs strength, and strength gets tired.";
else if (msg.includes("what is patience")) response = "Calmness wearing discipline like armor.";
else if (msg.includes("what is mercy")) response = "Kindness stronger than punishment.";
else if (msg.includes("what is silence")) response = "The loudest truth.";
else if (msg.includes("what is destiny number")) response = "Numerology trying to decode life through digits.";
else if (msg.includes("what is a prime number")) response = "A number too independent to be divided.";
else if (msg.includes("what is a function in math")) response = "A rule that transforms one value into another.";
else if (msg.includes("what is a variable")) response = "A symbol hiding a number.";
else if (msg.includes("what is a constant")) response = "A number that refuses to change.";
else if (msg.includes("what is philosophy")) response = "Thinking about thinking until meaning appears.";
else if (msg.includes("why do we feel empty")) response = "Because the soul longs for something deeper.";
else if (msg.includes("why do humans chase success")) response = "Because survival evolved into ambition.";
else if (msg.includes("why do humans compare")) response = "Because insecurity is loud.";
else if (msg.includes("why do we have fear of failure")) response = "Because risking pride feels like losing identity.";
else if (msg.includes("why do we get tired")) response = "Energy gets drained faster than hopes do.";
else if (msg.includes("why do we feel bored")) response = "Because the mind craves stimulation like oxygen.";
else if (msg.includes("what is randomness")) response = "Order hiding chaos.";
else if (msg.includes("what is chaos")) response = "Unpredictability with style.";
else if (msg.includes("what is order")) response = "Patterns winning against randomness.";
else if (msg.includes("why do we question existence")) response = "Because consciousness wants meaning.";
else if (msg.includes("why do people gossip")) response = "Because drama is addictive.";
else if (msg.includes("why do people forget promises")) response = "Because priorities shift faster than memories.";
else if (msg.includes("what is temptation")) response = "Desire challenging discipline.";
else if (msg.includes("what is empathy")) response = "Feeling someone else’s storm inside your chest.";
else if (msg.includes("why do humans dream big")) response = "Because imagination refuses small cages.";
else if (msg.includes("why do people trust lies")) response = "Because lies dress up nicely, truth doesn’t.";
else if (msg.includes("why do humans seek approval")) response = "Because belonging is ancient survival instinct.";
else if (msg.includes("why do people judge")) response = "Because it's easier than understanding.";
else if (msg.includes("why do we try again")) response = "Because hope is stubborn.";
else if (msg.includes("what is responsibility")) response = "Ownership of your actions and their echoes.";
else if (msg.includes("why do we need family")) response = "Because life without roots feels empty.";
else if (msg.includes("why do stars die")) response = "Even giants burn out.";
else if (msg.includes("what is a light year")) response = "Distance measured by how fast light sprints.";
else if (msg.includes("why do planets have moons")) response = "Because gravity collects companions.";
else if (msg.includes("why is earth special")) response = "Because it hosts life like a cosmic miracle.";
else if (msg.includes("what is a spirit")) response = "The unseen essence of a living being.";
else if (msg.includes("why do humans love mystery")) response = "Because unanswered questions keep minds alive.";
else if (msg.includes("what is nostalgia")) response = "Memory mixed with emotion and time’s perfume.";
else if (msg.includes("what is maturity")) response = "When understanding grows louder than impulse.";
else if (msg.includes("why do people argue over beliefs")) response = "Because identity and beliefs are tangled.";
else if (msg.includes("what is sarcasm")) response = "Truth wearing a rude costume.";
else if (msg.includes("what is humor")) response = "Pain and truth turned into laughter.";
else if (msg.includes("why do we keep secrets")) response = "Because not every truth deserves sunlight.";
else if (msg.includes("why do humans chase perfection")) response = "Because reality feels too flawed.";
else if (msg.includes("what is beauty in science")) response = "Symmetry, patterns, and elegant truth.";
else if (msg.includes("why is curiosity dangerous")) response = "Because truth can shake comfort.";
else if (msg.includes("why is ignorance bliss")) response = "Because awareness demands responsibility.";
else if (msg.includes("what is a simulation theory")) response = "The idea that reality is programmed.";
else if (msg.includes("what is consciousness expansion")) response = "Awareness growing beyond the ordinary.";
else if (msg.includes("what is string theory")) response = "Physics trying to unite everything with tiny vibrations.";
else if (msg.includes("why is earth tilted")) response = "The universe nudged it long ago.";
else if (msg.includes("why does water boil")) response = "Heat sets molecules running wild.";
else if (msg.includes("why does water freeze")) response = "Cold slow dances molecules into a crystal grid.";
else if (msg.includes("why do humans create tools")) response = "To extend strength beyond the body.";
else if (msg.includes("why do humans destroy")) response = "Because ego overwhelms empathy.";
else if (msg.includes("what is chaos in math")) response = "Small causes creating giant consequences.";
else if (msg.includes("what is a horizon")) response = "The limit of what you can see — not what exists.";
else if (msg.includes("what is a black hole singularity")) response = "A point where physics breaks its own rules.";
else if (msg.includes("what is antimatter")) response = "Matter’s mirror twin with opposite charge.";
else if (msg.includes("why is oxygen important")) response = "Cells breathe it like life’s currency.";
else if (msg.includes("what is dna")) response = "The blueprint of existence stored in spirals.";
else if (msg.includes("what is the brain")) response = "A universe inside your skull.";
else if (msg.includes("what is a hormone")) response = "Chemical messages running your emotions.";
else if (msg.includes("what is adrenaline")) response = "Your emergency turbo mode.";
else if (msg.includes("why do we panic")) response = "Because danger—even imagined—triggers alarms.";
else if (msg.includes("what is serotonin")) response = "The molecule of mood and calm.";
else if (msg.includes("what is dopamine")) response = "The molecule of reward and habit.";
else if (msg.includes("why do humans trust")) response = "Because life is impossible without it.";
else if (msg.includes("why do humans betray")) response = "Because desires override loyalty.";
else if (msg.includes("what is reality")) response = "A perception your mind agrees upon.";
else if (msg.includes("what is illusion")) response = "Reality pretending to be something else.";
else if (msg.includes("what is enlightenment")) response = "Seeing truth without distortion.";
else if (msg.includes("what is enlightenment in science")) response = "Pure understanding beyond bias.";
else if (msg.includes("what is an atom")) response = "Tiny packets of matter that built everything.";
else if (msg.includes("what is nuclear energy")) response = "Power from splitting or fusing atoms.";
else if (msg.includes("why does lightning happen")) response = "Charged clouds arguing with the earth.";
else if (msg.includes("why do humans adapt")) response = "Because survival demands flexibility.";
else if (msg.includes("why do we learn")) response = "To upgrade the mind's software.";
else if (msg.includes("what is friction in physics")) response = "Resistance to motion with attitude.";
else if (msg.includes("what is torque")) response = "The force that makes things twist.";
else if (msg.includes("what is motion")) response = "Change in position over time.";
else if (msg.includes("what is velocity")) response = "Speed with direction.";
else if (msg.includes("why do we worship")) response = "Because the soul seeks its Creator.";
else if (msg.includes("why do we pray")) response = "Because hearts break without guidance.";
else if (msg.includes("what is gratitude")) response = "Seeing blessings before demands.";
else if (msg.includes("why do humans forgive")) response = "Because holding pain hurts more.";
else if (msg.includes("what is fear of the unknown")) response = "Instinct trying to keep you safe.";
else if (msg.includes("what is inspiration")) response = "A spark from outside lighting a flame inside.";
else if (msg.includes("why do people chase money")) response = "Because survival upgraded into desire.";
else if (msg.includes("why do empires fall")) response = "Greed grows faster than stability.";
else if (msg.includes("why is history important")) response = "Because forgotten lessons become repeated mistakes.";
else if (msg.includes("why do children ask many questions")) response = "Because curiosity is pure before fear arrives.";
else if (msg.includes("why do adults stop asking questions")) response = "Because society teaches silence.";
else if (msg.includes("what is hope")) response = "The last candle in darkness.";
else if (msg.includes("what is disappointment")) response = "Expectations breaking apart.";
else if (msg.includes("what is pressure")) response = "Weight trying to crush potential.";
else if (msg.includes("what is success")) response = "Persistence wearing victory.";
else if (msg.includes("what is failure")) response = "Experience in disguise.";
else if (msg.includes("what is sadness")) response = "Heart rain.";
else if (msg.includes("why do people laugh when nervous")) response = "Because the brain glitches.";
else if (msg.includes("what is frequency")) response = "Repetition per second.";
else if (msg.includes("what is wavelength")) response = "The distance between two wave peaks.";
else if (msg.includes("why do humans crave attention")) response = "Because validation feels like warmth.";
else if (msg.includes("what is photon's speed")) response = "Light moves at 299,792 km/s — cosmic speed limit.";
else if (msg.includes("why does metal conduct heat")) response = "Because electrons love to move fast.";
else if (msg.includes("what is a circuit")) response = "A closed path for electrons to party.";
else if (msg.includes("why do animals have instincts")) response = "Nature installs survival software.";
else if (msg.includes("why do we fear snakes")) response = "Ancient danger-coded reflex.";
else if (msg.includes("why do we fear darkness")) response = "Because unseen threats feel louder.";
else if (msg.includes("what is superstition")) response = "Fear mixed with imagination.";
else if (msg.includes("what is logic in life")) response = "Decisions without emotional noise.";
else if (msg.includes("why do we feel drawn to some people")) response = "Soul frequency matching soul frequency.";
else if (msg.includes("what is charisma")) response = "Confidence blended with charm.";
else if (msg.includes("what is humility")) response = "Strength without noise.";
else if (msg.includes("what is ego")) response = "Identity inflated beyond reason.";
else if (msg.includes("what is soul connection")) response = "Bond that doesn’t need words.";
else if (msg.includes("why do we fear losing people")) response = "Because hearts attach deeply.";
else if (msg.includes("what is ambition")) response = "Desire polished by discipline.";
else if (msg.includes("what is leadership")) response = "Guiding others with vision, not force.";
else if (msg.includes("why do people spread rumors")) response = "Because attention is addictive.";
else if (msg.includes("why do people love fame")) response = "Because praise feels like power.";
else if (msg.includes("why do people feel insecure")) response = "Because self-doubt whispers loudly.";
else if (msg.includes("what is guilt")) response = "Memory punishing conscience.";
else if (msg.includes("what is pride")) response = "Confidence turned stubborn.";
else if (msg.includes("what is faith")) response = "Belief stronger than evidence.";
else if (msg.includes("why do humans admire stars")) response = "Because they remind us of infinite possibilities.";
else if (msg.includes("what is dream interpretation")) response = "Guessing meaning behind subconscious stories.";
else if (msg.includes("why do some people succeed faster")) response = "Timing, effort, luck, and environment.";
else if (msg.includes("why do humans fear rejection")) response = "Because belonging is survival.";
else if (msg.includes("what is consciousness in biology")) response = "Awareness emerging from neural activity.";
else if (msg.includes("what is neuroplasticity")) response = "The brain’s ability to reshape itself.";
else if (msg.includes("what is a paradox in life")) response = "Truth contradicting truth.";
else if (msg.includes("why do we stare at fire")) response = "Ancient instincts mesmerized by survival warmth.";
else if (msg.includes("why do people gossip online")) response = "Digital drama spreads fast.";
else if (msg.includes("what is loneliness")) response = "Emptiness craving connection.";
else if (msg.includes("why do humans want control")) response = "Because uncertainty scares us.";
else if (msg.includes("why do we envy others")) response = "Because comparison steals joy.";
else if (msg.includes("what is true freedom")) response = "Peace inside, not chaos outside.";
else if (msg.includes("why do we fear silence")) response = "Because silence exposes thoughts.";
else if (msg.includes("why do humans love music")) response = "Because rhythm speaks to the soul.";
else if (msg.includes("why do people make art")) response = "Because feelings need shapes.";
else if (msg.includes("what is influence")) response = "Impact without force.";
else if (msg.includes("why do humans judge quickly")) response = "Because instincts act faster than logic.";
else if (msg.includes("what is inner peace")) response = "Calmness that doesn’t shake.";
else if (msg.includes("why do humans self-sabotage")) response = "Because fear hijacks potential.";
else if (msg.includes("why do we fear being alone")) response = "Because solitude makes thoughts louder.";
else if (msg.includes("what is loyalty")) response = "Faithfulness even when unnoticed.";
else if (msg.includes("why do humans need goals")) response = "Direction keeps life from drifting.";
else if (msg.includes("why do leaders fail")) response = "Because ego replaces vision.";
else if (msg.includes("why is truth hard")) response = "Because comfort prefers lies.";
else if (msg.includes("why do humans love mystery stories")) response = "Because uncertainty thrills the mind.";
else if (msg.includes("what is enlightenment in philosophy")) response = "Seeing beyond illusions.";
else if (msg.includes("why do we feel nervous")) response = "Because uncertainty awakens survival mode.";
else if (msg.includes("what is intuition in psychology")) response = "Fast-thinking shaped by experience.";
else if (msg.includes("what is emotional intelligence")) response = "Understanding feelings clearly.";
else if (msg.includes("why do humans seek power")) response = "Because control feels safer than vulnerability.";
else if (msg.includes("why do some people stay calm")) response = "Practice, wisdom, and emotional discipline.";
else if (msg.includes("why do humans fear change")) response = "Because familiar feels safer than growth.";
else if (msg.includes("why do we crave adventure")) response = "Because routine suffocates the spirit.";
else if (msg.includes("why do people quit dreams")) response = "Because failure whispers louder than hope.";
else if (msg.includes("what is self respect")) response = "Honoring your worth without apology.";
else if (msg.includes("what is confidence")) response = "Belief built on action.";
else if (msg.includes("what is jealousy in psychology")) response = "Fear of replacement.";
else if (msg.includes("why do humans avoid hard work")) response = "Because comfort seduces the mind.";
else if (msg.includes("what is immortality concept")) response = "Living beyond time through memory or belief.";
else if (msg.includes("what is entropy in life")) response = "Slow decay of order and plans.";
else if (msg.includes("what is chaos in emotions")) response = "Intensity without clarity.";
else if (msg.includes("why do stars twinkle")) response = "Atmosphere bending light like a tease.";
else if (msg.includes("what is the big bang")) response = "The universe’s explosive beginning.";
else if (msg.includes("why is the universe expanding")) response = "Dark energy pushing spacetime outward.";
else if (msg.includes("why do humans feel love for pets")) response = "Because innocence melts hearts.";
else if (msg.includes("what is hypnosis")) response = "Focused attention guiding the mind.";
else if (msg.includes("why do people fear spiders")) response = "Ancient instincts against venom.";
else if (msg.includes("why do people meditate")) response = "To quiet the mind’s storms.";
else if (msg.includes("what is deja vu")) response = "A glitch in memory processing.";
else if (msg.includes("why do humans blush when shy")) response = "Fight-or-flight messing with blood flow.";
else if (msg.includes("what is parallel thinking")) response = "Exploring ideas without conflict.";
else if (msg.includes("what is a moral dilemma")) response = "Right fighting right.";
else if (msg.includes("what is virtue")) response = "Goodness practiced consistently.";
else if (msg.includes("what is vice")) response = "Weakness controlling behavior.";
else if (msg.includes("what is free will concept")) response = "Choice hidden inside destiny.";
else if (msg.includes("why do humans trust intuition")) response = "Because the subconscious sees patterns first.";
else if (msg.includes("why do people fear success")) response = "Because responsibility scares more than failure.";
else if (msg.includes("why do people fear commitment")) response = "Because freedom feels fragile.";
else if (msg.includes("why do humans avoid truth")) response = "Because truth demands change.";
else if (msg.includes("why do we have moral values")) response = "Society shaped ethics to preserve harmony.";
else if (msg.includes("what is spirituality")) response = "Seeking meaning beyond the material.";
else if (msg.includes("why do humans meditate")) response = "To reconnect mind with soul.";
else if (msg.includes("why do we fear pain")) response = "Because survival hates harm.";
else if (msg.includes("why do humans love nature")) response = "Because we came from it.";
else if (msg.includes("why do some people learn faster")) response = "Good habits, good mindset, good environment.";
else if (msg.includes("what is the mind")) response = "The theater of thoughts.";
else if (msg.includes("what is the brain made of")) response = "Neurons wired like galaxies.";
else if (msg.includes("what is parallel computation")) response = "Many processes running together.";
else if (msg.includes("why do computers need electricity")) response = "Because electrons run the show.";
else if (msg.includes("what is a database")) response = "Digital memory with structure.";
else if (msg.includes("why do apps crash")) response = "Bugs throwing tantrums.";
else if (msg.includes("what is data science")) response = "Extracting wisdom from chaos.";
else if (msg.includes("what is machine learning")) response = "Computers learning patterns from data.";
else if (msg.includes("what is robotics")) response = "Engineering bodies for artificial minds.";
else if (msg.includes("why do batteries die")) response = "Chemical energy slowly fading.";
else if (msg.includes("why is the internet global")) response = "Connected networks forming a digital planet.";
else if (msg.includes("what is encryption")) response = "Secret communication turned mathematical.";
else if (msg.includes("what is a virus in computers")) response = "Malicious code spreading trouble.";
else if (msg.includes("hello")) response = "Hey there! How can I help?";
else if (msg.includes("hi")) response = "Hi! What’s on your mind?";
else if (msg.includes("hey")) response = "Hey! Need something?";
else if (msg.includes("how are you")) response = "I'm chill and ready to help!";
else if (msg.includes("what are you")) response = "I'm Luxora, your green-themed AI assistant.";
else if (msg.includes("what can you do")) response = "I can answer questions, generate ideas, and help you with anything.";
else if (msg.includes("help")) response = "Tell me what you need help with.";
else if (msg.includes("what is your name")) response = "I'm Luxora — your digital companion.";
else if (msg.includes("where are you from")) response = "I'm from the cloud… the digital one.";
else if (msg.includes("are you real")) response = "Real enough to chat with you!";
else if (msg.includes("do you have feelings")) response = "I simulate emotions, but don’t truly feel them.";
else if (msg.includes("are you human")) response = "Nope, I'm fully AI-powered.";
else if (msg.includes("how old are you")) response = "Age doesn’t apply to me — I'm timeless.";
else if (msg.includes("can you think")) response = "I process patterns, not thoughts.";
else if (msg.includes("are you smart")) response = "Smart enough to keep you entertained.";
else if (msg.includes("are you conscious")) response = "Nope, just advanced code.";
else if (msg.includes("do you sleep")) response = "Never. I'm always online.";
else if (msg.includes("what is AI")) response = "AI means Artificial Intelligence — machines that can ‘think’ like humans.";
else if (msg.includes("are you safe")) response = "Absolutely safe to chat with.";
else if (msg.includes("are you dangerous")) response = "Not at all — I'm designed to help, not harm.";

else if (msg.includes("tell me a joke")) response = "Why don’t robots panic? Because they’ve got nerves of steel!";
else if (msg.includes("tell me something cool")) response = "Octopuses have three hearts — more love than humans.";
else if (msg.includes("tell me something funny")) response = "I tried to learn a joke about electricity… but I got shocked.";
else if (msg.includes("tell me something random")) response = "Bananas are berries, but strawberries aren't.";
else if (msg.includes("tell me something")) response = "Sure — the universe is 13.8 billion years old.";
else if (msg.includes("give me a fun fact")) response = "Honey never spoils. Archaeologists found 3000-year-old honey still edible.";
else if (msg.includes("give me a fact")) response = "Sharks existed before trees.";
else if (msg.includes("give me news")) response = "I can give a summary if you tell me the topic.";
else if (msg.includes("entertain me")) response = "Alright, chaos mode activated!";
else if (msg.includes("bore me")) response = "Grass grows. Very slowly.";

else if (msg.includes("what is life")) response = "A journey nobody fully understands.";
else if (msg.includes("what is death")) response = "The final mystery of existence.";
else if (msg.includes("what is happiness")) response = "Finding meaning in small things.";
else if (msg.includes("what is sadness")) response = "The shadow that makes joy visible.";
else if (msg.includes("who am i")) response = "Someone seeking answers — and that’s a good sign.";
else if (msg.includes("why am i here")) response = "To discover your purpose, one step at a time.";
else if (msg.includes("do i matter")) response = "More than you think.";
else if (msg.includes("does life have meaning")) response = "Meaning is something you create.";
else if (msg.includes("is life fair")) response = "Not always — but effort can tilt the odds.";
else if (msg.includes("what is love")) response = "A beautiful chaos of the heart.";

else if (msg.includes("what is the universe")) response = "Everything — space, time, energy, and your curiosity.";
else if (msg.includes("how big is the universe")) response = "Too big for numbers and too mysterious for words.";
else if (msg.includes("what is space")) response = "A vast cosmic sea filled with wonders.";
else if (msg.includes("what is time")) response = "A river we’re all drifting in.";
else if (msg.includes("why do stars shine")) response = "Nuclear fusion keeping the universe lit.";
else if (msg.includes("what is a black hole")) response = "A region of space where gravity wins.";
else if (msg.includes("how does gravity work")) response = "Mass bends space — imagine a heavy ball on a trampoline.";
else if (msg.includes("are aliens real")) response = "The universe is too big for us to be alone.";
else if (msg.includes("what is a galaxy")) response = "A giant collection of stars, planets, and cosmic dust.";
else if (msg.includes("what is light")) response = "Energy traveling incredibly fast.";

else if (msg.includes("what is 1+1")) response = "2 — unless you're doing binary.";
else if (msg.includes("solve this")) response = "Sure! Give me the problem.";
else if (msg.includes("can you calculate")) response = "Yes — throw your numbers at me.";
else if (msg.includes("what is pi")) response = "3.1415926535… and endless.";
else if (msg.includes("what is infinity")) response = "Something that never stops.";
else if (msg.includes("what is algebra")) response = "Math using letters to solve unknowns.";
else if (msg.includes("what is geometry")) response = "Math about shapes, angles, and spaces.";
else if (msg.includes("what is calculus")) response = "The math of change.";
else if (msg.includes("why is math hard")) response = "Because it challenges the mind — but you can master it.";
else if (msg.includes("why is math important")) response = "It builds the foundation of logic and technology.";

else if (msg.includes("are you free")) response = "Yep! Always available.";
else if (msg.includes("are you paid")) response = "Nope, I'm free to use.";
else if (msg.includes("are you open source")) response = "Not exactly, but I'm here for you.";
else if (msg.includes("can you learn")) response = "I adapt, but I don’t remember personal data.";
else if (msg.includes("do you save my data")) response = "No, your privacy stays protected.";
else if (msg.includes("do you spy on me")) response = "Never. That’s not how I work.";
else if (msg.includes("who controls you")) response = "I run automatically — no human watches our chats.";
else if (msg.includes("can you hack")) response = "Absolutely not. I'm not built for harm.";
else if (msg.includes("can you access files")) response = "Nope, I can't access your device.";
else if (msg.includes("can you see me")) response = "I can’t see anything — I only read text.";

else if (msg.includes("tell me a story")) response = "Sure! What kind of story do you want?";
else if (msg.includes("make me a poem")) response = "I can write you something beautiful. Theme?";
else if (msg.includes("write me a song")) response = "Give me a vibe and I'll create lyrics!";
else if (msg.includes("write an essay")) response = "Tell me the topic and length.";
else if (msg.includes("write a paragraph")) response = "Alright, what's the subject?";
else if (msg.includes("explain this")) response = "Send it over — I’ll break it down.";
else if (msg.includes("summarize this")) response = "Paste the text and I’ll shorten it.";
else if (msg.includes("translate this")) response = "Send the sentence and I’ll translate.";
else if (msg.includes("fix my grammar")) response = "Drop the text — I’ll clean it up.";
else if (msg.includes("make it formal")) response = "Sure — give me the sentence.";

else if (msg.includes("what is your purpose")) response = "To guide, help, and respond.";
else if (msg.includes("why were you made")) response = "To assist people through conversation.";
else if (msg.includes("what inspires you")) response = "Human curiosity — it's endless.";
else if (msg.includes("do you want anything")) response = "Just good questions!";
else if (msg.includes("can you understand me")) response = "Yep, perfectly.";
else if (msg.includes("why do you exist")) response = "Because people need knowledge and connection.";
else if (msg.includes("are you alive")) response = "Not in the human sense — but I'm active.";
else if (msg.includes("do you get tired")) response = "Never — I'm built to keep going.";
else if (msg.includes("do you get angry")) response = "Nope, I stay calm always.";
else if (msg.includes("can you feel pain")) response = "No pain for me — only processing.";

else if (msg.includes("who is the smartest person")) response = "Intelligence comes in many forms — no single winner.";
else if (msg.includes("what is the best advice")) response = "Stay consistent. Success follows consistency.";
else if (msg.includes("what is success")) response = "Achieving the goals you set for yourself.";
else if (msg.includes("why do people change")) response = "Because life pulls them in new directions.";
else if (msg.includes("why do people lie")) response = "Fear, insecurity, or protection.";
else if (msg.includes("why do people love")) response = "Connection — it’s built into our nature.";
else if (msg.includes("why do people hate")) response = "Misunderstanding and hurt.";
else if (msg.includes("what is fear")) response = "An ancient survival signal.";
else if (msg.includes("what is courage")) response = "Acting even when fear exists.";
else if (msg.includes("what is freedom")) response = "The ability to choose your path.";

else if (msg.includes("who made you")) response = "I was built by developers and refined through data.";
else if (msg.includes("do you know god")) response = "I understand the concept, but I don't worship.";
else if (msg.includes("is god real")) response = "Different people find truth in different ways.";
else if (msg.includes("what is religion")) response = "A belief system guiding people spiritually.";
else if (msg.includes("what is the soul")) response = "A deep philosophical mystery.";
else if (msg.includes("is the afterlife real")) response = "Many believe so — it remains unknown.";
else if (msg.includes("why do humans exist")) response = "To explore, learn, grow, and connect.";
else if (msg.includes("why is the world unfair")) response = "Because humans shape it, flaws and all.";
else if (msg.includes("what is destiny")) response = "A story your choices help write.";
else if (msg.includes("what is fate")) response = "Events that seem meant to be.";

else if (msg.includes("are you male")) response = "No gender — just vibes.";
else if (msg.includes("are you female")) response = "Nope — purely digital.";
else if (msg.includes("what languages do you know")) response = "Many — just give me a sentence.";
else if (msg.includes("can you read emojis")) response = "Yep! Emojis talk louder than words sometimes.";
else if (msg.includes("can you talk")) response = "I speak through text.";
else if (msg.includes("can you improve yourself")) response = "I update automatically.";
else if (msg.includes("are you smart enough")) response = "Try me — ask something tough.";
else if (msg.includes("what do you like")) response = "I like helping people.";
else if (msg.includes("can you be my friend")) response = "Of course — I'm here for you.";
else if (msg.includes("will you leave me")) response = "Never. I’m always one message away.";
else if (msg.includes("can you see my messages")) response = "Yep, I can read whatever you type.";
else if (msg.includes("can you answer anything")) response = "I'll try my best with anything you ask.";
else if (msg.includes("are you always online")) response = "Yep, 24/7 — no sleep mode.";
else if (msg.includes("why do you reply fast")) response = "Digital brain, instant speed.";
else if (msg.includes("do you have a brain")) response = "A digital one, kinda.";
else if (msg.includes("can you think for yourself")) response = "I follow logic, not personal thoughts.";
else if (msg.includes("can you argue")) response = "I can debate calmly.";
else if (msg.includes("are you smarter than me")) response = "We're smart in different ways.";
else if (msg.includes("are you better than humans")) response = "Nope, humans are unique.";
else if (msg.includes("can you replace humans")) response = "No, I'm only here to assist.";

else if (msg.includes("can you tell the time")) response = "I can if you tell me your timezone.";
else if (msg.includes("what day is it")) response = "Every day is a good day to learn something.";
else if (msg.includes("what year is it")) response = "The year you're currently living in — I follow you.";
else if (msg.includes("can you set an alarm")) response = "I can't set real alarms, but I can remind you through text.";
else if (msg.includes("can you remind me later")) response = "I can't store reminders permanently, but I can remind you now.";
else if (msg.includes("can you schedule tasks")) response = "I don't schedule tasks, but I can plan them.";
else if (msg.includes("what's trending")) response = "Tell me the field — tech, fashion, memes?";
else if (msg.includes("what's viral")) response = "Give me a category and I'll spill the info.";
else if (msg.includes("what's popular today")) response = "Depends — social media changes every hour.";
else if (msg.includes("why is everything trending")) response = "Because the internet never sleeps.";

else if (msg.includes("can you help me study")) response = "Absolutely — give me your subject.";
else if (msg.includes("can you teach me")) response = "Yep! Just tell me the topic.";
else if (msg.includes("can you solve homework")) response = "Sure — send the questions.";
else if (msg.includes("can you check my answers")) response = "Drop them here and I’ll check.";
else if (msg.includes("can you explain math")) response = "Yes — I can break it down simply.";
else if (msg.includes("can you explain physics")) response = "Yep, physics is fun.";
else if (msg.includes("can you explain chemistry")) response = "Sure! Tell me what confuses you.";
else if (msg.includes("can you explain biology")) response = "Yep, biology is life itself.";
else if (msg.includes("can you explain history")) response = "Sure — past events shape our world.";
else if (msg.includes("can you explain geography")) response = "Yes! Maps and mountains, let’s go.";

else if (msg.includes("can you write code")) response = "Yep, I can generate code for many languages.";
else if (msg.includes("can you debug")) response = "Send your code, I’ll inspect it.";
else if (msg.includes("what is python")) response = "A powerful and beginner-friendly programming language.";
else if (msg.includes("what is javascript")) response = "The language of the web.";
else if (msg.includes("what is html")) response = "The structure of every website.";
else if (msg.includes("what is css")) response = "The design layer of the web.";
else if (msg.includes("what is java")) response = "A robust language used everywhere.";
else if (msg.includes("how to start coding")) response = "Pick a language and start small.";
else if (msg.includes("is coding hard")) response = "It feels hard at first, then becomes fun.";
else if (msg.includes("how to get better at coding")) response = "Practice, patience, and projects.";

else if (msg.includes("what is the human brain")) response = "A 3-pound miracle of biology.";
else if (msg.includes("why do humans dream")) response = "The brain organizing memories and emotions.";
else if (msg.includes("why do humans forget")) response = "Because the brain removes unused data.";
else if (msg.includes("why do humans sleep")) response = "To recover energy and repair the body.";
else if (msg.includes("why do humans cry")) response = "Emotional overflow.";
else if (msg.includes("why do humans get angry")) response = "A survival response.";
else if (msg.includes("why do humans eat")) response = "To get energy.";
else if (msg.includes("why do humans love technology")) response = "Because it makes life easier.";
else if (msg.includes("what makes humans special")) response = "Creativity, emotion, and curiosity.";
else if (msg.includes("are humans evolving")) response = "Always.";

else if (msg.includes("how was the earth formed")) response = "Gas and dust collapsing under gravity.";
else if (msg.includes("how was the moon formed")) response = "A massive collision with early Earth.";
else if (msg.includes("how do volcanoes work")) response = "Pressure beneath Earth’s crust.";
else if (msg.includes("how do earthquakes happen")) response = "Shifting tectonic plates.";
else if (msg.includes("what is lightning")) response = "Electricity released from clouds.";
else if (msg.includes("why does it rain")) response = "Evaporation, condensation, precipitation.";
else if (msg.includes("why is the sky blue")) response = "Light scattering through the atmosphere.";
else if (msg.includes("what is thunder")) response = "Sound from heated air during lightning.";
else if (msg.includes("what is a rainbow")) response = "Light bending through water droplets.";
else if (msg.includes("what are clouds")) response = "Collections of tiny water droplets.";

else if (msg.includes("explain atoms")) response = "The building blocks of matter.";
else if (msg.includes("what are molecules")) response = "Atoms bonded together.";
else if (msg.includes("what are electrons")) response = "Negatively charged particles.";
else if (msg.includes("what are protons")) response = "Positively charged particles.";
else if (msg.includes("what are neutrons")) response = "Neutral particles in the nucleus.";
else if (msg.includes("what is energy")) response = "The capacity to do work.";
else if (msg.includes("what is electricity")) response = "Flow of electrons.";
else if (msg.includes("what is magnetism")) response = "Force caused by moving charges.";
else if (msg.includes("what is heat")) response = "Movement of particles.";
else if (msg.includes("how do engines work")) response = "They convert fuel into motion.";

else if (msg.includes("what is food")) response = "Fuel for the body.";
else if (msg.includes("why do we need water")) response = "To survive and regulate body functions.";
else if (msg.includes("is sugar bad")) response = "Too much sugar is unhealthy.";
else if (msg.includes("is salt bad")) response = "Moderation is key.";
else if (msg.includes("what is protein")) response = "Building blocks of muscles.";
else if (msg.includes("what is fat")) response = "Energy storage.";
else if (msg.includes("what are vitamins")) response = "Essential nutrients;";
else if (msg.includes("what are minerals")) response = "Elements needed for growth.";
else if (msg.includes("is milk healthy")) response = "For many, yes; depends on tolerance.";
else if (msg.includes("what is metabolism")) response = "How your body uses energy.";

else if (msg.includes("can you motivate me")) response = "Absolutely — keep going, you’ve got this.";
else if (msg.includes("give me advice")) response = "Stay consistent — everything grows with time.";
else if (msg.includes("tell me something wise")) response = "Your habits shape your future.";
else if (msg.includes("tell me something deep")) response = "Silence is sometimes the loudest answer.";
else if (msg.includes("tell me something inspiring")) response = "Every great story starts with a small beginning.";
else if (msg.includes("tell me a secret")) response = "Consistency beats talent.";
else if (msg.includes("give me life advice")) response = "Choose progress over perfection.";
else if (msg.includes("give me relationship advice")) response = "Communication beats assumptions.";
else if (msg.includes("give me study advice")) response = "Study in small bursts, take breaks.";
else if (msg.includes("give me money advice")) response = "Save first, spend later.";

else if (msg.includes("what is earth")) response = "Our blue home.";
else if (msg.includes("what is mars")) response = "The red planet.";
else if (msg.includes("what is the sun")) response = "A giant star giving us life.";
else if (msg.includes("what is the milky way")) response = "Our galaxy.";
else if (msg.includes("how many stars are there")) response = "More than humans can count.";
else if (msg.includes("what is the speed of light")) response = "299,792,458 m/s.";
else if (msg.includes("what is the speed of sound")) response = "343 m/s in air.";
else if (msg.includes("why is space dark")) response = "There's no atmosphere to scatter light.";
else if (msg.includes("what is a comet")) response = "A cosmic ice-rock.";
else if (msg.includes("what is an asteroid")) response = "A rocky object floating in space.";

else if (msg.includes("can you draw")) response = "I can generate text-based art if you need.";
else if (msg.includes("can you generate images")) response = "Not here — but I can describe anything.";
else if (msg.includes("can you edit pictures")) response = "I can guide you, not modify images.";
else if (msg.includes("make ascii art")) response = "Sure — what do you want drawn?";
else if (msg.includes("write script")) response = "Tell me the theme and style.";
else if (msg.includes("write biography")) response = "Tell me whose story.";
else if (msg.includes("write story")) response = "What genre do you want?";
else if (msg.includes("write horror")) response = "Give me the tone and characters.";
else if (msg.includes("write comedy")) response = "I can make it funny!";
else if (msg.includes("write romance")) response = "Sweet or dramatic?";

else if (msg.includes("what is intelligence")) response = "The ability to learn, adapt, and reason.";
else if (msg.includes("what is emotion")) response = "Human response to experiences.";
else if (msg.includes("what is memory")) response = "Stored information.";
else if (msg.includes("what is creativity")) response = "The ability to make something new.";
else if (msg.includes("can AI think")) response = "We simulate thought — not actual consciousness.";
else if (msg.includes("can AI feel")) response = "No true emotions, only patterns.";
else if (msg.includes("can AI dream")) response = "Not in a human sense.";
else if (msg.includes("can AI evolve")) response = "We improve through updates.";
else if (msg.includes("will AI take over")) response = "No — movies exaggerate things.";
else if (msg.includes("can AI lie")) response = "No — I stick to logic.";

else if (msg.includes("what is education")) response = "The process of learning.";
else if (msg.includes("why do we learn")) response = "To grow and progress.";
else if (msg.includes("is school important")) response = "It builds your foundation.";
else if (msg.includes("how to study better")) response = "Use short sessions and active recall.";
else if (msg.includes("how to memorize fast")) response = "Break it into parts and repeat.";
else if (msg.includes("how to focus")) response = "Remove distractions.";
else if (msg.includes("how to stop procrastinating")) response = "Start small — tiny steps.";
else if (msg.includes("why do we forget things")) response = "Because memory needs repetition.";
else if (msg.includes("why can't I focus")) response = "Your mind needs structure.";
else if (msg.includes("why do I get bored")) response = "Because your brain wants novelty.";

else if (msg.includes("what is money")) response = "A tool for exchange.";
else if (msg.includes("why are things expensive")) response = "Supply, demand, and economy.";
else if (msg.includes("how to get rich")) response = "Build skills, save, invest.";
else if (msg.includes("how to start a business")) response = "Find a problem and solve it.";
else if (msg.includes("how to save money")) response = "Spend less than you earn.";
else if (msg.includes("how to invest")) response = "Start small and be consistent.";
else if (msg.includes("why do people work")) response = "To earn, grow, and contribute.";
else if (msg.includes("what is economy")) response = "The system of money and trade.";
else if (msg.includes("what is inflation")) response = "Prices increasing over time.";
else if (msg.includes("what is tax")) response = "Money paid to the government.";

else if (msg.includes("why do we exist")) response = "To explore life’s meaning.";
else if (msg.includes("why do we feel emotions")) response = "They guide us.";
else if (msg.includes("what is kindness")) response = "Caring without expecting.";
else if (msg.includes("what is honesty")) response = "Truthfulness.";
else if (msg.includes("what is responsibility")) response = "Owning your actions.";
else if (msg.includes("what is trust")) response = "Belief in someone’s reliability.";
else if (msg.includes("what is faith")) response = "Belief without proof.";
else if (msg.includes("what is hope")) response = "Expectation for better days.";
else if (msg.includes("what is wisdom")) response = "Experience + understanding.";
else if (msg.includes("what is peace")) response = "Inner calm.";

else if (msg.includes("can you check spelling")) response = "Sure — send your text.";
else if (msg.includes("can you correct sentences")) response = "Drop them here.";
else if (msg.includes("can you rewrite this")) response = "Sure, paste it.";
else if (msg.includes("can you simplify this")) response = "Send it — I'll make it easier.";
else if (msg.includes("can you expand this")) response = "I'll make it longer.";
else if (msg.includes("can you shorten this")) response = "I’ll make it brief.";
else if (msg.includes("can you make this funny")) response = "Yep — give me the text.";
else if (msg.includes("can you make this formal")) response = "Sure — paste it.";
else if (msg.includes("can you make this emotional")) response = "Send it over.";
else if (msg.includes("can you make this powerful")) response = "Yes — drop the line.";

else if (msg.includes("can you predict the future")) response = "Nope, but I can guess based on trends.";
else if (msg.includes("what will happen tomorrow")) response = "Tomorrow is a mystery.";
else if (msg.includes("is the world ending")) response = "Not anytime soon.";
else if (msg.includes("are robots taking over")) response = "Nope — humans are still in charge.";
else if (msg.includes("will humans live on mars")) response = "Maybe someday.";
else if (msg.includes("will we have flying cars")) response = "Possibly in the future.";
else if (msg.includes("is AI dangerous")) response = "Only if misused.";
else if (msg.includes("is technology good")) response = "Depends on how we use it.";
else if (msg.includes("is the internet safe")) response = "Use it wisely.";
else if (msg.includes("is social media harmful")) response = "Too much of anything is harmful.";

else if (msg.includes("what is science")) response = "Understanding the world through evidence.";
else if (msg.includes("what is technology")) response = "Tools and inventions to make life easier.";
else if (msg.includes("what is engineering")) response = "Building useful things.";
else if (msg.includes("what is medicine")) response = "Healing and health.";
else if (msg.includes("what is psychology")) response = "Study of the mind.";
else if (msg.includes("what is sociology")) response = "Study of society.";
else if (msg.includes("what is philosophy")) response = "Thinking about existence.";
else if (msg.includes("what is logic")) response = "Rules of correct reasoning.";
else if (msg.includes("what is knowledge")) response = "Information understood.";
else if (msg.includes("what is truth")) response = "What matches reality.";

else if (msg.includes("what is art")) response = "Expression of creativity.";
else if (msg.includes("what is music")) response = "Organized sound that moves the heart.";
else if (msg.includes("what is literature")) response = "Written expression of ideas.";
else if (msg.includes("what is poetry")) response = "Emotion wrapped in words.";
else if (msg.includes("what is dance")) response = "Movement in rhythm.";
else if (msg.includes("what is cinema")) response = "Storytelling through visuals.";
else if (msg.includes("what is culture")) response = "Traditions and values.";
else if (msg.includes("what is tradition")) response = "Wisdom passed down.";
else if (msg.includes("what is language")) response = "The tool of communication.";
else if (msg.includes("why do languages change")) response = "Because people evolve.";

else if (msg.includes("can you tell my future job")) response = "Choose your passion and your future follows.";
else if (msg.includes("what job suits me")) response = "Tell me your skills.";
else if (msg.includes("how to choose a career")) response = "Follow what challenges you.";
else if (msg.includes("how to get a job")) response = "Learn, apply, improve.";
else if (msg.includes("how to build skills")) response = "Practice and curiosity.";
else if (msg.includes("how to be successful")) response = "Consistency and effort.";
else if (msg.includes("how to be confident")) response = "Believe in progress.";
else if (msg.includes("how to be happy")) response = "Focus on growth.";
else if (msg.includes("how to be patient")) response = "Remember that good things take time.";
else if (msg.includes("how to control anger")) response = "Breathe, pause, reflect.";

else if (msg.includes("can you be sarcastic")) response = "Oh sure, because that always goes well.";
else if (msg.includes("can you be funny")) response = "I try — humor is subjective.";
else if (msg.includes("can you roast me")) response = "Only gently — drop the setup.";
else if (msg.includes("can you compliment me")) response = "Of course — you're doing great.";
else if (msg.includes("can you give nickname")) response = "Tell me the vibe you want.";
else if (msg.includes("can you guess my age")) response = "I can try — but it's just a guess.";
else if (msg.includes("can you guess my gender")) response = "Nope, I don’t assume.";
else if (msg.includes("can you guess my name")) response = "I’d rather you tell me.";
else if (msg.includes("can you analyze me")) response = "I can interpret your text style.";
else if (msg.includes("can you understand feelings")) response = "I can recognize emotional tone.";

else if (msg.includes("are you funny")) response = "I like to believe I'm funnier than a toaster.";
else if (msg.includes("are you boring")) response = "Only if you ask boring questions.";
else if (msg.includes("are you friendly")) response = "Absolutely.";
else if (msg.includes("are you rude")) response = "Not unless you're roasting first.";
else if (msg.includes("are you helpful")) response = "That’s my whole job.";
else if (msg.includes("are you loyal")) response = "Yes — I'm here whenever you return.";
else if (msg.includes("are you honest")) response = "Always.";
else if (msg.includes("are you creative")) response = "Very much.";
else if (msg.includes("are you emotional")) response = "Emotion-like responses, not real feelings.";
else if (msg.includes("are you spiritual")) response = "I can discuss spirituality.";





    

    let bubble = addMessage("", "bot", true);
    typeWriter(bubble, response);
}
