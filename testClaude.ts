/* eslint-disable @typescript-eslint/naming-convention */
import "dotenv/config";
import { AI_PROMPT, Client, HUMAN_PROMPT } from "./anthropic-simple-sdk";
import * as readline from "readline";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
    throw new Error("The ANTHROPIC_API_KEY environment variable must be set");
}

const client = new Client(apiKey);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    while (true) {
        const userInput = await askQuestion("Enter your question: ");
        const prompt = `${HUMAN_PROMPT} ${userInput}${AI_PROMPT}`;

        await client
            .completeStream(
                {
                    prompt,
                    stop_sequences: [HUMAN_PROMPT],
                    max_tokens_to_sample: 200,
                    model: "claude-v1.3",
                },
                {
                    onOpen: (response) => {
                        console.log("Opened stream, HTTP status code", response.statusCode);
                    },
                    onUpdate: (completion) => {
                        console.log(completion.completion);
                    },
                }
            )
            .then((completion) => {
                console.log("Finished sampling:\n", completion);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});