import { BigNumber } from "bignumber.js";

export function getSlicString(
  val: string | `0x${string}`,
  subString: number = 6
) {
  if (!val) return "-";
  const start = val.substring(0, subString);
  const end = val.substring(val.length - subString);
  return `${start}...${end}`;
}

// 把 使用bignumber转换成以太币
export function formatUnits(val: string, decimals: number = 18) {
  const bigNumber = new BigNumber(val);
  const result = bigNumber.dividedBy(new BigNumber(10).pow(decimals));
  return result.toString();
}
