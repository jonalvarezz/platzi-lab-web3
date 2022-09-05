import "./style.css";
import { ethers } from "ethers";

const process = async () => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.CloudflareProvider();

  const networkInfo = await provider.getNetwork();
  console.log(networkInfo);

  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  console.log(blockNumber);
  console.log(block);
};

process();
