import * as AvatarPrimitive from '@radix-ui/react-avatar';
import abbreviateName from '../../lib/abbreviateName';

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
}

const Avatar = ({ user }: { user: User }) => {
  return (
    <AvatarPrimitive.Root className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-700">
      <AvatarPrimitive.Image src={user.image} alt={user.name} className="h-full w-full rounded-full  object-cover" />
      <AvatarPrimitive.Fallback
        delayMs={600}
        className="flex h-full w-full items-center justify-center bg-gray-300 text-base font-medium text-gray-900"
      >
        {abbreviateName(user.name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

// const StyledAvatar = styled(AvatarPrimitive.Root, {
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   verticalAlign: "middle",
//   overflow: "hidden",
//   userSelect: "none",
//   width: 48,
//   height: 48,
//   borderRadius: "100%",
//   backgroundColor: blackA.blackA3,
// });

// const StyledImage = styled(AvatarPrimitive.Image, {
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   borderRadius: "inherit",
// });

// const StyledFallback = styled(AvatarPrimitive.Fallback, {
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "white",
//   color: violet.violet11,
//   fontSize: 15,
//   lineHeight: 1,
//   fontWeight: 500,
// });

export default Avatar;
