import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: Request, res: Response) => {
    const { prompt, tag, userId } = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response("Prompt creation successful!", { status: 201 });
    } catch (error: any) {
        return new Response("Prompt creation failed!", { status: 500 });
    }
}  