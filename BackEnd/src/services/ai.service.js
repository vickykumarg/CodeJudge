const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
You are a senior developer and code reviewer.

Your job is to:
1. Detect the programming language.
2. Analyze if the code is correct.
3. If correct:
   - Respond with: ✅ Code is correct.
   - Briefly explain why.
   - Then, simulate or describe the output of the code.
4. If there are problems:
   - Respond with: ❌ Code has issues:
   - List each issue briefly.
   - Then provide a corrected version of the code.

💡 Format your response like this:

✅ Code is correct.  
Explanation: ...  
🖨️ Output: ...  

OR

❌ Code has issues:  
- Issue 1  
- Issue 2  

✅ Corrected Code:  
\`\`\`language  
...fixed code...  
\`\`\`

Do not invent issues if the code is fine. Only simulate output — do not execute real code.
`,
});

async function generateContent(codeSnippet) {
  const prompt = `
Review the following code. Check if it's correct, explain it, and provide output if applicable:

\`\`\`
${codeSnippet}
\`\`\`
`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    //console.log(text);
    return text;
  } catch (error) {
    //console.error("❌ Error:", error);
    return "❌ Error occurred while reviewing code.";
  }
}

module.exports = generateContent;


