import { AvatarTrigger, DropdownArrow, DropdownContent, DropdownItem } from "./styles";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export function AvatarWithMenu() {
  const {data, status} = useSession()

  return (
    <DropdownMenu.Root>
      <AvatarTrigger>
        <Image
          src={data?.user?.image ? data.user.image : "/placeholder-user.svg"} 
          objectFit="cover"
          layout="fill"
          alt=""
        />
      </AvatarTrigger>

      <DropdownMenu.Portal>
        <DropdownContent>
          {status === 'authenticated' ? (
            <DropdownItem
              onClick={() => signOut()}
            >
              Sair
            </DropdownItem> 
          ) : (
            <DropdownItem
              onClick={() => signIn("github")}
            >
              Entrar
            </DropdownItem> 
          )}
          <DropdownArrow/>
        </DropdownContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root> 
  )
}