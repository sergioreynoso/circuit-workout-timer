import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Avatar from '../avatar';
import { signOut } from 'next-auth/react';

import { ChevronDownIcon, ExitIcon } from '@radix-ui/react-icons';
import { User } from '../../types/next-auth';

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
        <label>{user.name}</label>
        <label>{user.email}</label>
        <DropdownMenu.Separator className="my-1 h-[1px] bg-gray-500" />
        <button
          onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
          className="flex items-center justify-center gap-3 rounded-lg py-2 font-semibold hover:bg-amber-400 hover:text-gray-900"
        >
          <ExitIcon />
          Logout
        </button>
        <DropdownMenu.Arrow className="-translate-x-3 fill-gray-900" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default DropDownMenu;
