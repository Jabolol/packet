const media = {
  mobile: "@media(max-width: 768px)",
  tablet: "@media(min-width: 768px)",
};

const SectionHeroStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 840px;
  height: 224px;
  max-width: 840px;

  .hero-container {
    ${media.tablet} {
      margin-inline: auto;
      max-width: 900px;
    }
  }

  .hero-content {
    justify-content: center;

    ${media.tablet} {
      grid-template-columns: max-content max-content;
    }

    .hero-data {
      text-align: center;

      ${media.tablet} {
        text-align: initial;
      }

      .hero-title {
        font-size: 2rem;
        font-weight: bold;
        color: #0e6efd;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        color: #555;
        font-weight: 500;
        margin-bottom: 0.75rem;
      }

      .hero-description {
        font-size: 1rem;
        margin-bottom: 2rem;
      }
    }
  }
`;

const IconStyle = styled.div`
    margin: 20px;
    color: #0e6efd;
`;

const MobileData = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-mobiledata"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke-width={stroke}
    stroke={color}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 12v-8" />
    <path d="M8 20v-8" />
    <path d="M13 7l3 -3l3 3" />
    <path d="M5 17l3 3l3 -3" />
  </svg>
);

const LineStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Hero = () => {
  return (
    <SectionHeroStyle>
      <div className="hero-container row container">
        <div className="row hero-content">
          <div className="hero-data">
            <h1 className="hero-title">
              Hi, it's{" "}
              <span style={{ color: "var(--first-color)" }}>Packet</span>
            </h1>
            <h3 className="hero-subtitle">
              Decentralized Mobile Data Marketplace
            </h3>
            <p className="hero-description">
              Exchange your mobile data cross-carrier seamlessly.
            </p>
            <Web3Connect connectLabel="Connect with wallet" />
          </div>
        </div>
      </div>
      <IconStyle>
        <MobileData size={64} color={"currentColor"} stroke={2} />
      </IconStyle>
    </SectionHeroStyle>
  );
};

return <Hero />;
