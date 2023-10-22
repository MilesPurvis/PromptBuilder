import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  //grab user input
  const params = await request.json();

  //passing it to chat gpt api
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are happy and helpful',
      },
      {
        role: 'user',
        content: params.prompt, // string that users passes,
      },
    ],
    temperature: 0,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}
