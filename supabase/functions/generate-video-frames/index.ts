
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import Replicate from "https://esm.sh/replicate@0.25.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateFramesParams {
  prompt: string;
  numberOfFrames: number;
  style?: string;
  checkConfig?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params = await req.json() as GenerateFramesParams;
    
    // Check API configuration when requested (just testing connectivity)
    if (params.checkConfig) {
      const replicateApiKey = Deno.env.get("REPLICATE_API_KEY");
      if (!replicateApiKey) {
        return new Response(
          JSON.stringify({ error: "Replicate API key not configured" }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      return new Response(
        JSON.stringify({ status: "Configuration valid" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { prompt, numberOfFrames, style } = params;
    
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

    const replicateApiKey = Deno.env.get("REPLICATE_API_KEY");
    if (!replicateApiKey) {
      return new Response(
        JSON.stringify({ error: "API configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const replicate = new Replicate({
      auth: replicateApiKey,
    });

    const enhancedPrompt = style 
      ? `${prompt}, in ${style} style, high quality, suitable as a video frame`
      : `${prompt}, high quality, suitable as a video frame`;

    console.log(`Generating frames with prompt: ${enhancedPrompt}`);

    // Initialize array to store generated images
    const frames: string[] = [];

    // Generate requested number of frames
    for (let i = 0; i < numberOfFrames; i++) {
      try {
        console.log(`Generating frame ${i+1}/${numberOfFrames}`);
        
        const output = await replicate.run(
          "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          {
            input: {
              prompt: `${enhancedPrompt} ${i > 0 ? `, slight variation from previous frame, frame ${i+1}` : ''}`,
              width: 1024,
              height: 576,
              num_outputs: 1,
              scheduler: "K_EULER",
              num_inference_steps: 25,
              guidance_scale: 7.5,
              refine: "expert_ensemble_refiner",
              apply_watermark: false,
              high_noise_frac: 0.8,
              refine_steps: 10,
            },
          }
        );
        
        if (Array.isArray(output) && output.length > 0) {
          frames.push(output[0]);
        }
      } catch (err) {
        console.error(`Error generating frame ${i+1}:`, err);
        // Continue with other frames even if one fails
      }
    }
    
    if (frames.length === 0) {
      throw new Error("Failed to generate any valid frames");
    }
    
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
