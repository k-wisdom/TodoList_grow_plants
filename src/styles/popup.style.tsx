import { styled } from "styled-components";

export const Popup = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1.25rem;
  width: 30rem;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 1rem;
  box-shadow: 0 4px 16px 0 rgba(40, 44, 47, 0.1);

  h3 {
    text-align: center;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  width: 2rem;
  height: 2rem;
  background: url(${require("../assets/img/ico_close.png")}) no-repeat center /
    70%;
`;

export const ListPopupUI = styled.ul`
  margin-bottom: 2rem;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 0.5rem;

    button {
      width: 4rem;
      height: 2rem;
      border-radius: 0.6rem;
      background-color: #83dbff;
      color: #fff;
      font-weight: bold;
    }
  }
`;
