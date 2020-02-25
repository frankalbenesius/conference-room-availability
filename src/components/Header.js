import React from "react";
import styled from "@emotion/styled";
import AuthButton from "./AuthButton";

function Header() {
  return (
    <HeaderWrapper>
      <AppTitle>Room Status</AppTitle>
      <AuthButton />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  margin: 2rem;
`;
const AppTitle = styled.h1`
  margin: 0;
`;

export default Header;
