"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileMenu from "@components/ProfileMenu";

interface AuthProvider {
  id: string;
  name: string;
}

const wh = 37;

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    string,
    AuthProvider
  > | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);

  useEffect(() => {
    const callProviders = async () => {
      const providers = await getProviders();

      setProviders(providers);
    };

    callProviders();
  }, []);

  console.log(session);

  return (
    <nav className="w-full flex-between mb-10 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user && session.user.image ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn" rel="prefetch">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <div className="relative">
              <Link href="/profile">
                <Image
                  src={session && session.user.image}
                  alt="profile"
                  width={wh}
                  height={wh}
                  className="rounded-full"
                />
              </Link>

              {/* {profileMenu && (
                                <ProfileMenu />
                            )} */}
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user && session.user.image ? (
          <div className="flex">
            <Image
              src={session.user.image}
              onClick={() => setProfileOpen(!profileOpen)}
              alt="profile"
              width={wh}
              height={wh}
              className="rounded-full cursor-pointer"
            />

            {/* Profile Menu Dropdown  */}
            {profileOpen && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setProfileOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setProfileOpen(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn mt-10 w-full"
                  onClick={() => {
                    setProfileOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
