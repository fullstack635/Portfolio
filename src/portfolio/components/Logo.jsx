import React from "react";
import favicon from "../assets/images/Projects/discord.png";

const Logo = ({ isLoading }) => {
  return (
    <a
      href="https://discord.com/users/stevenlai0970"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={favicon}
        alt="Steven Lai avatar"
        className={`rounded-full border-2 object-cover ${
          isLoading ? "border-white" : "border-dark_primary"
        } shadow-lg`}
        width={60}
        height={60}
      />
    </a>
  );
};

export default Logo;