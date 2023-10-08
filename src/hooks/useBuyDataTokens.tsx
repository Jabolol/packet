import { useAccount } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";

export const useBuyData = () => {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
    abi: BOSExampleAbi,
    functionName: "buyData",
    args: [BigInt(amount)],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, address };
};
