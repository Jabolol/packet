import { BOSExampleAbi } from "../utils/wagmi-constants";
import { useConnect, useContractRead } from "wagmi";

export const useTotalUsers = () => {
  const { data: conectData } = useConnect();
  const { data, isError, isLoading } = useContractRead({
    address: `0x111c7bCC5c617667DF9a296867401163490aeb7A`,
    abi: BOSExampleAbi,
    functionName: "getUsers",
  });

  return { data, isError, isLoading, conectData };
};
