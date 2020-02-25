import React from "react";
import styled from "@emotion/styled";
import AuthButton from "./AuthButton";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <HeaderWrapper>
      <AppTitle>Room Status</AppTitle>
      <DarkModeToggle />
      <AuthButton />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  margin: 2rem;
`;
const AppTitle = styled.h1`
  color: ${p => p.theme.color};
  margin: 0;
`;

export default Header;
