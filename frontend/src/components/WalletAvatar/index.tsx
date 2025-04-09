import { FC } from "react";

interface IWalletAvatar {
  size: number;
  address: string;
}

const WalletAvatar: FC<IWalletAvatar> = ({ size, address }) => {
  const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${address}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarUrl}
      alt="wallit avatar"
      className="rounded-[50%]"
      width={size}
      height={size}
    />
  );
};

export default WalletAvatar;
