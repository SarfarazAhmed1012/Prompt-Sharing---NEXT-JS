import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET POST
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 })
        }
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (err) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}

// UPDATED POST

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    try {
        await connectToDB()
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 })
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    }
    catch (err) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE POST

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted", { status: 200 })
    }
    catch (err) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}