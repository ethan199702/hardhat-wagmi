import { useEffect } from "react";

import { useReadContract, useSwitchChain } from "wagmi";
import ContractJSON from "../src/contracts/MyERC20.json";
function App() {
  const { switchChain } = useSwitchChain();
  useEffect(() => {
    switchChain({ chainId: 1337 });
    readContract();
  }, []);

  function readContract() {
    const data = useReadContract({
      abi: ContractJSON.abi,
      address: ContractJSON.address as `0x${string}`,
      functionName: "balanceOf",
    });
    console.log(data);
  }
  return <>111</>;
}

export default App;
