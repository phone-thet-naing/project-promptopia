import { Post } from "@app/create-prompt/page";
import PromptCard from "./PromptCard";
import { FormEvent, useMemo } from "react"; 
import DialogBox from "./DilogBox";

interface Props {
    name: string;
    desc: string;
    data: Post[];
    handleEdit: (post: Post) => void;
    handleDelete: (post: Post) => void;
    isDeleting: boolean
    handleConfirm: () => void;
    handleCancelDelete: () => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleConfirm, handleCancelDelete, isDeleting }: Props) => {
    const myPosts = useMemo(() => data, [data]);

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>   

            <p className="desc text-left">{desc}</p>

            {/* {isDeleting && <DialogBox handleConfirm={handleConfirm} handleCancelDelete={handleCancelDelete} />} */}

            <div className="flex md:flex-col flex-wrap lg:flex-row gap-4 mt-10 mb-20">
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