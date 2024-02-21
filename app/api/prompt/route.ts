import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: Request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');
        console.log('prompts: ', prompts);

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts: " + error, { status: 500 });
    }
}