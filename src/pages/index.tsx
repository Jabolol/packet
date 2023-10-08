import { config } from "dotenv";
import { useBosComponents } from "@/hooks/useBosComponents";
import { useDefaultLayout } from "@/hooks/useLayout";
import type { NextPageWithLayout } from "@/utils/types";
import { ComponentWrapperPage } from "@/components/ComponentWrapperPage";

config();

const HomePage: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.home.id}
      componentProps={components.home.props}
    />
  );
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
