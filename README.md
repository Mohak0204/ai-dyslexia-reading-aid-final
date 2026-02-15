# AI Reading Aid for Dyslexia 🧠📖

A modern, accessible, and AI-powered web application designed to help people with dyslexia read and understand text more easily.

## ✨ Features

*   **AI Simplification**: Simplify complex text using **Google Gemini** or **Groq (Llama 3)**.
*   **Dyslexia-Friendly Modes**:
    *   **Bionic Reading**: Highlights the first half of words to guide the eye.
    *   **OpenDyslexic Font**: A specialized font to reduce reading errors.
    *   **Text-to-Speech (TTS)**: Reads text aloud with sentence highlighting.
*   **Customizable UI**:
    *   Adjustable Font Size, Line Spacing, and Letter Spacing.
    *   **Themes**: Light, Dark, and Sepia (reduces eye strain).
*   **OCR (Optical Character Recognition)**: Upload images of text (books/papers) to convert them to digital text.
*   **Reading Insights**: Tracks estimated reading time and word count.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS v4
*   **AI**: Google Generative AI SDK, Groq API (REST)
*   **OCR**: Tesseract.js (In-browser)
*   **Icons**: Lucide React

## 🚀 How to Run Locally

Follow these steps to run the project on your machine:

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/your-username/dyslexia-reading-aid.git
    cd dyslexia-reading-aid
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    *   Open your browser at `http://localhost:5173` (or the link shown in the terminal).

## 🔑 key Setup

To use the AI features, you need a free API key:

1.  **Google Gemini** (Recommended): [Get Key](https://aistudio.google.com/app/apikey)
2.  **Groq (Llama 3)** (Alternative): [Get Key](https://console.groq.com/keys)

Enter the key in the top-right input box of the application.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
# Preview the build locally
npm run preview
```
