import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET POST
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (err) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}