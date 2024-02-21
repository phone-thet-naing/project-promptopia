"use client";
import { Post } from "@app/create-prompt/page";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { UserInterface } from "@app/profile/page";
import { usePathname } from "next/navigation";
import { DefaultSession } from "next-auth";

interface Props {
  post: Post;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
  handleTagClick: (tag: string) => void;
}

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }: Props) => {
  const [copied, setCopied] = useState<string | undefined>("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex-1 flex justify-start items-start gap-3 cursor-pointer">
        <Image
          src={
            post.creator && post.creator.image
              ? post.creator?.image
              : "https://lh3.googleusercontent.com/a/ACg8ocLfamRuGY4MQwWJzWeAf7g46SUXd01GwcBioclmfLw_Jhg=s96-c"
          }
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />

        {/* Username and Email */}
        <div className="flex flex-col">
          <h2 className="font-satoshi font-semibold text-gray-900">
            {post.creator?.username ? post.creator.username : "no_username"}
          </h2>

          <p className="font-inter text-xs text-gray-500">
            {post.creator?.email
              ? post.creator?.email
              : "defaultemail@gmail.com"}
          </p>
        </div>

        {/* <div className="w-5 h-5 p3" onClick={() => handleCopy()}> */}
        <Image
          src={
            copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          width={10}
          height={10}
          alt="copy button"
          className="copy_btn"
          onClick={handleCopy}
        />
        {/* </div> */}
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-xs blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user?.id === post.creator?._id && pathName === "/profile" && (
        <div className="flex-end gap-4 mt-5  border border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={() => handleEdit(post)}>
            Edit
          </p>

          <p className="font-inter text-sm orange_gradient cursor-pointer">
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
