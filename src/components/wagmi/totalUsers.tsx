import { useConnect, useContractRead } from "wagmi";
import { BOSExampleAbi } from "./wagmi-constants";

// todo implement this
// get all the users registered
export const totalUsers = () => {
    const {data: conectData} = useConnect();
    const { data, isError, isLoading } = useContractRead({
        address: `0x${process.env.CONTRACT_ADDRESS}`,
        abi: BOSExampleAbi,
        functionName: "getUsers",
    });
    return <div></div>;
};
