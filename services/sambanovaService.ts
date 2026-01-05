
import { UserProfile, Prediction, SimulationResult } from "../types";

const SAMBANOVA_API_KEY = process.env.SAMBANOVA_API_KEY || 'fc3cafff-21b3-4ab8-a6b2-980be9e21639';
const SAMBANOVA_BASE_URL = 'https://api.sambanova.ai/v1';

// Helper function to make API calls to SambaNova
async function callSambaNovaAPI(
  prompt: string, 
  model: string = 'Meta-Llama-3.3-70B-Instruct',
  temperature: number = 0.7,
  maxTokens: number = 2000
): Promise<string> {
  const response = await fetch(`${SAMBANOVA_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SAMBANOVA_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a wise, modern Vedic Astrologer for Astroveda, an India-first platform. Always respond with valid JSON only, no additional text or markdown formatting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SambaNova API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

export const generateLifePrediction = async (profile: UserProfile, plan: 'basic' | 'premium' = 'basic'): Promise<Prediction> => {
  const isPremium = plan === 'premium';
  
  const basePrompt = `
    Act as a wise, modern Vedic Astrologer for Astroveda, an India-first platform.
    User Name: ${profile.name}
    Birth Context: ${profile.astroIdentity?.lagna} Lagna, ${profile.astroIdentity?.rashi} Rashi, ${profile.astroIdentity?.nakshatra} Nakshatra.
    Current Dasha: ${profile.astroIdentity?.dasha}
    Current Life Focus: ${profile.context}
    
    CRITICAL UX FRAMEWORK: Follow the order: Conclusion → Reassurance → Reason → Action → Timing.
    
    1. Headline: A direct, 5-second conclusion (e.g., "Your Career is entering a favourable phase").
    2. Reassurance: Validate their emotional state and provide comfort.
    3. Interpretation: "What this means for you" in simple, non-jargon terms.
    4. Astrology Logic: Simplify the "Why" (Lagna, Rashi, Nakshatra impact).
    5. Action: Specific "Do more of this" vs "Avoid this for now".
    6. Timing: Specific timing guidance.
    7. One Small Step: A micro-action they can take this week.

    Rules: No fear-based language. No jargon without explanation. Focus on clarity.
  `;

  const premiumInstructions = isPremium ? `
    
    PREMIUM ANALYSIS MODE: Provide highly accurate and detailed predictions. Include:
    - Deeper planetary analysis considering current transits
    - More specific timing windows (dates/periods)
    - Advanced astrological insights about planetary aspects
    - Detailed explanation of how multiple planetary influences interact
    - More comprehensive action items (at least 4-5 items in each category)
    - Precise timing guidance with specific months/weeks when possible
  ` : `
    
    BASIC ANALYSIS MODE: Provide essential guidance with clear, actionable insights.
  `;

  const prompt = basePrompt + premiumInstructions + `
    
    Respond with a JSON object containing these exact fields:
    {
      "headline": "...",
      "reassurance": "...",
      "interpretation": "...",
      "astrologyLogic": "...",
      "actionsDo": ["...", "..."],
      "actionsAvoid": ["...", "..."],
      "timing": "...",
      "oneSmallStep": "..."
    }
  `;

  // Use higher temperature and more tokens for premium for more detailed responses
  const model = isPremium ? 'Meta-Llama-3.3-70B-Instruct' : 'Meta-Llama-3.3-70B-Instruct';
  const temperature = isPremium ? 0.8 : 0.7;
  const maxTokens = isPremium ? 3000 : 2000;

  const responseText = await callSambaNovaAPI(prompt, model, temperature, maxTokens);
  
  // Parse JSON response, handling potential markdown code blocks
  let jsonText = responseText.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '');
  }
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse JSON response:', jsonText);
    throw new Error('Invalid JSON response from SambaNova API');
  }
};

export const simulateDecision = async (profile: UserProfile, decisionText: string): Promise<SimulationResult> => {
  const prompt = `
    Vedic Decision Simulator for Astroveda.
    User Profile: ${profile.astroIdentity?.rashi} Rashi in ${profile.astroIdentity?.dasha} Dasha.
    Decision Context: ${decisionText}
    
    Compare two paths: 
    Path A: Proactive change now.
    Path B: Strategic patience/waiting.
    
    Analyze risks and growth based on the current planetary phase. Use clear, reassuring language.
    
    Respond with a JSON object containing these exact fields:
    {
      "optionA": "...",
      "optionB": "...",
      "riskFactor": <number between 0 and 100>,
      "growthFactor": <number between 0 and 100>,
      "explanation": "..."
    }
  `;

  const responseText = await callSambaNovaAPI(prompt);
  
  // Parse JSON response, handling potential markdown code blocks
  let jsonText = responseText.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '');
  }
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Failed to parse JSON response:', jsonText);
    throw new Error('Invalid JSON response from SambaNova API');
  }
};

