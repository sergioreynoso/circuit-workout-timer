import { styled } from "@stitches/react";
import { useTheme } from "next-themes";
import React from "react";
import Button from "../button";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const onClickHandler = () => {
    // setTheme(theme === "light" ? "dark" : "light");
    console.log("click");
    session ? signOut({ callbackUrl: "http://localhost:3000/" }) : signIn();
  };

  console.log(session);

  return (
    <Wrapper>
      <Heading>{session?.user?.name}</Heading>
      <Button type="primary" onClick={onClickHandler}>
        {session ? "Sign Out" : "Sign In"}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "$md",
  color: "$primary-05",
  backgroundColor: "$primary-12",
});

const Heading = styled("span", {
  fontSize: "large",
  fontWeight: "bold",
  textTransform: "uppercase",
});

export default Header;
