const lookup = (id) =>
  `https://firebasestorage.googleapis.com/v0/b/yaypegsnft.appspot.com/o/illustration%2F${id}.png`;

const getId = (address) => {
  if (!ethers.utils.isAddress(address)) return null;

  return (
    ethers.BigNumber.from(
      ethers.utils.keccak256(ethers.utils.arrayify(address))
    )
      .mod(10000)
      .toNumber() + 1
  );
};

const getYaypeg = (address) => {
  if (!ethers.utils.isAddress(address)) return null;
  const id = getId(address);

  return asyncFetch(lookup(id)).then(
    ({ body: { downloadTokens } }) =>
      `https://firebasestorage.googleapis.com/v0/b/yaypegsnft.appspot.com/o/illustration%2F${id}.png?alt=media&firebase=${downloadTokens}`
  );
};

const ImageStyle = styled.img`
    ${props.styles}
    border-radius: 10px;
`;

const Yaypeg = ({ address, width, height, gif }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    getYaypeg(address).then((y) => setImg(y));
  }, []);

  if (gif) {
    return (
      <ImageStyle
        src={`https://firebasestorage.googleapis.com/v0/b/yaypegsnft.appspot.com/o/collection%2F${getId(
          address
        )}.gif?alt=media&firebase=undefined`}
        width={width}
        height={height}
      />
    );
  }

  if (!img) {
    return <p>Loading...</p>;
  }

  return <ImageStyle src={img} width={width} height={height} />;
};

return <Yaypeg {...props} />;
