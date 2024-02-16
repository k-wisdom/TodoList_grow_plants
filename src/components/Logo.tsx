import React from "react";
import styled from "styled-components";

const LogoBox = styled.h1<{ $imgWidth: string; $center: boolean }>`
  margin: ${(props) => props.$center && "auto"};
  width: ${(props) => props.$imgWidth};
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  size?: string;
  center?: boolean;
  onClick?: () => void;
}

export default function Logo({
  size = "5.8825rem",
  center = false,
  onClick,
}: Props) {
  return (
    <LogoBox $imgWidth={size} $center={center} onClick={onClick}>
      <img src={require("../assets/img/img_logo.png")} alt="TodoList" />
      <span className="hide">TodoList</span>
    </LogoBox>
  );
}
