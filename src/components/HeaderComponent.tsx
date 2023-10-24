import React from 'react';
import { styled } from 'styled-components';
import editBtn from '../../public/edit-btn.png';

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 9999;
  width: 100%;
  height: 60px;
  font-size: 0.875rem;
  background-color: var(--main-bg);
  color: var(--main-font);
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
`;

const Img = styled.img`
  background-color: #ffffff;
  border-radius: 20px;
  object-fit: none;
  width: 32px;
`;

const NavEtcWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button`
  --search-size: 32px;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  width: 237px;
  white-space: nowrap;
  background: #f2f2f2;
  border-radius: 6px;
  padding: 0 6px 0 8px;
  font-size: 14px;
  color: #8f8f8f;
  background-color: var(--main-bg);
  border: 1px solid var(--main-font);
  transition: background-color 0.1s ease;
`;

const SearchBtn = styled.button`
  height: 22px;
  line-height: 22px;
  border-radius: 4px;
  padding: 0 6px;
  font-size: 12px;
  color: var(--main-font);
  font-weight: 500;
  font-family: inherit;
  border: 1px solid color(srgb 0 0 0 / 0.08);
  margin-left: 16px;
  background-color: var(--main-bg);
  border: 1px solid var(--main-font);
`;

export default function HeaderComponent() {
  console.log('HeaderComponent');

  return (
    <Header>
      <Nav>
        <NavMenuWrapper>
          <Img src={editBtn} />
          <div>Home</div>
          <div>Introduce</div>
          <div>Calendar</div>
          <div>Study</div>
        </NavMenuWrapper>
        <NavEtcWrapper>
          <Button>
            검색
            <SearchBtn>검색</SearchBtn>
          </Button>
          <div>etc 자리</div>
          <div>etc 자리</div>
          <div>etc 자리</div>
          <div>etc 자리</div>
        </NavEtcWrapper>
      </Nav>
    </Header>
  );
}
