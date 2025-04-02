import { BigNumber } from "bignumber.js";

export const parseUnits = (val: string, decimals: number) => {
  const bigAmount = new BigNumber(val);
  const amount = bigAmount.div(new BigNumber(10).pow(decimals));
  // 如果是整数，显示整数形式
  if (amount.isInteger()) {
    return amount.toString();
  }
  // 如果是大数字，使用简写
  if (amount.isGreaterThanOrEqualTo(1e9)) {
    return `${amount.div(1e9).toFixed(1)}B`; // 十亿单位
  }
  if (amount.isGreaterThanOrEqualTo(1e6)) {
    return `${amount.div(1e6).toFixed(1)}M`; // 百万单位
  }
  if (amount.isGreaterThanOrEqualTo(1e3)) {
    return `${amount.div(1e3).toFixed(1)}K`; // 千单位
  }
  // 小数形式，显示最多6位小数
  return amount.decimalPlaces(6).toString();
};

// 用于特殊处理当前合约的供应量问题，除以10^36而不是10^18
export const parseSpecialSupply = (val: string) => {
  const bigAmount = new BigNumber(val);
  // 除以10^36 (因为部署时已经乘以10^18，合约又乘以10^18)
  const amount = bigAmount.div(new BigNumber(10).pow(36));
  return amount.toString();
};
