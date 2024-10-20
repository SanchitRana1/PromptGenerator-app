import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {
    const {userId, prompt,tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        console.log(error);   
        return new Response('Failed to create the prompt',{status:500})
    }

};
