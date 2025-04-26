// @ts-ignore Deno serve shim for Supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { symptoms } = await req.json();

    const OPENROUTER_API_KEY = "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"; // Your key

    const prompt = `
You are Tailbot, a helpful veterinary assistant for animal lovers and rescuers. 
Based on the following symptoms, kindly predict possible diseases for dogs, cats, or birds only.
If the input is in Hindi, respond in Hindi. If in English, respond in English. 
Do NOT include medications or human-specific conditions.
Respond in a clean bullet list. Only list possible diseases.

Symptoms: ${symptoms}
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/claude-3-haiku",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: symptoms }
        ]
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        prediction: data.choices?.[0]?.message?.content || "No prediction available."
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in prediction function:", error);
    return new Response(
      JSON.stringify({ error: "Internal error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
