import React from 'react';
import { styled } from 'styled-components';

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 9999;
  width: 100%;
  font-size: 0.875rem;
  background-color: var(--main-bg);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 4px 24px;
`;

const NavMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  color: var(--main-font);
`;

export default function HeaderComponent() {
  console.log('HeaderComponent');

  return (
    <Header>
      <Nav>
        <NavMenuWrapper>
          <div>로고 자리</div>
          <div>메뉴들 자리</div>
          <div>메뉴들 자리</div>
          <div>메뉴들 자리</div>
          <div>메뉴들 자리</div>
          <div>메뉴들 자리</div>
        </NavMenuWrapper>
      </Nav>
    </Header>
  );
}