const chihuahua = document.getElementById('chihuahua');
const message = document.getElementById('message');
const clickText = document.getElementById('click-text');
const valentineMessage = document.getElementById('valentine-message');
const pastaInvite = document.getElementById('pasta-invite');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const body = document.body;

let step = 1;
let isTyping = false; // Prevent multiple clicks during typing
let noClicks = 0; // Track number of "No" clicks

// Chihuahua image list for expressions
const chihuahuaImages = [
    "chihuahuathinking.png",
    "tuxedo.png",
    "smiling.png",
    "tuxedo.png",
    "chihuahuasmiling.png",
    "angryone.png"
];

// Function to type messages with typewriter effect
function typeMessage(text, callback) {
    isTyping = true; // Disable clicks during typing
    message.textContent = ""; // Clear previous message
    let index = 0;

    const interval = setInterval(() => {
        message.textContent += text[index];
        index++;

        if (index === text.length) {
            clearInterval(interval);
            isTyping = false; // Re-enable clicks
            if (callback) callback(); // Call the next step if provided
        }
    }, 50); // Adjust typing speed
}

// Initial setup
typeMessage("Catch me if you can!");

chihuahua.addEventListener('click', () => {
    if (isTyping) return; // Prevent clicks during typing

    chihuahua.classList.add('shake'); // Chihuahua shakes on click
    setTimeout(() => chihuahua.classList.remove('shake'), 500); // Remove shake after 0.5s

    // Immediately change the dog image when clicked
    if (step === 1) {
        chihuahua.src = chihuahuaImages[1]; // Change dog image
        typeMessage("Hey, what are you doing here?", () => {
            clickText.style.display = 'block'; // Show "Click Me!"
            step++; // Increment step AFTER the message is fully typed
        });
    } else if (step === 2) {
        chihuahua.src = chihuahuaImages[2]; // Change dog image
        typeMessage("Ah! I know you - you are the most beautiful person to ever exist!", () => {
            step++; // Increment step AFTER the message is fully typed
        });
    } else if (step === 3) {
        chihuahua.src = chihuahuaImages[3]; // Change dog image
        typeMessage("Pet me!", () => {
            clickText.textContent = "Pet me!";
            step++; // Increment step AFTER the message is fully typed
        });
    } else if (step === 4) {
        chihuahua.src = chihuahuaImages[4]; // Change dog image
        typeMessage("He left a message for you...", () => {
            step++; // Increment step AFTER the message is fully typed
            // Show the Valentine message after a short delay
            setTimeout(() => {
                valentineMessage.classList.remove('hidden');
                clickText.style.display = "none"; // Hide "Click Me!"
            }, 1000); // 1-second delay
        });
    }
});

yesBtn.addEventListener('click', () => {
    valentineMessage.classList.add('hidden');
    pastaInvite.classList.remove('hidden');
    chihuahua.src = "smiling.png"; // Show smiling chihuahua
});

noBtn.addEventListener('click', () => {
    noClicks++;
    body.classList.add('angry-mode'); // Turn screen red
    chihuahua.classList.add('angry'); // Make chihuahua grow
    chihuahua.src = chihuahuaImages[5]; // Show angry chihuahua

    if (noClicks > 1) {
        chihuahua.style.transform = `scale(${1 + noClicks * 0.2})`; // Grow larger with each "No" click
    }
});