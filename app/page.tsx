"use client";
import PromptCard from "@components/PromptCard";
import Feed from "@components/Feed";
import Search from "@components/Searh";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center ">
        Discover & Share
        <br className="max:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">Promptopia is an open-source AI prompting tool for the modern world to discover, create and share creative prompts</p>

      {/* <Search /> */}
      {session && <Feed />}
    </section>
  )
}

export default Home