import { useConnect, useContractRead } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";

export const useUserBalance = () => {
  const { data: conectData } = useConnect();
  const { data, isError, isLoading } = useContractRead({
    address: `0x111c7bCC5c617667DF9a296867401163490aeb7A`,
    abi: BOSExampleAbi,
    functionName: "userDataBalances",
    args: [`0x${conectData?.account}`],
  });
  return { data, isError, isLoading };
};
