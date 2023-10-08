import { VmComponent } from "@/components/vm/VmComponent";
import { componentsByNetworkId, getComponent } from "@/data/bos-components";
import { MetaTags } from "./MetaTags";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { WorldTable } from "./WorldTable";
import { useUserBalance } from "@/hooks/userBalance";
import { useAddArtheraSub } from "@/hooks/useAddArtheraSub";

type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 50px;
  border-radius: 4px;
  padding: 20px;
  overflow-x: hidden;
`;

const FeatureWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
`;

const SpinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 20px;
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #0e6efd;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${SpinnerAnimation} 2s linear infinite;
`;

const Component = ({ src }: { src: string }) => (
  <VmComponent
    src={componentsByNetworkId["mainnet"]![src].id}
    props={componentsByNetworkId["mainnet"]![src].props}
  />
);

const AvailableData = ({ amount }: { amount: number }) => (
  <VmComponent
    src={getComponent`DataWidget`}
    props={{
      cipher: `${amount} GiB`,
      title: "is your balance.",
      description: "You can use this data to access the internet.",
    }}
  />
);

const ButtonStyle = styled.button`
  border: 2px solid #0e6efd;
  background-color: #0e6efd;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  width: 100%;
  max-width: 340px;

  &:disabled {
    mouse-events: none;
    border: 2px solid gray;
    background-color: white;
    color: gray;
    cursor: not-allowed;
  }

  &:hover {
    border: 2px solid ${(props) => props.disabled ? "gray" : "#0e6efd"};
    background-color: white;
    color: ${(props) => props.disabled ? "gray" : "#0e6efd"};
  }
`;

export function AppWrapperPage(props: Props) {
  const [ready, setReady] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { data, isError, isLoading } = useUserBalance();
  const { write, data: aData, isSuccess: aSuccess } = useAddArtheraSub();

  useEffect(() => {
    const fn = () => {
      setReady(true);
    };
    window.addEventListener("load", fn);
  }, []);

  if (!ready) {
    return (
      <SpinnerWrapper>
        <Spinner />
        <LoadingText>Fetching Components from the BlockChain...</LoadingText>
      </SpinnerWrapper>
    );
  }

  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}

      <Wrapper>
        <Component src={"app_hero"} />
        <WorldTable />
        <FeatureWrap>
          <Component src={"app_sent"} />
          <Component src={"app_received"} />
          {!isLoading && !isError && <AvailableData amount={Number(data)} />}
        </FeatureWrap>
        <ButtonStyle
          disabled={clicked}
          onClick={() => {
            write && write();
            setClicked(true);
          }}
        >
          {clicked ? "Subscription sent!" : "Subscribe to Arthera"}
        </ButtonStyle>
      </Wrapper>
    </>
  );
}
