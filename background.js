// Add a listener to the "chrome.tabs.onUpdated" event, which detects changes in browser tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab's URL is defined and includes "mail.google.com"
  if (tab.url && tab.url.includes("mail.google.com")) {
    // Split the tab's URL to extract query parameters
    const queryParameters = tab.url.split("?")[1];

    // Create a URLSearchParams object to handle query parameters
    const urlParameters = new URLSearchParams(queryParameters);

    // Send a message to the content script in the Gmail tab with the type "NEW" and compose data
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      compose: urlParameters.get("compose"),
    });
  }
});
