import { useAccount, useContractEvent } from "wagmi";
import { BOSExampleAbi } from "../utils/wagmi-constants";
import { useEffect, useState } from "react";
import { parseAbiItem } from "viem";
import { publicClientCustom } from "@/utils/wagmi-config";
import { Log } from "viem";

export const useHistory = () => {
  const [logs, setLogs] = useState<Log[]>();
  const { address } = useAccount();
  const [userLogs, setUserLogs] = useState<Log[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLogs = await publicClientCustom.getLogs({
          address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
          event: parseAbiItem(
            "event tokenPurchased(address indexed buyer, uint256 indexed amount)",
          ),
        });
        setLogs(fetchedLogs);
        const userLogs = fetchedLogs.filter(
          (log) => log.args.buyer === address?.toLowerCase(),
        );
        setUserLogs(userLogs);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);

  useContractEvent({
    address: `0x8925b3d8Cb999fdb8850E715588Ba22028E1C831`,
    abi: BOSExampleAbi,
    eventName: "tokenPurchased",
    listener(log) {
      console.log(log);
    },
  });

  return { userLogs, logs, address };
};
