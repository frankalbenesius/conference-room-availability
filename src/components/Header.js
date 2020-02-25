import React from "react";
import styled from "@emotion/styled";
import AuthButton from "./AuthButton";
import DarkModeToggle from "./DarkModeToggle";
import useTimeStr from "../hooks/useTimeStr";

function Header() {
  const timeStr = useTimeStr();
  return (
    <HeaderWrapper>
      <AppTitle>Room Status</AppTitle>
      <SubHeaderWrapper>
        <Time>{timeStr}</Time>
        <DarkModeToggle />
        <AuthButton />
      </SubHeaderWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  margin: 2rem;
  color: ${p => p.theme.color};
`;
const AppTitle = styled.h1`
  margin: 0;
`;
const Time = styled.span`
  font-size: 0.8em;
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  > * {
    margin: 0 0.25rem;
  }
`;
export default Header;
