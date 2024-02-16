import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { randomNumnBetween } from "../../utils/utils";

const WaterDrop = styled.span.attrs<{ $width: number; $positionX: number }>(
  (props) => ({
    style: {
      left: `${props.$positionX}%`,
      width: `${props.$width}px`,
      height: `${props.$width}px`,
    },
  }),
)`
  position: absolute;
  display: inline-block;
  background: url(${require("../../assets/img/ico_water.png")}) no-repeat center /
    100%;
`;

export function DropWater({
  setIsShow,
}: {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const waterDropNumber = randomNumnBetween(15, 8);
  const arr = Array.from({ length: waterDropNumber }).fill(1);

  setTimeout(() => {
    setIsShow(false);
  }, 1000);

  return (
    <>
      {arr.map((_, index) => {
        return <Water key={index} />;
      })}
    </>
  );
}

const Water = () => {
  const waterRef = useRef<HTMLSpanElement>(null);
  const positionX = randomNumnBetween(80, 20);
  const width = randomNumnBetween(30, 10);
  const dropSpeed = 10000 / width;

  useEffect(() => {
    let keyframes = [
      { opacity: 1 },
      { opacity: 0, transform: "translate(0, 300px)" },
    ];
    let options: KeyframeAnimationOptions = {
      duration: dropSpeed,
      easing: "ease-in",
      fill: "forwards",
    };
    (waterRef.current as HTMLSpanElement).animate(keyframes, options);
  }, [dropSpeed]);

  return <WaterDrop $width={width} $positionX={positionX} ref={waterRef} />;
};
