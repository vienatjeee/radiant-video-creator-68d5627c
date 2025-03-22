
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateFramesParams {
  prompt: string;
  numberOfFrames: number;
  style?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, numberOfFrames, style } = await req.json() as GenerateFramesParams;
    
    if (!prompt || !numberOfFrames) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required parameters: prompt and numberOfFrames required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const openAIApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: "API configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // For this implementation, we'll generate a single image and simulate multiple frames
    // In a production environment, you'd generate multiple unique frames
    const enhancedPrompt = style 
      ? `${prompt}, in ${style} style, high quality, suitable as a video frame`
      : `${prompt}, high quality, suitable as a video frame`;

    console.log(`Generating frame with prompt: ${enhancedPrompt}`);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Error generating frames", details: errorData }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    
    // Simulate generating multiple frames by duplicating the image URL
    const frames = Array(numberOfFrames).fill(imageUrl);
    
    return new Response(
      JSON.stringify({ frames }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-video-frames function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
