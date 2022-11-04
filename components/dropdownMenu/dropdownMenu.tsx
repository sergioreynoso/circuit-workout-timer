import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Avatar from "../avatar";
import { signOut } from "next-auth/react";
import { keyframes, styled } from "../../styles/stitches.congif";
import { ChevronDownIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { User } from "../../types/next-auth";

export default ({ user }: { user: User }) => (
  <DropdownMenu.Root>
    <Trigger>
      <ChevronDown />
      <Avatar user={user} />
    </Trigger>

    <DropdownMenu.Portal>
      <Content loop={true} collisionPadding={5}>
        <Label css={{ fontWeight: "$700", paddingBottom: "$sm" }}>
          {user.name}
        </Label>
        <Label css={{ paddingTop: "0", color: "$gray-08" }}>{user.email}</Label>
        <StyledSeparator />
        {/* <Item>
          <SettingIcon />
          Settings
        </Item> */}
        <DropdownMenu.Separator />
        <Item
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}>
          <LogoutIcon />
          Logout
        </Item>
        <Arrow />
      </Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

const slideDown = keyframes({
  "0%": { transform: "translateY(0)" },
  "100%": { transform: "translateY(5px)" },
});

const Content = styled(DropdownMenu.Content, {
  width: "200px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "$xs",
  backgroundColor: "$gray-12",
  overflow: "hidden",
});

const ChevronDown = styled(ChevronDownIcon, {
  color: "$gray-01",
  transition: ".2s",
});

const Trigger = styled(DropdownMenu.Trigger, {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "$sm",
  gap: "$sm",
  border: "none",
  background: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  "&:focus": {
    outline: "none",
  },
  "&:focus span": {
    outline: "3px solid $gray-01",
    outlineOffset: "-2px",
  },

  "&:hover span": {
    outline: "3px solid $gray-01",
    outlineOffset: "-2px",
  },
  '&[data-state="open"] span': {
    outline: "3px solid $gray-01",
    outlineOffset: "-2px",
  },
  [`&:hover ${ChevronDown}`]: {
    transform: "translateY(5px)",
  },
});

const Label = styled(DropdownMenu.Label, {
  color: "$gray-01",
  padding: "16px 16px",
});

const Item = styled(DropdownMenu.Item, {
  display: "flex",
  alignItems: "center",
  gap: "$md",
  minWidth: "100%",
  padding: "16px 16px",
  cursor: "pointer",
  outline: "none",
  textAlign: "right",
  color: "$gray-01",

  "&:hover,&:focus": {
    backgroundColor: "$gray-11",
  },
});

const StyledSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: "$gray-05",
});

const Arrow = styled(DropdownMenu.Arrow, {
  color: "red",
  fill: "red",
});

const SettingIcon = styled(GearIcon, {
  color: "$gray-01",
});

const LogoutIcon = styled(ExitIcon, {
  color: "$gray-01",
});
