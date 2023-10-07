const AppSectionStyle = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 840px;
  height: 224px;
  max-width: 840px;
  flex-direction: row;
`;

const UserSectionStyle = styled.div`
  position: relative;
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  width: 590px;
  height: 224px;
`;

const TitleStyle = styled.h2`
  font-weight: bold;
  color: #0e6efd;
  margin-bottom: 20px;
`;

const AccentStyle = styled.span`
  font-weight: bold;
  color: black;
`;

const LocationStyle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 30px;
  color: #808080;
`;

function Hero({ address, fn }) {
  useEffect(() => {
    if (!address && fn) fn();
  }, []);

  const beginning = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  const fmt = `${beginning}...${end}`;

  return (
    <>
      <AppSectionStyle>
        <Widget
          src="c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/Yaypeg"
          props={{
            width: "224px",
            height: "224px",
            address,
            gif: true,
          }}
        />
        <UserSectionStyle>
          <TitleStyle>@{fmt}</TitleStyle>
          <p>
            The current billing cycle will be billed the{" "}
            <AccentStyle>21/10/2023</AccentStyle>. The overall traded data
            amount this billing cycle is <AccentStyle>1.5 GiB</AccentStyle>.
            Your carrier, <AccentStyle>Telefónica</AccentStyle>, has a trading
            fee of <AccentStyle>5%</AccentStyle>. Out of the total traded
            amount, <AccentStyle>0.07 GiB</AccentStyle> have been paid in fees.
          </p>
          <LocationStyle>
            <p>Madrid, Spain</p>
          </LocationStyle>
        </UserSectionStyle>
      </AppSectionStyle>
    </>
  );
}

const modified = {
  ...props,
  address: props.address ?? Ethers.send("eth_requestAccounts", [])[0],
};

return <Hero {...modified} />;
