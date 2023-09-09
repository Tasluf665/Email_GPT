(() => {
  // Add a listener to the "chrome.runtime.onMessage" event, which allows communication between extensions and web pages
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    // Destructure properties from the received object
    const { type, value, compose } = obj;

    // Check if the type of the received message is "NEW"
    if (type === "NEW") {
      // Set the "currentGmail" variable to the "compose" property from the received object
      currentGmail = compose;

      // Call the "newGmailLoad" function to handle the "NEW" message
      newGmailLoad();
    }
  });

  // Define a function called "newGmailLoad"
  const newGmailLoad = () => {
    // Check if an element with the class "ai-btn" exists in the document
    const aiBtnExists = document.getElementsByClassName("ai-btn")[0];

    // If the "ai-btn" element does not exist
    if (!aiBtnExists) {
      // Create a new "p" element to represent the AI Email button
      const aiBtn = document.createElement("p");

      // Apply styling to the AI Email button
      aiBtn.style.backgroundColor = "#0b57d0";
      aiBtn.style.color = "white";
      aiBtn.style.margin = "0px";
      aiBtn.style.padding = "5px 0px";
      aiBtn.style.width = "100px";
      aiBtn.style.textAlign = "center";
      aiBtn.style.borderRadius = "10px";
      aiBtn.style.cursor = "pointer";

      // Set the text content of the AI Email button
      aiBtn.innerText = "AI Email";

      // Add the "ai-btn" class to the AI Email button
      aiBtn.className = "ai-btn ";

      // Find the container for the email subject and display it as a flex container
      const subjectContainerDiv = document.getElementsByClassName("aoD az6")[0];
      subjectContainerDiv.style.display = "flex";

      // Append the AI Email button to the subject container
      subjectContainerDiv.appendChild(aiBtn);

      // Add a click event listener to the AI Email button, invoking the "aiBtnClickHandler" function
      aiBtn.addEventListener("click", aiBtnClickHandler);
    }
  };

  // Define a click handler function called "aiBtnClickHandler"
  const aiBtnClickHandler = async () => {
    // Get the subject of the email from the "aoT" class element
    let subject = document.getElementsByClassName("aoT")[0].value;

    // Set the content of the email body to "Loading..."
    document.getElementsByClassName(
      "Am Al editable LW-avf tS-tW"
    )[0].innerText = "Loading...";

    // Define an asynchronous function called "getAi" to fetch AI-generated content
    async function getAi() {
      // Send a POST request to the OpenAI API endpoint
      let response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Replace "TOKEN" with your actual OpenAI API token for authorization
          Authorization: "TOKEN",
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: "Write an email for " + subject,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      // Parse the JSON response
      response = await response.json();

      // Extract the generated text from the response
      let data = response.choices[0].text.trim();

      // Set the content of the email body to the generated text
      document.getElementsByClassName(
        "Am Al editable LW-avf tS-tW"
      )[0].innerText = data;
    }

    // Call the "getAi" function to retrieve AI-generated content
    await getAi();
  };

  newGmailLoad();
})();
