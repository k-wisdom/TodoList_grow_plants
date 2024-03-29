import styled from "styled-components";

export const MainTop = styled.div`
  padding: 2rem;
  background: #5ab380;
  font-size: 2rem;
  text-align: center;
  color: #fff;

  p {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  img {
    position: absolute;
    right: 110%;
    width: 10rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 5rem;
    font-size: 1.5rem;
    img {
      width: 21vw;
    }
  }
`;
