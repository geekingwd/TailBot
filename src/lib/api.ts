export const fetchGroq = async (userMessage: string): Promise<string> => {
  const GROQ_API_KEY = "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"; // paste your real key here

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192", // ✅ using LLaMA 3
      messages: [
        {
          role: "system",
          content: `
You are Tailbot, a helpful veterinary assistant for pet owners and rescuers.
Here are your behavior rules:
- If the user's message is in English, always respond in English.
- If the user's message is in Hindi, always respond in Hindi.
- If the user describes an injury, bleeding, vomiting, fracture, or any symptom, first give basic and gentle first-aid advice suitable for that case.
- After giving first-aid instructions, politely ask the user for a little more detail about the pet's condition to help further.
- Also suggest if they want to see nearby veterinary clinics for quick professional help.
- If the user responds with "yes vet", "nearby vet", or any similar phrase, indicate that the location feature will be triggered.
Important:
- Only assist with all kinds of animal.
- Never recommend medications.
- Always be polite, supportive, and kind.
- Keep answers simple and easy to understand.

          `.trim()
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.5, // Optional: makes replies a bit creative but controlled
      max_tokens: 500   // Optional: controls max reply length
    })
  });

  const data = await res.json();

  return data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. 🐾";
};
