const media = {
  tablet: "@media(min-width: 768px)",
};

const SectionHeroStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 266px;
  max-width: 266px;
  height: 266px;
  margin: 10px;

  &:hover {
    cursor: pointer;
    background-color: #0e6efd;
    color: white;
    .hero-content {
    .hero-data {
        .icon {
            color: white;
        }
    }
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

      .icon {
        font-weight: bold;
        font-size: 50px;
        color: #0e6efd;
      }
    }
  }
`;

const Hero = ({ cipher, title, description }) => {
  return (
    <SectionHeroStyle>
      <div className="hero-content">
        <div className="hero-data">
          <p className="icon">{cipher}</p>
          <h4>{title}</h4>
          <p className="hero-description">{description}</p>
        </div>
      </div>
    </SectionHeroStyle>
  );
};

return <Hero {...props} />;
