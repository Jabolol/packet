import { BOSExampleAbi } from "../utils/wagmi-constants";
import { useConnect, useContractRead } from "wagmi";

export const useTotalUsers = () => {
  const { data: conectData } = useConnect();
  const { data, isError, isLoading } = useContractRead({
    address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
    abi: BOSExampleAbi,
    functionName: "getUsers",
  });

  return { data, isError, isLoading, conectData };
};
