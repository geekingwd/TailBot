const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export async function classifyAnimal(base64Image: string): Promise<string> {
  const response = await fetch("https://api-inference.huggingface.co/models/google/vit-base-patch16-224", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: base64Image,
    }),
  });

  const result = await response.json();
  console.log("🐾 Huggingface Result:", result);

  if (Array.isArray(result) && result.length > 0) {
    const label = result[0].label || "unknown";
    return label;
  } else {
    throw new Error("Failed to get valid prediction.");
  }
}
