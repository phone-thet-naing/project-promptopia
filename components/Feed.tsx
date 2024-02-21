"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@app/create-prompt/page";
import Search from "./Searh";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState<string>("");

    const handleTagClick = (tag: string) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            await fetch("/api/prompt")
                .then((res) => res.json())
                .then((data) => setPosts(data))
                .catch((err) => new Error("Error occured in fetchPosts: ", err));
        }

        fetchPosts();
    }, []);

    return (
        <>
            <Search keyword={keyword} setKeyword={(arg0) => setKeyword(arg0)} />

            <div className="flex md:flex-col flex-wrap lg:flex-row gap-4 mt-10 mb-20">
                {posts.filter((item: Post) => keyword.toLocaleLowerCase() === "" ? item : (item.tag?.toLocaleLowerCase().includes(keyword)) || (item.prompt?.toLocaleLowerCase().includes(keyword)))
                  .map((post: Post, index) => (
                    <PromptCard 
                        key={index} 
                        post={post} 
                        handleDelete={() => null}
                        handleEdit={() => null}
                        handleTagClick={(tag) => handleTagClick(tag)} 
                    />
                ))}
            </div>
        </>
    );
}

export default Feed;