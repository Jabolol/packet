import { useContractRead } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";

export const useUserBalance = () => {
  const { data, isError, isLoading } = useContractRead({
    address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
    abi: BOSExampleAbi,
    functionName: "userDataBalances",
    // TODO(jabolo): This should be the user's address
    args: [`0xE210058ca7710330ad56Cf38c69F516b8D325701`],
  });
  return { data, isError, isLoading };
};
