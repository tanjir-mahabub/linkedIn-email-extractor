
# LinkedIn Email Extractor

This project is a full-stack application that extracts work email addresses from LinkedIn profiles using a Chrome extension and processes the data with a backend API.

---

## Features
- Extract work email addresses from LinkedIn profiles.
- Display the extracted email in a user-friendly Chrome extension popup.
- Backend API processes the email and returns:
  - Acknowledge the email.
  - Optionally, generate a personalized LinkedIn connection request using OpenAI GPT.

---

## Frontend: Chrome Extension

### Setup
1. Navigate to the `chrome-extension/` folder.
2. Load the extension in Chrome:
   - Open `chrome://extensions` in your browser.
   - Enable **Developer Mode**.
   - Click **Load unpacked** and select the `chrome-extension/` folder.

### Usage
1. Navigate to a LinkedIn profile page.
2. Click the Chrome extension icon.
3. The extracted email will appear in the popup interface.

---

## Backend: API Server

### Setup
1. Navigate to the `backend/` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder with the following:
   ```env
   PORT=4000
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### **POST /api/email**

#### **Request Body**:
```json
{ "email": "user@example.com" }
```

#### **Response (Without OpenAI)**:
```json
{ "message": "Message received: user@example.com" }
```

#### **Response (With OpenAI)**:
```json
{
  "message": "Message received: user@example.com",
  "connection_request": "Hi, I came across your LinkedIn profile and wanted to connect to discuss potential opportunities."
}
```

#### **Error Handling**:
- Invalid or missing email:
  ```json
  { "error": "Invalid or missing email" }
  ```
- OpenAI API error or fallback:
  ```json
  {
    "message": "Message received: user@example.com",
    "connection_request": "Hi, I found your email (user@example.com) and wanted to reach out for potential collaboration. Let's connect!",
    "error": "OpenAI API failed. Returning a default connection request message."
  }
  ```

---

## Project Structure
```
project/
├── chrome-extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── content.js
│   ├── styles.css
│   ├── icons/
│   │   ├── icon-16.png
│   │   ├── icon-48.png
│   │   ├── icon-128.png
├── backend/
│   ├── app.js
│   ├── routes/email.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
├── README.md
```

---

### Notes
- The Chrome extension extracts work emails from LinkedIn profiles and communicates with the backend.
- The backend API processes the extracted email and returns a structured response or a generated LinkedIn connection request.
- Ensure both frontend and backend are set up properly before testing the full workflow.
- OpenAI integration requires a valid API key.

---

