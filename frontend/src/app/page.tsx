import ConnectWallet from "@/components/ConnectWallet";
import TransactionHistory from "@/components/TransactionHistory";
export default function HomePage() {
  return (
    <div className="p-2">
      <ConnectWallet />
      <TransactionHistory />
    </div>
  );
}
