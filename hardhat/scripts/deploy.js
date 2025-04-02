const { ethers } = require("hardhat");

const fs = require("fs");
const path = require("path");

async function main() {
  const initialSupply = 10000; // 1 万个代币，
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myToken = await MyERC20.deploy(initialSupply);

  await myToken.waitForDeployment();

  const contractAddress = await myToken.getAddress();
  console.log("MyERC20 deployed to:", contractAddress);

  const contractArtifact = await hre.artifacts.readArtifact("MyERC20");

  const frontEndDir = path.join(__dirname, "../../frontend/src/contracts");

  if (!fs.existsSync(frontEndDir)) {
    fs.mkdirSync(frontEndDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(frontEndDir, "MyERC20.json"),
    JSON.stringify(
      { address: contractAddress, abi: contractArtifact.abi },
      null,
      2
    )
  );

  console.log("ABI and Address saved to frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
