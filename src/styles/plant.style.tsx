import { styled } from "styled-components";

export const PlantWrapper = styled.div`
  position: relative;
  text-align: center;
`;

export const PlantImgWrap = styled.div`
  position: relative;
  display: inline-block;
  img {
    display: block;
    margin: auto;
    width: 20rem;
    height: auto;
  }
`;

// 물효과 (영양분) 바
export const NutritionBar = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);

  > div {
    position: relative;
    width: 2.8rem;
    height: 9.375rem;
    background-color: #f5f5f5;
    border: 2px solid #fff;
    border-radius: 1rem;

    .nutrients_gauge {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      // height: 60%;
      background-color: #fec400;
      border-radius: 0 0 1rem 1rem;
      transition: height 0.6s;
    }

    i {
      display: inline-block;
      position: absolute;
      bottom: 60%;
      left: 50%;
      white-space: nowrap;
      font-style: normal;
      font-size: 0.8rem;
      color: #333;
      z-index: 99;
      &:after {
        position: absolute;
        z-index: 99;
        left: -47%;
        content: "";
        display: block;
        width: 2.7rem;
        border: 1px dotted #333;
      }
    }

    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 80%;
      display: block;
      padding-top: 3.8rem;
      width: 4rem;
      height: 5.5rem;
      box-sizing: border-box;
      background: url(${require("../assets/img/img_nutrient.png")}) no-repeat
        center top 10px / 80% #fec400;
      text-align: center;
      font-size: 1rem;
      border-radius: 1rem;
      border: 2px solid #fff;
      color: #fff;
      z-index: 99;
    }
  }
`;

//하단 식물 레벨 및 이름 정보
export const PlantInfo = styled.div`
  margin-top: 1.25rem;
  text-align: center;

  span {
    margin-right: 0.8rem;
  }

  .plant_name {
    font-size: 1rem;
    background: transparent;
    &:before {
      content: "✏️";
      margin-right: 0.3rem;
      font-size: 0.8rem;
    }
  }
`;
export const ProgressBar = styled.div`
  position: relative;
  margin: 0.5rem auto;
  overflow: hidden;
  width: 18rem;
  height: 2.5rem;
  background: #f5f5f5;
  border-radius: 3rem;
  border: 2px solid #fff;

  > div {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    // width: 70%;
    background: #5ab380;
    transition: width 0.6s;
  }

  i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    font-style: normal;
    font-size: 0.8rem;
  }
`;

//하단 버튼
export const BottomBtnWrap = styled.div`
  margin-top: 4rem;
  text-align: center;
  button {
    margin: 0.5rem;
  }
`;

//초기 식물 선택 카드 리스트
export const SelectPlantCardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  b {
    display: block;
    text-align: center;
    width: 100%;
  }
`;

export const Tutorial = styled.div`
  margin: 3rem auto;
  text-align: center;

  ol {
    display: inline-block;
    text-align: left;
  }
  li {
    margin-bottom: 0.6rem;
    &:before {
      content: "🌱";
      margin-right: 0.6rem;
    }
  }
`;
