import { Post } from "@app/create-prompt/page";
import Link from "next/link";
import { FormEvent } from "react";

interface Props {
    type: string
    post: Post;
    handleSubmit: (e: FormEvent) => void;
    setPost: (post: Post) => void;
    submitting: boolean;
}

const Form = ({ type, post, handleSubmit, setPost, submitting }: Props) => {
    return (
        <form className="mt-10 mb-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={(e) => {
            handleSubmit(e)
        }}>
            <label>
                <span className='font-satoshi font-semibold text-base'>
                    {type} Your AI Prompt
                </span>

                <textarea className='form_textarea' placeholder="Write your prompt here..." value={post?.prompt} onChange={(e) => setPost({ ...post, prompt: e.target.value })} required>
                </textarea>
            </label>

            <label>
                <span className='font-satoshi font-semibold text-base'>
                    Tag <span className='font-normal'>(#softwaredevelopment, #web, #idea)</span>
                </span>

                <input className='form_input' placeholder='#tag' value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value })} required>
                </input>
            </label>

            <div className="flex-end gap-3 mx-3">
                <Link href='/' className='outline_btn'>
                    Cancel
                </Link>

                <button type="submit" className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white' disabled={submitting}>
                    {submitting ? `${type}...` : type}
                </button>
            </div>
        </form>
    )
}

export default Form;