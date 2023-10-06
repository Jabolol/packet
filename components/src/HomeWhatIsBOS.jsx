const SectionPill = ({ name }) => {
  const PillContainer = styled.div`
    display: flex;
    width: min-content;
    padding: 0.5rem 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    border-radius: 1rem;
    background: #d6feef;
  `;

  const SectionName = styled.p`
    color: #1b1b18;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 2px;
    padding: 0;
  `;

  return (
    <PillContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <circle cx="8" cy="8.11414" r="8" fill="url(#paint0_linear_205_1217)" />
        <defs>
          <linearGradient
            id="paint0_linear_205_1217"
            x1="8"
            y1="0.114136"
            x2="8"
            y2="16.1141"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#03B172" />
            <stop offset="1" stopColor="#05EB97" />
          </linearGradient>
        </defs>
      </svg>
      <SectionName>{name}</SectionName>
    </PillContainer>
  );
};

const SectionDetial = ({ text }) => {
  const Details = styled.p`
    max-width: 280px;
    color: #767676;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  `;

  return <Details>{text}</Details>;
};

const WhatIsBOS = ({ author, text }) => {
  const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * author.length);
      setCurrentAuthorIndex(newIndex);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [author]);

  const Container = styled.div`
    padding: 154px 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 800px) {
      padding: 60px 16px;
    }
  `;

  const SectionHeading = styled.h2`
    color: #1b1b18;
    font-family: Poppins;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 103.5%; /* 49.68px */
    margin-bottom: 2rem;

    @media screen and (max-width: 800px) {
      color: #1b1b18;
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 103.5%; /* 33.12px */
    }
  `;

  const HeadingSpan = styled.span`
    color: #03b172;
    font-family: Poppins;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 103.5%;

    @media screen and (max-width: 800px) {
      color: #03b172;
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: 103.5%;
    }
  `;

  const SectionParagraph = styled.p`
    max-width: 1024px;
    color: #1b1b18;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120.5%; /* 19.28px */

    @media screen and (max-width: 800px) {
      color: #1b1b18;
      font-family: "Mona Sans", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120.5%; /* 19.28px */
    }
  `;

  const SectionBox = ({ title, text }) => {
    const Card = styled.div`
      @media screen and (max-width: 800px) {
        border-radius: 8px;
        background: #f4fdfa;
        width: 100%;
        padding: 1rem;
      }
    `;
    return (
      <Card className="d-flex flex-column gap-3" key={Math.random()}>
        <SectionPill name={title} />
        <SectionDetial text={text} />
      </Card>
    );
  };

  const sections = [
    {
      title: "Explore",
      text: "Discover everything within the BOS platform. From projects, components and communities to resources and educational content, this tool is your compass in the Open Web.",
    },
    {
      title: "Learn",
      text: "Cultivate your knowledge in the BOS ecosystem. Benefit from a curated library, providing you with tutorials, guides, and detailed information on components, gateways and even more.",
    },
    {
      title: "Connect",
      text: "Grow your network in the entire BOS ecosystems. Express yourself by creating your own space and by connecting with people from every communities.",
    },
    {
      title: "Build",
      text: "Create your project. Access a well garnished resource hub for professional and technical support who assist you in bringing your ideas to reality. Contribute to the future of the Open Web.",
    },
  ];

  const ResponsiveContainer = styled.div`
    gap: 80px;

    @media screen and (max-width: 800px) {
      gap: 32px;
    }
  `;

  const SectionsContainer = styled.div`
    @media screen and (max-width: 800px) {
      /* flex-direction: column !important; */
      flex-wrap: wrap;
      gap: 60px !important;
    }
  `;

  const fadeIn = styled.keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

  const fadeOut = styled.keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

  const Fade = styled.span`
  color: #03B172;
`;

  return (
    <Container>
      <ResponsiveContainer className="d-flex flex-column w-100">
        <div>
          <SectionHeading>
            Forked by <Fade fade={fadeIn}>{author[currentAuthorIndex]}</Fade> :D
          </SectionHeading>
          <SectionParagraph>{text}</SectionParagraph>

          <SectionParagraph>
            Start building, start exploring, start innovating with DiscoverBOS.
          </SectionParagraph>
        </div>
        <SectionsContainer className="d-flex justify-content-between gap-3">
          {sections.map((section) => (
            <SectionBox {...section} key={`section-${Math.random()}`} />
          ))}
        </SectionsContainer>
      </ResponsiveContainer>
    </Container>
  );
};

return <WhatIsBOS {...props} />;
