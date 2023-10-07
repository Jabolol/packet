import { useConnect, useContractRead } from "wagmi";
import { BOSExampleAbi } from "./wagmi-constants";




// todo implement this
// this retuurns you the balance of the user
// use the 
export const userBalance = () => {
    const {data: conectData} = useConnect();
    const { data, isError, isLoading } = useContractRead({
        address: `0x${process.env.CONTRACT_ADDRESS}`,
        abi: BOSExampleAbi,
        functionName: "userDataBalances",
        args: [`0x${conectData?.account}`]
    });
    return <div></div>;
};
