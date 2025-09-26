import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL = "gemini-1.5-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Gagal, coba lagi.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
