import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Avatar from '../avatar';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon, ExitIcon } from '@radix-ui/react-icons';
import { Button } from '../button';
const homepage = process.env.NEXTAUTH_URL;

const DropDownMenu = ({ user }: { user: any }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className="flex items-center gap-3">
      <ChevronDownIcon className="text-white" />
      <Avatar user={user} />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        loop={true}
        collisionPadding={0}
        alignOffset={-20}
        align={'end'}
        className="flex flex-col gap-2  rounded-lg bg-gray-900 p-3 shadow-xl"
      >
        <p className="">{user.name}</p>
        {user.email && <label>{user.email}</label>}
        <DropdownMenu.Separator className=" h-[1px] bg-gray-400" />
        <Button intent="transparent" onClick={() => signOut({ callbackUrl: `${homepage}` })}>
          <ExitIcon />
          Logout
        </Button>
        <DropdownMenu.Arrow className="-translate-x-3 fill-gray-900" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default DropDownMenu;
