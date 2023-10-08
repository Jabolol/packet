import { ethers } from "ethers";
import { useEffect, useState } from "react";

async function connect() {
  const prov = new ethers.providers.Web3Provider(window.ethereum);
  let acc = (await prov.send("eth_requestAccounts", []))[0];
  return acc;
}

export default function useAddress(): { address: `0x${string}` } {
  const [address, setAddress] = useState<`0x${string}`>("0x");
  useEffect(() => {
    if (window.ethereum) {
      connect().then((d) => setAddress(d));
    }
  }, []);

  return { address };
}
