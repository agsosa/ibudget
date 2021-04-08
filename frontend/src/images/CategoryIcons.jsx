import { EnumCategory } from "lib/Enums";

const baseSvg = (path) => (
  <svg
    width="40"
    height="40"
    style={{ display: "block", margin: "auto", marginTop: 2 }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d={path}
    />
  </svg>
);

const ShoppingPath = "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z";
const FoodPath = "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z";

export function GetCategorySvgIcon(enumCategory) {
  switch (enumCategory) {
    case EnumCategory.SHOPPING:
      return baseSvg(ShoppingPath);
    case EnumCategory.FOOD:
      return baseSvg(FoodPath);
    default:
      return null;
  }
}
