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

/**
 * @description 将wei单位转换为代币
 * @param val 数量
 * @param decimals 小数位数
 * @returns 代币
 */
export function formatUnits(val: string | bigint, decimals: number = 18) {
  const bigNumber = new BigNumber(val as string);
  const result = bigNumber.dividedBy(new BigNumber(10).pow(decimals));
  return result.toString();
}

/**
 * @description 将代币转换为wei单位
 * @param val 数量
 * @param decimals 小数位数
 * @returns wei
 */
export function formatWei(val: string | bigint, decimals: number = 18) {
  const bigNumber = new BigNumber(val as string);
  const result = bigNumber.multipliedBy(new BigNumber(10).pow(decimals));
  return result.toString();
}

/**
 * @description 校验余额是否足够
 * @param balance 余额
 * @param amount 数量
 * @param decimals 小数位数
 * @returns 是否足够
 */
export function checkBalance(
  balance: string | bigint,
  amount: string | bigint,
  decimals: number = 18
) {
  const balanceBigNumber = new BigNumber(
    formatWei(balance, decimals) as string
  );
  const amountBigNumber = new BigNumber(formatWei(amount, decimals) as string);
  return balanceBigNumber.gte(amountBigNumber);
}
