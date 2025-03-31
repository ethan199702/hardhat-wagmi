import {BigNumber} from 'bignumber.js'

export const parseUnits = (val:string, decimals:number) => {
    const bigAmount = new BigNumber(val);
    const amount = bigAmount.div(new BigNumber(10).pow(decimals));
    if (amount.isGreaterThanOrEqualTo(1e9)) {
        return `${amount.div(1e9).toFixed(1)}B`; // 十亿单位
      }
      if (amount.isGreaterThanOrEqualTo(1e6)) {
        return `${amount.div(1e6).toFixed(1)}M`; // 百万单位
      }
      if (amount.isGreaterThanOrEqualTo(1e3)) {
        return `${amount.div(1e3).toFixed(1)}K`; // 千单位
      }
      return amount.toString()
}