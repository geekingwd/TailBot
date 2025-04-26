// @ts-ignore Deno serve shim for Supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { injury, animal } = await req.json();

    const OPENROUTER_API_KEY = "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"; // Your key

    const prompt = `
You are Tailbot, an AI veterinary assistant. Based on the provided injury and animal type, give **simple first aid steps**.
Do not mention advanced treatments or medications. Keep instructions brief and step-by-step.
If the input is in Hindi, respond in Hindi. Otherwise, respond in English.

Animal: ${animal}
Injury: ${injury}
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
          { role: "user", content: injury }
        ]
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        firstAidTip: data.choices?.[0]?.message?.content || "No first aid tip available."
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in first-aid-help function:", error);
    return new Response(
      JSON.stringify({ error: "Internal error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
