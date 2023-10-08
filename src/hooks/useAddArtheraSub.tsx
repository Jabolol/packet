import { useAccount } from "wagmi";
import { BOSExampleAbi, subscribersContractAbi} from "../utils/wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";

//  todo implement this to be able to 

export const useAddArtheraSub = () => {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: `0x000000000000000000000000000000000000aa07`,
    abi: subscribersContractAbi,
    functionName: "addWhitelister",
    args: ["0x8Fd163086a1A540E2F99F236fe83e9EDdB75f98f",  address || "0x"]
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, address };
};


