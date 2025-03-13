import { useAuth } from '@/hooks/useAuth'
import { Menu, MenuItem, Tooltip } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import styled from 'styled-components'

export function MenuBlock() {
  const Auth = useAuth()
  const [anchorElement, setAnchorElement] = useState<null | SVGElement>(null)
  const showMenu = Boolean(anchorElement)

  function openMenu(event: MouseEvent<SVGElement>) {
    setAnchorElement(event.currentTarget)
  }

  function closeMenu() {
    setAnchorElement(null)
  }
  return (
    <HeaderButton>
      <Tooltip title="Opções">
        <FaUser onClick={openMenu} size={30} />
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={showMenu}
        onClose={closeMenu}
        MenuListProps={{ 'aria-labelledby': 'image-menu' }}
      >
        <MenuItem onClick={() => Auth.logout()}>
          <MdLogout size={25} />
          <MenuItemText>Sair</MenuItemText>
        </MenuItem>
      </Menu>
    </HeaderButton>
  )
}

export const HeaderButton = styled.button`
  width: auto;
  background-color: transparent;
  border: none;
  box-shadow: none;
  flex-direction: row-reverse;
  padding-right: 1rem;
  cursor: pointer;
`

const MenuItemText = styled.p``
