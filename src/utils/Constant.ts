//물주기 1회 소모량
export const AMOUNT_OF_WATERING = 10;
//영양제 1회 증가량
export const AMOUNT_OF_ADD_NUTRIENT = 10;
//영양제 1회 소모량
export const AMOUNT_OF_USE_NUTRIENT = 5;
//레벨 증가량
export const LEVEL_INCREASE_ARR = [0, 10, 8, 6, 4, 2, 1];
//물효과 2배 기준
export const DOUBLE_EFFECT_STANDARD = 60;
//최대 레벨
export const MAX_LEVEL = 6;

export const CalculateGrowth = (level: number, nutrient: number) => {
  return nutrient > DOUBLE_EFFECT_STANDARD
    ? LEVEL_INCREASE_ARR[level] * 2
    : LEVEL_INCREASE_ARR[level];
};

export const PLANT_IMAGE = {
  tulip: [
    "img_tulip_1.png",
    "img_tulip_2.png",
    "img_tulip_3.png",
    "img_tulip_4.png",
    "img_tulip_5.png",
    "img_tulip_6.png",
  ],
  cactus: [
    "img_cactus_1.png",
    "img_cactus_2.png",
    "img_cactus_3.png",
    "img_cactus_4.png",
    "img_cactus_5.png",
    "img_cactus_6.png",
  ],
} as const;

export type TPLANT_IMAGE_KEYS = keyof typeof PLANT_IMAGE;

export const ERROR_MESSAGE =
  "오류가 발생했습니다. \n 잠시후 다시 시도해주세요.";
