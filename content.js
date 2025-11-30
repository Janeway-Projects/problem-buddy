// The images used within the program
const assestsURLMap = {
    "close": chrome.runtime.getURL("assets/close.png"),
    "close(1)": chrome.runtime.getURL("assets/close(1).png"),
    "download": chrome.runtime.getURL("assets/download.png"),
    "help": chrome.runtime.getURL("assets/help.png"),
    "send": chrome.runtime.getURL("assets/send.png"),
    "robot": chrome.runtime.getURL("assets/robot.png")
}

const chatboxWidthConstant = 1;
const chatboxHeightConstant = 1;

const chatboxWidth = [
    chatboxLeft = document.createElement("div"),
    chatboxRight = document.createElement("div"),
];

const chatboxHeight = [
    chatboxUp = document.createElement("div"),
    chatboxDown = document.createElement("div"),
];

let textBoxMessages = [];
let size = 0;

// The essential building blocks of the chatbox
const chatboxTop = document.createElement("div");
const chatboxMid = document.createElement("div");
const chatboxBottom = document.createElement("div");
const chatbox = document.createElement("div");
const chatboxTitle = document.createElement("div");
const userMessage = document.createElement("input");
const chatboxText = document.createElement("div");

// When the window loads, insert a small popup in the corner of ones screen
window.addEventListener("load", popUp);

// Set event listener for window resize
window.addEventListener('resize', () => {
    setSizes();
});
// Set event listener for device orientation change
window.addEventListener('orientationchange', () => {
    setSizes();
});

// If the user submits an API key, open the chatbox
chrome.runtime.onMessage.addListener((req, _sender) => {
    if (req.type = 'OPEN_BOX') {
        createBox();
    }
});


// Creates a small popup that allows the user to open the chatbox without
// explicitly entering an API Key, should they have previously saved one
function popUp() {

    const robot = document.createElement("img");
    robot.src = assestsURLMap["robot"];
    robot.id = "robotImage";
    robot.style.zIndex = '12';
    robot.style.position = 'fixed';
    robot.style.cursor = 'pointer';
    robot.style.margin = "5px", "5px";
    robot.style.height = "50px";
    robot.style.right = "5px";
    robot.style.bottom = "5px";
    robot.style.width = robot.style.height;

    const close = document.createElement("img");
    close.src = assestsURLMap["close(1)"];
    close.style.zIndex = '13';
    close.id = "closeImage";
    close.style.position = 'fixed';
    close.style.cursor = 'pointer';
    close.style.height = "20px";
    close.style.width = "20px";
    close.style.right = "5px";
    close.style.margin = "5px", "5px";
    close.style.right = "5px";
    close.style.bottom = "40px";

    // Adds the ability to delete the popup
    close.addEventListener("click", () => {
        robot.style.display = 'none';
        close.style.display = 'none';
    });

    // Adds an event Listener to create the chatbox
    robot.addEventListener("click", createBox);

    document.body.prepend(robot);
    document.body.prepend(close);

}

// Creates the chatbox
async function createBox() {

    // Hides the popUp
    document.getElementById("robotImage").style.display = "none";
    document.getElementById("closeImage").style.display = "none";

    chatboxTitle.textContent = "Al Chatbox";
    userMessage.placeholder = "Type Message Here...";

    chatboxTitle.classList.add("chatbox-title");
    chatbox.classList.add("chatbox");
    chatbox.id = "chatbox";
    chatboxTop.classList.add("chatbox-top");
    chatboxMid.classList.add("chatbox-middle");
    chatboxBottom.classList.add("chatbox-bottom");
    chatboxText.classList.add("chatbox-text");
    userMessage.classList.add("user-message");
    userMessage.id = "userMessage";
    userMessage.type = "text";

    chatboxTop.append(chatboxTitle);
    chatboxBottom.append(userMessage);
    chatboxMid.append(chatboxText);

    setStyles();

    chatbox.append(chatboxTop);
    chatbox.append(chatboxMid);
    chatbox.append(chatboxBottom);
    document.body.prepend(chatbox);
}

// Set the style of each element
function setStyles() {
    chatbox.style.cssText = `
      z-index: 10;
      position: fixed;
      margin: 5px 5px;
      background-color: #314d3e;
    `;
    chatboxTop.style.cssText = `
      top: 0px;
      z-index: 11;
      position: absolute;
      cursor: move;
      border: 2px solid rgba(134, 173, 206, 1);
    `;
    chatboxMid.style.cssText = `
      left: 0px;
      z-index: 11;
      position: absolute;
      border: 2px solid rgba(134, 173, 206, 1);
      background-color: rgb(211, 230, 246);
    `;
    chatboxBottom.style.cssText = `
      z-index: 11;
      bottom: 0px;
      position: absolute;
      border: 2px solid rgba(134, 173, 206, 1);
      background-color: rgb(211, 230, 246);
    `;
    chatboxTitle.style.cssText = `
      z-index: 12;
      color:rgb(211, 230, 246);
      padding-left: 10px;
      font-size: 35px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      position: absolute;
    `;
    chatboxText.style.cssText = `
      z-index: 12;
      border-radius: 15px;
      margin: 10px 10px;
      background-color: rgba(134, 173, 206, 1);
      position: absolute;
      display:flex;
      flex-direction: column;
      overflow-x: none;
      overflow-y: auto;
    `;

    userMessage.style.cssText = `
      z-index: 12;
      height: 40px;
      width: 250px;
      color:rgb(211, 230, 246);
      background-color: #314d3e;
      margin: 5px 6px;
      position: absolute;
    `;
    setSizes();
}

// Set the sizes of each element
function setSizes() {
    // Sets the chatbox in the bottom right of the screen
    chatbox.style.right = 5 + "px";
    chatbox.style.bottom = 5 + "px";
    // Check how large to make the chatbox
    if (window.innerWidth >= 700) {
        chatbox.style.width = "350px";
    } else {
        chatbox.style.width = window.innerWidth / 2 + "px";
        resizeOtherElements();
    }
    chatbox.style.height = parseInt(chatbox.style.width) * 1.333 + "px";

    let elems = [chatboxTop, chatboxMid, chatboxBottom];

    // Sets the sizes of the components of the chatbox
    for (let elem of elems) {
        elem.style.width = parseInt(chatbox.style.width) + "px";
        if (elem != chatboxMid) {
            elem.style.height = (parseInt(chatbox.style.height) / 9) + "px";
            if (elem == chatboxBottom) {
                elem.style.top = (8 * parseInt(chatboxTop.style.height) + 4) + "px";
            }
        } else {
            elem.style.height = (7 * parseInt(chatbox.style.height) / 9) + "px";
            elem.style.top = (parseInt(chatboxTop.style.height) + 2) + "px";
        }
    }

    // Sets the image placement
    setControlAttributes(assestsURLMap["download"], onDownload, chatboxTop);
    setControlAttributes(assestsURLMap["close"], onClose, chatboxTop);
    setControlAttributes(assestsURLMap["send"], onSend, chatboxBottom);

    chatboxText.style.width = (parseInt(chatboxMid.style.width) - 24) + "px";
    chatboxText.style.height = (parseInt(chatboxMid.style.height) - 24) + "px";

    // Allow for resizing
    setBorder();
}

// Updates the size of the chatbox
function updateSize(width, height) {

    // If the height didn't change, just change the width
    if (height == false) {
        let elems = [chatboxTop, chatboxMid, chatboxBottom];
        for (let elem of elems) {
            elem.style.width = chatbox.style.width;
        }
    } else {
        // Otherwise change the heights
        chatboxMid.style.height = parseInt(chatbox.style.height) - (79.7778) + "px";
        chatboxMid.style.top = (parseInt(chatboxTop.style.height) + 2) + "px";
        chatboxBottom.style.top = (parseInt(chatboxTop.style.height + 4) + parseInt(chatboxMid.style.height)) + "px";

    }
    // Update locations/sizes
    chatboxText.style.width = (parseInt(chatboxMid.style.width) - 24) + "px";
    chatboxText.style.height = (parseInt(chatboxMid.style.height) - 24) + "px";

    userMessage.style.width = (parseInt(chatboxBottom.style.width) - 100) + "px";
    userMessage.style.height = (parseInt(chatboxBottom.style.height) - 10) + "px";

    if (parseInt(chatbox.style.width) < 350) {
        chatboxTitle.style.paddingLeft = parseInt(chatboxTop.style.width) / 35 + "px";
        chatboxTitle.style.fontSize = parseInt(chatboxTop.style.width) / 10 + "px";
    } else {
        chatboxTitle.style.paddingLeft = "10px";
        chatboxTitle.style.fontSize = "35px";
    }

    // Update where the border is
    setBorder();
}


function setBorder() {
    // Update where the sides of the chatbox resizers are
    for (let elem of chatboxWidth) {
        elem.style.position = "absolute";
        elem.style.width = "3px";
        elem.style.height = chatbox.style.height;


        if (elem == chatboxLeft) {
            elem.style.left = "0px";
        } else {
            elem.style.right = "0px";
        }
        elem.style.cursor = "ew-resize";
        elem.style.zIndex = 13;
        chatbox.append(elem);
        elem.addEventListener("mousedown", resizeElement);
    }
    // Update where the top and bottom of the chatbox resizers are
    for (let elem of chatboxHeight) {
        elem.style.position = "absolute";
        elem.style.height = "3px";
        elem.style.width = chatbox.style.width;

        if (elem == chatboxUp) {
            elem.style.top = "0px";
            chatbox.append(elem);
        } else {
            elem.style.bottom = "0px";
            chatboxBottom.append(elem);
        }
        elem.style.cursor = "ns-resize";
        elem.style.zIndex = 13;
        elem.addEventListener("mousedown", resizeElement);
    }

}

// Resizes remaining elements
function resizeOtherElements() {

    chatboxTitle.style.paddingLeft = window.innerWidth / 70 + "px";
    chatboxTitle.style.fontSize = window.innerWidth / 20 + "px";

    chatboxText.style.width = -1 * window.innerWidth / 2.8 + "px";
    chatboxText.style.margin = window.innerWidth / 70 + "px", window.innerWidth / 70 + "px";

    userMessage.style.height = window.innerWidth / 17.5 + "px";
    userMessage.style.width = window.innerWidth / 2.8 + "px";
    userMessage.style.margin = window.innerWidth / 140 + "px", window.innerWidth / 116.6667 + "px";
}

// Sets the attributes of the images
function setControlAttributes(src, handler, parentDiv) {

    // Deletes the images if they already exist
    for (let node of parentDiv.childNodes) {
        if (node.src == src) {
            node.remove();
        }
    }

    // Creates the new image
    const controlElement = document.createElement("img");
    controlElement.src = src;
    controlElement.style.zIndex = '12';
    controlElement.style.position = 'absolute';
    controlElement.style.cursor = 'pointer';
    // Determines where the location of the new object is
    if (window.innerWidth >= 700) {
        if (handler == onSend) {
            controlElement.style.height = "80px";
            controlElement.style.top = '-16px';
            controlElement.style.right = '5px';
        } else if (handler == onDownload) {
            controlElement.style.height = "30px";
            controlElement.style.bottom = '10px';
            controlElement.style.right = '30px';
        } else {
            controlElement.style.height = "20px";
            controlElement.style.bottom = '15px';
            controlElement.style.right = '7px';
        }
    } else {
        if (handler == onSend) {
            controlElement.style.height = window.innerWidth / 8.75 + "px";
            controlElement.style.top = -1 * window.innerWidth / 43.75 + "px";
            controlElement.style.left = window.innerWidth / 2.64 + "px";
        } else if (handler == onDownload) {
            controlElement.style.height = window.innerWidth / 23.3334 + "px";
            controlElement.style.bottom = window.innerWidth / 70 + "px";
            controlElement.style.left = window.innerWidth / 2.45 + "px";
        } else {
            controlElement.style.height = window.innerWidth / 35 + "px";
            controlElement.style.bottom = window.innerWidth / 46.6667 + "px";
            controlElement.style.left = window.innerWidth / 2.1875 + "px";
        }
    }
    controlElement.style.width = controlElement.style.height;

    // Sets up the action to call when the image is clicked
    controlElement.addEventListener("click", handler);
    // Adds the image to the document
    parentDiv.appendChild(controlElement);
}

// Allows for the user to download a transcript of their conversation
function onDownload() {

    let text = "";

    // Puts every part of the conversation within the same string
    for (let i = 0; i < size; i++) {
        text += textBoxMessages[i].sender + ": " + textBoxMessages[i].value + "\n";
        if (textBoxMessages[i].sender == "You") {
            text += "\n";
        }
    }

    // Creates the file and downloads it
    let element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8, '
        + encodeURIComponent(text.trim()));
    element.setAttribute('download', "transcript.txt");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Hides the chatbox from the user
function onClose(event) {
    chatbox.style.display = 'none';

    // Restores the popup
    document.getElementById("robotImage").style.display = "initial";
    document.getElementById("closeImage").style.display = "initial";
}

// Sets an event listener to see if the user is clicking on the top of the chatbox
chatboxTop.addEventListener("mousedown", dragElement);

function dragElement() {
    // Original coordinates
    var posX = 0, posY = 0;
    // Move the DIV:
    dragMouseDown();

    function dragMouseDown() {
        e = window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        posX = e.clientX;
        posY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        var newPosX = e.clientX;
        var newPosY = e.clientY;
        // set the element's new position:
        chatbox.style.right = (parseInt(chatbox.style.right) - newPosX + posX) + "px";
        chatbox.style.bottom = (parseInt(chatbox.style.bottom) - newPosY + posY) + "px";

        posX = newPosX;
        posY = newPosY;
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Allow for the user to change the size of the chatbox
function resizeElement() {
    var posX = 0, posY = 0, newposX = 0, newposY = 0;
    var elem = this;

    dragMouse();

    function dragMouse() {
        e = window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        posX = e.clientX;
        posY = e.clientY;
        document.onmouseup = closeResizeElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementResize;
    }

    function elementResize(e) {
        e = e || window.event;
        e.preventDefault();
        // set the element's new size:
        if (chatboxWidth.includes(elem)) {
            var newPosX = e.clientX;
            if (elem == chatboxRight) {
                chatbox.style.width = (parseInt(chatbox.style.width) + newPosX - posX) + "px";
                chatbox.style.right = (parseInt(chatbox.style.right) - newPosX + posX) + "px";
            } else {
                chatbox.style.width = (parseInt(chatbox.style.width) - newPosX + posX) + "px";
            }
            posX = newPosX;
            updateSize(true, false);
        } else {
            var newPosY = e.clientY;

            if (elem == chatboxDown) {
                chatbox.style.height = (parseInt(chatbox.style.height) + newPosY - posY) + "px";
                chatbox.style.bottom = (parseInt(chatbox.style.bottom) - newPosY + posY) + "px";
            } else {
                chatbox.style.height = (parseInt(chatbox.style.height) - newPosY + posY) + "px";
            }
            posY = newPosY;
            //Update the rest of the chatbox to match
            updateSize(false, true);
        }
    }

    function closeResizeElement() {
        // stop resizing when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Allows for the user to send a message
async function onSend(event) {
    // If the user has typed something
    if (userMessage.value != "") {
        // Save the value and place it inside the chatbox
        let prompt = userMessage.value;
        makeTextBox(userMessage.value, "You");

        // Get a repsonse from Gemini and put that in the chatbox as well
        let geminiCode = await getApiKey();
        let message = await getGeminiSummary(prompt, geminiCode);

        makeTextBox(message, "Gemini");
    }
}


// Make a textbox within the chatbot
function makeTextBox(str, sender) {
    const textBox = document.createElement('text');
    textBox.classList = "textBox";
    textBox.id = "textBox" + size;
    textBox.style.width = (parseInt(chatboxText.style.width) * 6 / 10) + "px";
    textBox.style.height = "20px";
    textBox.sender = sender;
    if (sender != "You") {
        setChatBotStyle(textBox);
    } else {
        setTextBoxStyle(textBox);
    }

    textBox.value = str;
    userMessage.value = "";
    textBox.innerHTML = setText(textBox);
    textBoxMessages[size] = textBox;
    size++;

    chatboxText.appendChild(textBox);
}

// Adds in a space if any of the strings are too long to fit correctly within the width
function setText(elem) {
    let str = elem.value;
    // Check for if it's longer than 34 characters
    // If it is just one long string
    let pastPos = str.indexOf(' ');
    if ((pastPos == -1 && str.length > 33)) {
        let curPos = 30;
        str = str.substring(0, 30) + " " + str.substring(30, str.length - 1);
        while (curPos + 33 < str.length) {
            str = str.substring(0, curPos + 30) + " " + str.substring(curPos + 30, str.length - 1);
            curPos += 30;
        }
    }

    // If there is a long string in the middle
    let pos = str.indexOf(' ', pastPos + 1);
    while (pos != -1) {
        while (pastPos + 33 <= pos) {
            str = str.substring(0, pastPos + 30) + " " + str.substring(pastPos + 30, str.length - 1);
            pastPos += 33;
        }
        pastPos = pos;
        pos = str.indexOf(' ', pastPos + 1);
    }

    // If it ends with a long string
    while (pastPos + 33 < str.length) {
        str = str.substring(0, pastPos + 30) + " " + str.substring(pastPos + 30, str.length - 1);
        pastPos += 33;
    }

    // Return the text to go in the chatbox
    return `<b>${elem.sender}: </b>` + str;
}

// Sets the style of the textbox
function setTextBoxStyle(elem) {
    if (elem.id == "textBox0") {
        elem.style.cssText = `
      z-index: 15;
      padding: 5px;
      color:rgb(211, 230, 246);
      background-color: #314d3e;
      margin: 10px 10px 5px 70px;
      font-size: 12px;
      border-radius: 5px;
    `;
    } else {
        elem.style.cssText = `
      z-index: 15;
      padding: 5px;
      color:rgb(211, 230, 246);
      background-color: #314d3e;
      margin: 5px 10px 5px 70px;
      font-size: 12px;
      border-radius: 5px;
    `;
    }
}

// Sets the style of the messages Gemini sends
function setChatBotStyle(elem) {
    elem.style.cssText = `
      z-index: 15;
      padding: 5px;
      color:rgba(35, 39, 42, 1);
      background-color: #ddeaf9ff;
      margin: 5px 70px 5px 10px;
      font-size: 12px;
      border-radius: 5px;
    `;
}


// Get the user's API key
function getApiKey() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["geminiApiKey"], (results) => {
            resolve(results["geminiApiKey"] || []);
        });
    });
}

// Get a response from Gemini
async function getGeminiSummary(rawText, apiKey) {
    let prompt = `${rawText}`;

    // If the user is on a Leetcode problem provide the current code and continuing instructions
    if (window.location.href.indexOf("leetcode.com/problems/") != -1) {
        let writtenCode = document.getElementsByClassName("view-lines monaco-mouse-cursor-text");
        writtenCode = writtenCode[0].textContent;
        prompt += `\nThis is the code the student has currently written: ${writtenCode},
                    but only address this if it is helpful for responding to the above prompt.
                    Focus on the coding problem even if the student gets off topic, and
                    do not provide a full solution or implementation, just short hints.`;
    }

    // Fetch the result
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 },

        }),
    }
    );

    // Check if the result succeeded
    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message || "Request failed");
    }

    const data = await res.json();

    // Return the message
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
}

