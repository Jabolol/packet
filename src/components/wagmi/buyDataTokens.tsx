import { useAccount, useConnect, useContractRead } from "wagmi";
import { BOSExampleAbi } from "./wagmi-constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState } from "react";

// todo implement this
// funcrtion to buyData tokens

export const buyData = () => {
    const [amount, setAmount] = useState(0);
    const {address} = useAccount()
    const { config } = usePrepareContractWrite({
        address: `0x${process.env.CONTRACT_ADDRESS}`,
        abi: BOSExampleAbi,
        functionName: 'buyData',
        args: [BigInt(amount)]
      })
      const { data, isLoading, isSuccess, write } = useContractWrite(config)
     
      return (
        <div>
          <button disabled={!write} onClick={() => write?.()}>
            Feed
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
      )
};
