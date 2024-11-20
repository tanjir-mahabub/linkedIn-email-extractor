const apiBaseUrl = "http://localhost:4000/api";

document.getElementById("extract-email").addEventListener("click", async () => {
    const spinnerOverlay = document.getElementById("spinner-overlay");
    const resultContainer = document.getElementById("result-container");
    const extractedEmailElement = document.getElementById("extracted-email");
    const generatedMessageElement = document.getElementById("generated-message");

    // Show spinner and reset results
    spinnerOverlay.style.display = "flex";
    resultContainer.style.display = "none";
    extractedEmailElement.textContent = "Click \"Extract Email\" to begin.";
    generatedMessageElement.textContent = "No message generated yet.";

    try {
        // Get the active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Inject content script to extract email
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                files: ["content.js"],
            },
            async (results) => {
                if (results && results[0]?.result) {
                    const extractedEmail = results[0].result;

                    try {
                        // Send email to backend for processing
                        const response = await fetch(`${apiBaseUrl}/email`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: extractedEmail }),
                        });

                        if (!response.ok) {
                            throw new Error(`Backend returned status ${response.status}`);
                        }

                        // Parse response and update UI
                        const data = await response.json();
                        extractedEmailElement.textContent = extractedEmail;
                        generatedMessageElement.textContent = data.connection_request;
                        resultContainer.style.display = "block";
                    } catch (error) {
                        // Handle backend errors
                        console.error("Error communicating with backend:", error);
                        extractedEmailElement.textContent = "Error fetching email.";
                        generatedMessageElement.textContent = "Failed to fetch backend response.";
                        resultContainer.style.display = "block";
                    }
                } else {
                    // Handle no email found case
                    extractedEmailElement.textContent = "No email found on the page.";
                    generatedMessageElement.textContent = "No message generated.";
                    resultContainer.style.display = "block";
                }

                // Hide spinner after processing
                spinnerOverlay.style.display = "none";
            }
        );
    } catch (error) {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
        spinnerOverlay.style.display = "none";
        extractedEmailElement.textContent = "Unexpected error occurred.";
        generatedMessageElement.textContent = "Please try again.";
        resultContainer.style.display = "block";
    }
});
