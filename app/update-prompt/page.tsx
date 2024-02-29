"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { UserSession } from "@app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";

import { UserInterface } from "@app/profile/page";

export interface Post {
  _id?: string;
  prompt: string;
  tag: string;
  creator?: {
    _id: string;
    image: string;
    username: string;
    email: string;
  };
}

const EditPrompt = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const getPromptDetails = async () => {
        await fetch(`/api/prompt/${promptId}`)
            .then((res) => res.json())
            .then((data) => setPost({
                prompt: data.prompt,
                tag: data.tag
            }))
            .catch((err) => new Error(err));
    }

  useEffect(() => {
    if (promptId) {
        getPromptDetails();
    }
  }, [promptId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt ID Not Found!")
    }

    try {
      if (!session || !session.user) {
        throw new Error("Session user info missing");
      }

      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
      });

      if (response.ok) {
        router.push("/profile");
        setSubmitting(false);
      }

      if (response.status !== 200) {
        setSubmitting(false);  
        throw new Error("Prompt creation failed!");
      }
    } catch (error: any) {
      throw new Error("Error occurred in edit post: ", error.message);
    } 
  };

  if (sessionStatus === "loading") {
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
    <section className="w-full bg-grey">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Edit Post</span>
      </h1>

      <p className="desc subpixel-antialiased text-left">
        Create and share amazing prompts with the world.
      </p>

      <Form
        type="Edit"
        post={post}
        handleSubmit={handleSubmit}
        setPost={setPost}
        submitting={submitting}
      />
    </section>
  );
};

export default EditPrompt;
