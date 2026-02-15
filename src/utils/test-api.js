import { GoogleGenerativeAI } from "@google/generative-ai";

// This is a standalone test script to verify key and model access independently of the React app.
async function testGemini(apiKey, modelName) {
    if (!apiKey) {
        console.error("Please provide an API Key.");
        return;
    }

    console.log(`Testing with Model: ${modelName}`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    try {
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// You can run this in the browser console if you expose it, or just use it as reference for logic.
