import { useContractRead } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";
import useAddress from "./useAddress";

export const useUserBalance = () => {
  const { address } = useAddress();
  const { data, isError, isLoading } = useContractRead({
    address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
    abi: BOSExampleAbi,
    functionName: "userDataBalances",
    args: [address],
  });
  return { data, isError, isLoading };
};
