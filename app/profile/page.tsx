"use client";

import Profile from "@components/Profile";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Post } from "@app/create-prompt/page";
import { useRouter } from "next/navigation";
import DialogBox from "@components/DilogBox";
import SuccessDialog from "@components/SuccessDialog";

export interface UserInterface {
    id?: string | null;
    name?: string | null
    email?: string | null
    image?: string | null
}

const MyProfile = () => {
    const { data: session, status } = useSession<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)
    const [error, setError] = useState<string>("")
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)

    const handleEdit = async (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post?")

        if (hasConfirmed) {
            setIsDeleting(true)
            try {
                if (!session || !session.user) {
                    throw new Error("Session Info Missing");
                }
                const response = await fetch(`api/prompt/${post?._id?.toString()}`, {
                    method: "DELETE"
                });
                
                if (response.ok) {
                    setShowSuccessAlert(true)
                }
    
            } catch (error: any) {
                setError(error.message)
                throw new Error(error);
            } finally {
                setIsDeleting(false);
            }
        }

        // setIsDeleting(true);
        // console.log("post to be deleted: ", post)
        // setPostToDelete(post);
    }

    const handleConfirmDelete = async () => {
        
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/users/${session?.user?.id}/posts`)
            const data: Post[] = await response.json()

            setPosts(data)
        } catch (error: any) {
            setError(error.message)
            throw new Error(error)
        }
    }

    useEffect(() => {
        console.log("session status: ", status)
        if (session && session.user) {
            fetchPosts();
        }
    }, [status, isDeleting]);

    if (status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    if (!session) {
        router.push('/')
    }

    if (error) {
        return <p style={{font: "red"}}>{error}</p>
    }

    return (
        <>
            {showSuccessAlert && <SuccessDialog handleConfirmDelete={() => setShowSuccessAlert(false)} />}
            <Profile
                name="My"
                desc="Welcome to your personalized profile"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
                handleConfirm={() => handleConfirmDelete()}
                handleCancelDelete={() => setIsDeleting(false)}
            />
        </>
    )
}

export default MyProfile;