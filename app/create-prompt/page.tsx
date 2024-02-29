"use client";

import { useState, FormEvent, useEffect } from "react";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

const CreatePrompt = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [post, setPost] = useState<Post>({ prompt: "", tag: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!session || !session.user) {
        throw new Error("Session user info missing");
      }

      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }

      if (response.status !== 200) {
        throw new Error("Prompt creation failed!");
      }
    } catch (error: any) {
    throw new Error(error.message);
    } finally {
      setSubmitting(false);
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
        <span className="blue_gradient">Create Post</span>
      </h1>

      <p className="desc subpixel-antialiased text-left">
        Create and share amazing prompts with the world.
      </p>

      <Form
        type="Create"
        post={post}
        handleSubmit={handleSubmit}
        setPost={setPost}
        submitting={submitting}
      />
    </section>
  );
};

export default CreatePrompt;
