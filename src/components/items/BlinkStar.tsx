import React from "react";
import { styled } from "styled-components";

export default function BlinkStar({
  setIsShow,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setTimeout(() => {
    setIsShow(false);
  }, 800);

  return (
    <>
      <Star1 />
      <Star2 />
      <Star3 />
    </>
  );
}

const Star = styled.span`
  display: block;
  position: absolute;

  background: url(${require("../../assets/img/free-icon-starry.png")}) no-repeat
    center / 100%;
  animation: flip 0.6s infinite;

  @keyframes flip {
    from {
      transform: rotateY(-180deg);
    }
    to {
      transform: rotateY(180deg);
    }
  }
`;

const Star1 = styled(Star)`
  left: 5%;
  top: 10%;
  width: 3rem;
  height: 3rem;
`;
const Star2 = styled(Star)`
  right: 0;
  top: 40%;
  animation-duration: 0.8s;
  width: 2.5rem;
  height: 2.5rem;
`;
const Star3 = styled(Star)`
  left: 20%;
  bottom: 10%;
  width: 2.2rem;
  height: 2.2rem;
`;
