import React, { forwardRef } from "react";
import styled from "styled-components";

const Box = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  > div {
    display: flex;
    align-items: center;
  }
  label {
    display: inline-block;
    width: 4rem;
    flex-shrink: 0;
    font-size: 0.8rem;
  }
  input {
    padding: 0 0.8rem;
    width: calc(100% - 4rem);
    height: 2.1rem;
    flex-grow: 1;

    border: 1px solid #ddd;
    box-sizing: border-box;
  }
`;

interface Props {
  type?: string;
  label: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeypress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
function InputBox(
  { type = "text", label, value, name, onChange, onKeypress }: Props,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <Box>
      <div>
        <label>{label}</label>
        <input
          type={type}
          defaultValue={value}
          name={name}
          onChange={onChange}
          ref={ref}
          onKeyPress={onKeypress}
          autoComplete={"on"}
        />
      </div>
    </Box>
  );
}

export default forwardRef(InputBox);
