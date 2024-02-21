import { Post } from "@app/create-prompt/page";
import PromptCard from "./PromptCard";
import { useMemo } from "react"; 

interface Props {
    name: string;
    desc: string;
    data: Post[];
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
    const visiblePosts = useMemo(() => data, [data]);

    

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>

            <p className="desc text-left">{desc}</p>

            <div className="mt-10 prompt_layout">
                {data.map((post: Post, index) => (
                    <PromptCard 
                        key={index} 
                        post={post} 
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                        handleTagClick={() => null}
                    />
                ))}
            </div>
        </section>
    )
}

export default Profile;