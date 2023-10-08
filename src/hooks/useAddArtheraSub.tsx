import {
  subscribersContractAbi,
} from "../utils/wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import useAddress from "./useAddress";

export const useAddArtheraSub = () => {
  const { address } = useAddress();
  const { config } = usePrepareContractWrite({
    address: `0x000000000000000000000000000000000000aa07`,
    abi: subscribersContractAbi,
    functionName: "addWhitelister",
    args: ["0x1fd7DEF946dA2E1b2F653579D08E7b67f14d131B", address || "0x"],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write, address };
};
