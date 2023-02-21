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
        collisionPadding={5}
        className="flex flex-col gap-2 p-3 text-gray-900 bg-gray-400"
      >
        <label>{user.name}</label>
        <label>{user.email}</label>
        <DropdownMenu.Separator className="bg-red-500" />
        {/* <Item>
          <SettingIcon />
          Settings
        </Item> */}
        <DropdownMenu.Separator className="bg-red-500" />
        <div onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>
          <ExitIcon />
          Logout
        </div>
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default DropDownMenu;
