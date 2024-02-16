import React from "react";
import styled from "styled-components";

const Button = styled.button<{ $bgColor: string; $color: string }>`
  width: 100%;
  height: 2.99rem;
  background-color: ${(props) => props.$bgColor};
  font-weight: 400;
  font-size: 1.125rem;
  color: ${(props) => props.$color};

  &:disabled {
    background-color: #c1c1c1;
  }
`;

interface Props {
  name: string;
  isDisabled: boolean;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
}

export default function SquareBtn({
  name,
  isDisabled,
  bgColor = "#000",
  color = "#fff",
  onClick,
}: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      $bgColor={bgColor}
      $color={color}
    >
      {name}
    </Button>
  );
}
