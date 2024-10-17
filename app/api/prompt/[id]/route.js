import Prompt from "@models/prompt";
import { connectToDB } from "@utils/db";

export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) return new Response("Prompt not found!", { status: 404 });
		return new Response(JSON.stringify(prompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response(error, { status: 501 });
	}
};

export const PATCH = async (req, { params }) => {
	const {prompt, tag} = await req.json();
    try {
		await connectToDB(); 
		let existingPrompt = await Prompt.findById(params.id)
        console.log(existingPrompt);
		
        if (!existingPrompt) return new Response("Prompt not found!", { status: 404 });
       
        existingPrompt.prompt=prompt
        existingPrompt.tag=tag
       
        await existingPrompt.save()
		return new Response(JSON.stringify(existingPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response(error, { status: 501 });
	}
};

export const DELETE = async (req, { params }) => {
    try {
		await connectToDB(); 
		await Prompt.findByIdAndDelete(params.id)
		return new Response('Prompt deleted successfully', { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response(error, { status: 501 });
	}
};