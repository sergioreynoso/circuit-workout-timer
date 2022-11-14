import { useTheme } from "next-themes";
import React from "react";
import Button from "../button";
import { useSession, signIn } from "next-auth/react";
import DropdownMenu from "../dropdownMenu";
import { styled } from "../../styles/stitches.congif";
import { User } from "../../types/next-auth";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (router.asPath === "/createWorkout") return null;

  return (
    <Flex>
      <NextLink href={"/"}>WORKOUT TIMER</NextLink>

      {status === "authenticated" ? (
        <Flex css={{ gap: "24px" }}>
          <NextLink href={"/dashboard"}>Workouts</NextLink>
          <DropdownMenu user={session.user as User} />
        </Flex>
      ) : (
        <Button
          color="violet"
          css={{ marginRight: "$md" }}
          onClick={() =>
            signIn(undefined, {
              callbackUrl: "http://localhost:3000/dashboard",
            })
          }>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

const Flex = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 64,
  paddingLeft: "$md",
  color: "$primary-12",
  backgroundColor: "$primary-03",
});

const NextLink = styled(Link, {
  fontWeight: "$700",
  textDecoration: "none",
  cursor: "pointer",
  color: "$primary-12",
});

export default Header;
