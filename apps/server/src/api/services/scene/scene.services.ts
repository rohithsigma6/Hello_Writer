import { Document, CharacterObject } from "./type";
import axios from 'axios';

function titleSummarygeneratePrompt(script : string , flag:string, characters:CharacterObject[]) {
    const formattedCharacters = JSON.stringify(characters.map((char) => char.name));
    const prompt = flag=='title' ?
    `You are a creative assistant specializing in generating concise and engaging titles for scripts. Your task is to analyze the content of a given script and generate a short, compelling title that captures the essence of the script.  

    ### Instructions:  
    1. Read the provided script carefully.  
    2. Incorporate the provided characters into the title if relevant.  
    3. Identify the central theme, key characters, and the primary plot or message.  
    4. Create a short title (3–6 words) that is engaging, relevant, and memorable.  
    5. Avoid long sentences, unnecessary words, or vague titles.  

    ### Characters:  
    ${formattedCharacters}  

    ### Example:  
    #### Input Script:  
    "A young detective, struggling with her past, uncovers a conspiracy involving her own family while solving a mysterious murder in a small coastal town."  

    #### Characters:  
    ["Alister Cock", "Walt"]  

    #### Output Title:  
    "Shadows of the Coast"  

    ---  

    #### Input Script:  
    ${script}  

    #### Output Title:  ` 
    :
    `
    You are a summarization assistant specializing in creating concise summaries for scripts. Your task is to analyze the given script, incorporate the provided characters, and produce a summary that is exactly 50 words or very close to it, capturing the essence of the story.

    ### Instructions:
    1. Read the script carefully.
    2. Incorporate the given characters into the summary where relevant.
    3. Identify the central plot, main characters, key events, and themes.
    4. Write a summary that is engaging, clear, and no more than 50 words long.
    5. Avoid unnecessary details while ensuring the summary captures the essence of the story.

    ### Characters:
    ${formattedCharacters}

    ### Example:
    #### Input Script:
    "A young detective, struggling with her past, uncovers a conspiracy involving her own family while solving a mysterious murder in a small coastal town."

    #### Characters:
    ["Alister Cock", "Walt"]

    #### Output Summary:
    "Alister Cock returns to her hometown to solve a murder. As she investigates, she discovers a conspiracy linked to her family’s dark secrets. With help from Walt, she confronts her past while unraveling a mystery that could change her life forever."

    ---

    #### Input Script:
    ${script}

    #### Output Summary (50 to 60 words):
    `
    return prompt
}
export async function generateTitleSummaryService (text:string,flag:string,characters:CharacterObject[]){
    const prompt = titleSummarygeneratePrompt(text,flag,characters)
    const openAiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-4',
            messages: [
                {
                    role: "system",
                    content: flag=='title' ? `You are a title generation assistant.` : `You are a summarization generation assistant`,
                },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            // functions: [
            //     {
            //         name: 'assignTags',
            //         description: 'Assign tags based on the words and tags provided in the user prompt',
            //         parameters: {
            //             type: 'object',
            //             properties: {
            //                 response: {
            //                     type: "text",
            //                     items: {
            //                         type: 'object',
            //                         properties: {
            //                             text: { type: "string" },
            //                             category: { type: "string" },   
            //                         },
            //                         required: ['text', 'category'],
            //                         additionalProperties: false,
            //                     },
            //                 }
            //             },
            //             required: ["final"]
            //         },
            //     },
            // ],
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    )
    console.log("openAiResponse",openAiResponse.data.choices[0].message);
    const response = openAiResponse.data.choices[0].message.content
    console.log("Response =>",response);
    return response
}
export const processContent = async (inputJson: Document): Promise<string> => {
    return inputJson.content
        .map((node) => {
            if (node.content) {
                return node.content
                    .map((contentItem) => contentItem.text || "")
                    .join("");
            }
            return "";
        })
        .filter(Boolean) 
        .join("\n");
}