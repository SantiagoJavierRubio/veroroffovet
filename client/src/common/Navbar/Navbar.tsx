import React from 'react';
import styled from '@emotion/styled';

const NavBar = styled.nav`
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.5rem 0rem;
    position: fixed;
    max-width: 100vw;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
`;

const NavButton = styled.button`
    color: #000;
    margin: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export default function Navbar() {
  return (
    <NavBar>
        <NavButton>Home</NavButton>
        <NavButton>Asesorias</NavButton>
        <NavButton>Recursos</NavButton>
        <NavButton>Mis pacientes</NavButton>
    </NavBar>
  )
}
