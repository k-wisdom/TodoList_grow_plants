import React from "react";
import { styled } from "styled-components";

const Button = styled.button<{ $img: string }>`
  padding: 2.8rem 0.5rem 0;
  width: 5.125rem;
  height: 6.125rem;
  box-sizing: border-box;
  font-size: 0.8rem;
  background: no-repeat center top 0.4rem / 50% #f5f5f5;
  background-image: url(${(props) => props.$img});
  border-radius: 0.5rem;
  border: 2px solid #fff;
  &:hover:not(:disabled) {
    background-color: #d5ebff;
  }
  &:disabled {
    filter: grayscale(1);
    color: #b9b9b9;
  }
  span {
    display: block;
  }
`;
interface Props {
  img: string;
  name: string;
  content?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function IconTxtBtn({
  img,
  name,
  content,
  disabled,
  onClick,
}: Props) {
  return (
    <Button $img={img} onClick={onClick} disabled={disabled}>
      {name}
      {content && <span>{content}</span>}
    </Button>
  );
}
