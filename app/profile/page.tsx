"use client";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Post } from "@app/create-prompt/page";

export interface UserInterface {
    id?: string | null;
    name?: string | null
    email?: string | null
    image?: string | null
}

const MyProfile = () => {
    const { data: session, status } = useSession<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);

    const handleEdit = (post: Post) => {
        console.log(post);
    }

    const handleDelete = async () => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            let user: UserInterface | null = null;

            if (session && session.user) {
                user = session.user;
            }

            await fetch(`/api/users/${user?.id}/posts`)
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data)
                })
                .catch((err) => new Error("Error occured in fetchPosts: ", err));


        }

        if (session && session.user) {
            const user: UserInterface = session.user;
            console.log("fetch called! ", user.id);
            fetchPosts();
        }
    }, []);

    if (status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    if (!session) {
        return (
            <div>No Session Available</div>
        )
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;