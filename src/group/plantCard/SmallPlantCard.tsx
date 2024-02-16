import React from "react";
import styled from "styled-components";

const PlantCard = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  box-shadow: 0 4px 16px 0 rgba(40, 44, 47, 0.1);
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  font-size: 0.8rem;

  img {
    display: block;
    margin: 0 auto 0.5rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
  }

  &.active {
    outline: 2px solid #5ab380;
  }
`;

interface Props {
  readonly img: string;
  readonly name: string;
  readonly plantType: string;
  setPlantType: React.Dispatch<React.SetStateAction<string>>;
}

export function SmallPlantCard({ img, name, plantType, setPlantType }: Props) {
  return (
    <PlantCard
      className={plantType === name ? "active" : ""}
      onClick={() => setPlantType(name)}
    >
      <img src={img} alt={name} />
      <span>{name}</span>
    </PlantCard>
  );
}
