import { VmComponent } from "@/components/vm/VmComponent";
import { componentsByNetworkId } from "@/data/bos-components";
import { MetaTags } from "./MetaTags";
import styled from "styled-components";
import { Chart } from "./Chart";

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
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const FeatureWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
`;

const Component = ({ src }: { src: string }) => (
  <VmComponent
    src={componentsByNetworkId["mainnet"]![src].id}
    props={componentsByNetworkId["mainnet"]![src].props}
  />
);

export function ComponentWrapperPage(props: Props) {
  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}

      <Wrapper>
        <Component src={"home"} />
        <FeatureWrap>
          <Component src={"feature_data"} />
          <Component src={"feature_privacy"} />
          <Component src={"feature_global"} />
        </FeatureWrap>
        <Chart />
      </Wrapper>
    </>
  );
}
