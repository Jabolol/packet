import {
  subscribersContractAbi,
} from "../utils/wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import useAddress from "./useAddress";

export const useAddArtheraSub = () => {
  const { address } = useAddress();
  const { config } = usePrepareContractWrite({
    address: `0x000000000000000000000000000000000000Aa07`,
    abi: subscribersContractAbi,
    functionName: "whitelistAccount",
    args: ["0x8Fd163086a1A540E2F99F236fe83e9EDdB75f98f", address || "0x"],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, address };
};
