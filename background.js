// Checks if a valid API key is already saved in memory
chrome.runtime.onInstalled.addListener(() =>{
    chrome.storage.sync.get(["geminiApiKey"], (result) => {
        if(!result.geminiApiKey){
        }
    })
})