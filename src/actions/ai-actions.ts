"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateHabitReward(habitName: string, streak: number) {
  try {
    const prompt = `
      The user just completed their daily habit: "${habitName}".
      Their current streak is ${streak} days.
      Write a highly engaging, 1-2 sentence message to reward them. 
      If the streak is under 3 days, be encouraging.
      If the streak is over 7 days, be highly praising and emphasize consistency.
      If the streak is exactly 1, welcome them to the grind.
      Tone: Modern, slightly edgy, cyberpunk-productivity vibe. No emojis.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192", 
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