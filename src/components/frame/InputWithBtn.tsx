import React, { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.span<{ $width: string; $height: string }>`
  input {
    padding: 0 0.3rem;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    font-size: 1rem;
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-radius: 5px;
  }
  button {
    margin-left: 5px;
    padding: 0 0.5rem;
    min-width: 3rem;
    height: ${(props) => props.$height};
    border-radius: 5px;
    border: 1px solid #000;
    color: #000;
    background-color: transparent;
  }
`;
interface Props {
  btnName: string;
  value?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  onChange?: (e: any) => void;
  btnOnClick: () => void;
  onKeypress?: (e: any) => void;
}

function InputWithBtn(
  {
    btnName,
    value,
    placeholder,
    width = "8rem",
    height = "2rem",
    onChange,
    btnOnClick,
    onKeypress,
  }: Props,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <Container $width={width} $height={height}>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeypress}
        ref={ref}
      />
      <button onClick={btnOnClick}>{btnName}</button>
    </Container>
  );
}
export default forwardRef(InputWithBtn);
