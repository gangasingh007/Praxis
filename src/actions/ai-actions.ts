"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateHabitReward(habitName: string, streak: number) {
  try {
    const prompt = `
      You are a motivational micro-copy generator for a habit-tracking app.

      The user has just completed a habit: "${habitName}".
      Their current streak is ${streak} days.

      Write a single, highly engaging message (1–2 sentences max) that rewards their action and reinforces consistency.

      Rules:
      - If streak = 1: welcome them into the grind and acknowledge the first step.
      - If streak is 2–3: keep it lightly encouraging and build momentum.
      - If streak is 4–7: reinforce progress and growing discipline.
      - If streak > 7: be highly praising, emphasize identity-building and consistency.
      - Never be generic or robotic — make it feel sharp, modern, and intentional.
      - Tone: cyberpunk productivity, slightly edgy, confident, and energetic.
      - Avoid emojis, hashtags, and clichés like "keep it up" or "great job" unless reworded creatively.
      - Do not exceed 2 sentences under any circumstance.
      - End with forward-driving energy (implied momentum, not questions).

      Output only the message. No explanations.
      `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant", 
      temperature: 0.7,
      max_tokens: 100,
    });

    return {
      success: true,
      message: chatCompletion.choices[0]?.message?.content || "System updated. Good work.",
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    return { success: false, message: "Habit logged. (AI offline)" };
  }
}