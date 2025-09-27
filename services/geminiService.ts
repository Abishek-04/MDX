
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getPrompt = (plainText: string): string => `
You are an expert technical writer and MDX formatter for a documentation framework called "Zudoku".
Your sole purpose is to convert plain text content into clean, valid, and well-structured MDX format.
Adhere strictly to the following rules:

1.  **Headings**: Convert lines starting with one or more '#' to MDX headings.
2.  **Emphasis**: Use '**bold**' for bold and '*italic*' for italics.
3.  **Lists**: Preserve ordered (1., 2.) and unordered (*, -) lists.
4.  **Code**: Convert inline code using backticks (\`code\`) and code blocks using triple backticks (\`\`\`language\\n...\\n\`\`\`). If a language is not specified, default to 'bash'.
5.  **Links**: Convert standard markdown links like [text](url).
6.  **Callouts**: This is the most important rule. Zudoku uses a special syntax for callouts. Convert hint-based lines into the proper MDX callout block. The format is ':::type\\nContent\\n:::'.
    -   If a line starts with \`NOTE:\`, \`INFO:\`, \`TIP:\`, \`SUCCESS:\`, \`WARNING:\`, or \`DANGER:\`, convert it.
    -   The type must be lowercase (e.g., 'note', 'tip', 'warning').
    -   The rest of the line becomes the content inside the callout block.

**Examples:**

**Input:**
NOTE: This is an important piece of information.

**Output:**
:::note
This is an important piece of information.
:::

---

**Input:**
TIP: Use the keyboard shortcut to save time.

**Output:**
:::tip
Use the keyboard shortcut to save time.
:::

---

**Input:**
WARNING: Be careful when modifying production data.

**Output:**
:::warning
Be careful when modifying production data.
:::

**Your Task:**
Convert the following plain text into Zudoku-flavored MDX. Do not add any extra text, commentary, or explanation. Only output the raw, converted MDX.

**Plain Text to Convert:**
---
${plainText}
---
`;


export const convertToMdx = async (plainText: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: getPrompt(plainText),
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};
