// @ts-ignore Deno serve shim for Supabase
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { base64Image } = await req.json();

    const OPENROUTER_API_KEY = "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"; // Your key

    const prompt = `
You are Tailbot, an expert AI in animal image classification.
Given a base64 encoded photo of an animal, identify if it's a **cat**, **dog**, or **bird**.
If not sure, respond with "unknown".

Use only one word: cat, dog, bird, or unknown.
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
          { role: "user", content: `Here is the base64 image: ${base64Image}` }
        ]
      })
    });

    const data = await response.json();
    const prediction = data.choices?.[0]?.message?.content?.toLowerCase() || "unknown";

    const validAnimals = ["cat", "dog", "bird"];
    const animal = validAnimals.includes(prediction) ? prediction : "unknown";

    return new Response(
      JSON.stringify({ animal }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in predict-animal function:", error);
    return new Response(
      JSON.stringify({ animal: "unknown", error: "Prediction failed." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
