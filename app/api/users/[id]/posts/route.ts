import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (req: Request, { params }: { params: Params}) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        console.log("data in profile => ", prompts);

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts: " + error, { status: 500 });
    }
}