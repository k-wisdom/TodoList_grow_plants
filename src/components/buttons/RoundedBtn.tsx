import React from "react";
import styled from "styled-components";

const Button = styled.button<{ $bgColor: string; $color: string }>`
  width: 10.75rem;
  height: 5.5rem;
  background-color: ${(props) => props.$bgColor};
  border-radius: 1.25rem;
  font-weight: 400;
  font-size: 1.5625rem;
  color: ${(props) => props.$color};
`;

interface Props {
  name: string;
  bgColor?: string;
  color?: string;
  onClick: () => void;
}

export default function RoundedBtn({
  name,
  bgColor = "#fff",
  color = "#000",
  onClick,
}: Props) {
  return (
    <Button onClick={onClick} $bgColor={bgColor} $color={color}>
      {name}
    </Button>
  );
}
