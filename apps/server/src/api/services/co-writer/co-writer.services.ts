
async function aiPrompt (template:string){
    // var prompt
    return `Generate a logline for a story aimed at an Indian audience using this structure: '[WHO] has to [WHAT] in [WHERE] during [WHEN] because if they don't [HOW], [WHY] will happen.' Once the logline is generated, immediately break it down into its components filling the respective sections for WHO, WHAT, WHERE, WHEN, HOW, and WHY.
        - Return the response as a JSON with objects formatted like this:{
          login: Generate Logline,
          who: [WHO],
          what: [WHAT],
          where: [WHERE],
          how: [HOW],
          why: [WHY],
        }`;
    // if(template=='logline_who_what'){
    // }
    // return prompt
} 
export const generatedFromAI = async(template:string)=>{
    const prompt = await aiPrompt(template)
    console.log("Prompt => " , prompt);
    const APIRequest = {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            // content: prompt
            content: prompt
            
            //   "Generate a logline for a story aimed at an Indian audience using this structure: '[Protagonist] is trying to solve [problem] or [the stakes] will happen. [Antagonist] is trying to stop them for [these reasons].' Once the logline is generated, immediately break it down into its components filling the respective sections for Protagonist, Problem, The Stakes, Antagonist, and These Reason.",
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
        // top_p: 0.9,
        // frequency_penalty: 0.5,
        // presence_penalty: 0.5,
        
    };

    const apiKey = process.env.OPENAI_API_KEY
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(APIRequest),
    });
    const data = await response.json();
    console.log("Data =>" ,data);
    const content = data.choices[0]?.message?.content;
    return JSON.parse(content)
}