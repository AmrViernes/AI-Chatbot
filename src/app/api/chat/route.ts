import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages: [{
            role: 'system',
            content: prompt,
        }],
        async onFinish() {

        },
    });

    return result.toTextStreamResponse();
}
