import {
    useAccount,
    useConnect,
    useContractEvent,
    useContractRead,
} from "wagmi";
import { BOSExampleAbi } from "./wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { config, publicClientCustom } from "@/utils/wagmi-config";
import { Log } from "viem";
import { GetLogsParameters } from "viem";

// todo implement this
// funcrtion to buyData tokens
// have the logs every time address is changed, get user

// get all users history
export const History = () => {
    const [amount, setAmount] = useState(0);
    const [logs, setLogs] = useState<Log[]>();
    const { address } = useAccount();
    const [userLogs, setUserLogs] = useState<Log[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedLogs = await publicClientCustom.getLogs({
                    address: `0x${process.env.CONTRACT_ADDRESS}`,
                    event: parseAbiItem(
                        "event tokenPurchased(address indexed buyer, uint256 indexed amount)"
                    ),
                });
                setLogs(fetchedLogs);
                const userLogs = fetchedLogs.filter(
                    (log) => log.args.buyer === address?.toLowerCase()
                );
                setUserLogs(userLogs);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchData();
    }, []);

    useContractEvent({
        address: `0x${process.env.CONTRACT_ADDRESS}`,
        abi: BOSExampleAbi,
        eventName: "tokenPurchased",
        listener(log) {
            // catch event
            console.log(log);
            // how to knwo
        },
    });

    return <> </>;
};
