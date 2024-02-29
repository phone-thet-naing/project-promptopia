import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { Post } from "@app/create-prompt/page";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface Props {
    request: Request
    params: Params
}

export const GET = async (request: Request, { params }: Params) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response("Prompt not found", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response(
            "Failed to fetch all prompts", 
            { status: 500, statusText: "Failed to fetch all prompts" 
        })
    }
}

export const PATCH = async (request: Request, { params }: Params) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found!", { status: 404 })
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error: any) {
        return new Response("Failed to fetch all prompts", { status: 500, statusText: error.message})
    }
}

export const DELETE = async (request: Request, { params }: Params) => {
    try {
        await connectToDB();

        await Prompt.deleteOne({ id: params._id })

        return new Response("Prompt was successfully deleted!", { status: 200, statusText: params._id })
    } catch (error: any) {
        return new Response("Failed to delete prompt! " + error, { status: 500, statusText: error.message })
    }
}

