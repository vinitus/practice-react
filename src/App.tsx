import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import styled from 'styled-components';

const Main = styled.main`
  height: calc(100% - 60px);
`;

export default function App() {
  return (
    <>
      <HeaderComponent />
      <Main>
        <div>Hi, React with JSX!</div>
      </Main>
    </>
  );
}
