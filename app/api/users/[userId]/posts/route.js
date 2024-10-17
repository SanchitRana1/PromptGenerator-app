import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET=async(req,{params})=>{
    const id = params?.userId
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator:id}).populate('creator')
        return new Response(JSON.stringify(prompts),{status:201})
    } catch (error) {
        console.log(error);
        return new Response(error,{status:501})
    }
}