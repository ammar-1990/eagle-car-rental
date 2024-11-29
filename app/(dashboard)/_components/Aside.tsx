import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavList from "./NavList";
import { SignoutButton } from "./SignoutButton";

/* eslint-disable @typescript-eslint/no-unused-vars */
// @typescript-eslint/no-empty-object-type
type Props = {};

const Aside = (props: Props) => {
  return (
    <aside className="w-[240px] bg-site-primary p-[24px] flex flex-col gap-[8px]">
      {/* logo */}
      <Link href={"/"}>
        <div className="relative w-full aspect-video ">
          <Image
            priority
            src={"/Logo.png"}
            className="object-contain"
            fill
            alt="Logo"
          />
        </div>
      </Link>
      {/* nav list */}
      <NavList />
      {/* signout button */}
      <SignoutButton />
    </aside>
  );
};

export default Aside;
