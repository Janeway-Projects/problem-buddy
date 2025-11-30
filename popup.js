
const submitValue = document.getElementById("submitBox");
const submitButton = document.getElementById("submitButton");

let geminiCode;

document.addEventListener('DOMContentLoaded', function() {
    submitButton.addEventListener('click', onPress);
});

// The function to run once the user presses the submit button
async function onPress() {
        // Stores the saved value and resets it
        geminiCode = submitValue.value;
        submitValue.value = "";
        if(await initializeChatbot(geminiCode)){
            submitValue.placeholder = "Thank you!";
            
            // Opens the chatbot
            chrome.tabs.query({active:true, currentWindow:true}, ([tab]) => {
                chrome.tabs.sendMessage(tab.id, {type: "OPEN_BOX"});
            });

            // Saves the key within memory
            chrome.storage.sync.set({ "geminiApiKey": geminiCode });

            // Turns the submit button off
            submitButton.setAttribute("disabled", "disabled");
        } else {
            // Throws an error if the value submitted wasn't a valid key
            alert("Sorry, that wasn't a valid API key. Please submit a new value.");
            throw new Error(error?.message || "Not a valid API key.");
        }
}


// Provides instructions to the chatbot and checks if the apiKey is valid
async function initializeChatbot(apiKey){
    let instructions = `You are meant to act as a helper to any questions you recieve through future prompts. You should answer questions if the user has questions, and if not, respond to them with polite conversationalism`;

    // Has a specific usecase of LeetCode
    if (window.location.href.indexOf("leetcode.com/problems/") != -1) {
        // Get the written code from the document
        let writtenCode = document.getElementsByClassName("view-lines monaco-mouse-cursor-text");
        writtenCode = writtenCode[0].textContent;

        // Get the title of the problem
        const url = window.location.href;
        const start = url.indexOf("problems/") + "problems/".length;
        const end = url.indexOf("/", start + 1);
        let title = url.substring(start, end);

        // Retrieve the important text from the document
        let text = document.getElementsByClassName("elfjS");
        let prompt = text[0].textContent;

        let hintOne = text[1].textContent;
        let hintTwo = text[2].textContent;
        let hintThree = text[3].textContent;

        instructions = `Your job is to help this student with any questions they have about the
                        problem ${title}. If they ask questions not related to the problem, please
                        direct their attention back to it. The prompt is as follows: ${prompt}.
                        Do not provide a complete solution. Instead attempt to slowly work
                        the student through the problem. Here are three provided hints. Hint 1: ${hintOne}.
                        Hint Two: ${hintTwo}. Hint Three: ${hintThree}. Gradually increase the
                        helpfulness of the hints you send.`
    }

    // Fetch the content from Gemini
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: instructions }] }],
            generationConfig: { temperature: 0.2 },

        }),
    }
    );

    // Checks if Gemini returned a valid response
    if (!res.ok) {
        const { error } = await res.json();
        alert("Not a valid key");
        throw new Error(error?.message || "Request failed");
        return false;
    }

    return true;
}


