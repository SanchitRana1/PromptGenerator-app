import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET=async(req,res)=>{
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts),{status:201})
    } catch (error) {
        console.log(error);
        return new Response(error,{status:501})
    }
}