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
        <FaUser onClick={openMenu} size={22} />
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={showMenu}
        onClose={closeMenu}
        MenuListProps={{ 'aria-labelledby': 'image-menu' }}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-tight)',
            borderRadius: '12px',
            padding: '0.35rem'
          }
        }}
      >
        <MenuItem
          onClick={() => Auth.logout()}
          sx={{
            gap: '0.65rem',
            color: 'var(--ink)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'var(--paper)'
            }
          }}
        >
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
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: var(--paper);
  }
`

const MenuItemText = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
`
