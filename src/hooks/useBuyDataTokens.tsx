import { useAccount } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";

export const useBuyData = () => {
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: `0x111c7bCC5c617667DF9a296867401163490aeb7A`,
    abi: BOSExampleAbi,
    functionName: "buyData",
    args: [BigInt(amount)],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, address };
};
