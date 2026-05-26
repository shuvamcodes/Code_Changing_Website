const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

app.post('/api/convert', async (req, res) => {
    const { code, sourceLang, targetLang, mode } = req.body;

    if (!code) {
        return res.status(400).json({ result: "// Error: Please provide some input code." });
    }
    if (!HF_TOKEN) {
        return res.status(500).json({ result: "// Backend Error: HF_TOKEN missing in .env" });
    }

    try {
        const url = "https://router.huggingface.co/v1/chat/completions";
        
        let systemInstruction = "";
        let userPrompt = "";

        if (mode === 'leetcode') {
            // Refactor script within the SAME language into a LeetCode pattern
            systemInstruction = `You are an expert competitive programmer. Take the raw script provided in ${sourceLang} and refactor it into an optimized, class-based LeetCode solution template. Keep the language strictly as ${sourceLang}. Do not translate it to any other language.`;
            
            userPrompt = `Task: Refactor this basic ${sourceLang} script into a professional LeetCode template.
Rules:
1. Keep the output code strictly in ${sourceLang}.
2. Wrap the algorithm inside a proper 'class Solution:'.
3. Use optimized data structures and provide proper type hints.
4. Replace loose prints/globals with efficient function inputs and 'return' outputs.
5. Output ONLY raw executable code. Do not include markdown backticks or markdown formatting fences. No explanations.

Code to refactor:
${code}`;
        } else {
            // Standard Mode: Translate from one language to another
            systemInstruction = `You are a code conversion utility. Convert the code from ${sourceLang} to ${targetLang}. Preserve all operational logic precisely.`;
            
            userPrompt = `Task: Convert this code from ${sourceLang} to ${targetLang}. 
Rules: Output ONLY executable code. Do not include markdown backticks, markdown formatting fences, or conversational text.

Code:
${code}`;
        }

        const response = await axios.post(
            url,
            {
                model: "Qwen/Qwen2.5-Coder-7B-Instruct",
                messages: [
                    { "role": "system", "content": systemInstruction },
                    { "role": "user", "content": userPrompt }
                ],
                max_tokens: 1200,
                temperature: 0.1
            },
            {
                headers: { 
                    "Authorization": `Bearer ${HF_TOKEN.trim()}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const rawText = response.data?.choices[0]?.message?.content || "";
        
        // Clean out any leftover markdown markers safely
        const cleanedCode = rawText.replace(/```[a-z]*\n/gi, "").replace(/```/g, "").trim();

        res.json({ result: cleanedCode });

    } catch (error) {
        console.error(error.response?.data || error.message);
        const feedback = error.response?.data?.error?.message || "Inference endpoint failed to authorize request.";
        res.status(500).json({ result: `// Engine Error: ${feedback}` });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 CodeMorph Engine active on port ${PORT}`));