import React from "react";
import { styled } from "@stitches/react";
import { violet, blackA } from "@radix-ui/colors";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import abbreviateName from "../../lib/abbreviateName";

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 48,
  height: 48,
  borderRadius: "100%",
  backgroundColor: blackA.blackA3,
});

const StyledImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: violet.violet11,
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
}

const Avatar = ({ user }: { user: User }) => {
  console.log(user.image);
  return (
    <StyledAvatar>
      <StyledImage src={user.image} alt={user.name} />
      <StyledFallback delayMs={600}>{abbreviateName(user.name)}</StyledFallback>
    </StyledAvatar>
  );
};

export default Avatar;
