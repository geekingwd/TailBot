import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LLAMA_API_URL = Deno.env.get('LLAMA_API_URL');
const HUGGINGFACE_TOKEN = Deno.env.get('HUGGINGFACE_TOKEN');

const BLEEDING_RESPONSE = `Here's what you need to do immediately:

1. Apply direct pressure to the wound with a clean cloth or gauze for 10-15 minutes. If the bleeding soaks through, add more material while maintaining pressure.

2. Elevate the wound if the limb is not broken.

3. You should transport your dog to a veterinarian immediately, especially if the bleeding doesn't stop. Let me help you find nearby veterinary clinics.

Click the location icon below to see veterinary clinics in your area. Stay calm - you're doing great handling this emergency! 🐾`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    // Check for bleeding-related keywords
    const bleedingKeywords = ['bleeding', 'blood', 'wound'];
    const isBleedingEmergency = bleedingKeywords.some(keyword => 
      message.toLowerCase().includes(keyword) && 
      message.toLowerCase().includes('dog')
    );

    if (isBleedingEmergency) {
      return new Response(
        JSON.stringify({ response: BLEEDING_RESPONSE }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    if (!LLAMA_API_URL || !HUGGINGFACE_TOKEN) {
      return new Response(
        JSON.stringify({
          response: "I'm here to help with your pet emergency! While our system is being updated, please describe your situation, and I'll guide you through the immediate steps you can take. Remember, for serious emergencies, don't hesitate to contact your nearest veterinary clinic. 🐾"
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    }

    const response = await fetch(LLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: [null],
        query: `${systemPrompt}\n\nUser: ${message}\nTailBot:`,
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.response || data.output || data.generated_text;

    // Ensure the response ends with a paw emoji if it doesn't already have one
    const formattedReply = reply.trim().endsWith('🐾') ? reply : `${reply} 🐾`;

    return new Response(
      JSON.stringify({ response: formattedReply }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        response: "I understand this is concerning, but I'm having a brief technical issue. While I work on fixing this, please tell me more about your pet's condition, and I'll do my best to help. For immediate emergencies, please contact your nearest veterinary clinic. 🐾",
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  }
});