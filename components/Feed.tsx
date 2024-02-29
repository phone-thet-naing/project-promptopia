"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@app/create-prompt/page";
import Search from "./Searh";
import { useSession } from "next-auth/react";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState<string>("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { data: session } = useSession();

    const handleTagClick = (tag: string) => {
        setKeyword(tag)
    }

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            console.log("Data fetching in Feed.tsx: ", data);
            setPosts(data);
        } catch (error: any) {
            console.log("Error in data fetching Feed.tsx: ", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("fetching posts in Feed component")
        fetchPosts();
    }, []);

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!isLoading && !error && session) return (
        <>
            <Search keyword={keyword} setKeyword={(arg0) => setKeyword(arg0)} />

            {posts.length === 0 && <p className="mt-10 font-satoshi text-xl">No posts to display</p>}

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