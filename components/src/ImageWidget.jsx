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
  }

  .hero-content:hover {
    .hero-data {
        .icon {
            color: white;
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
        margin: 20px;
        color: #0e6efd;
      }
    }
  }
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

const Switch = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-swipe"
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
    <path d="M15 16.572v2.42a2.01 2.01 0 0 1 -2.009 2.008h-7.981a2.01 2.01 0 0 1 -2.01 -2.009v-7.981a2.01 2.01 0 0 1 2.009 -2.01h2.954" />
    <path d="M9.167 4.511a2.04 2.04 0 0 1 2.496 -1.441l7.826 2.097a2.04 2.04 0 0 1 1.441 2.496l-2.097 7.826a2.04 2.04 0 0 1 -2.496 1.441l-7.827 -2.097a2.04 2.04 0 0 1 -1.441 -2.496l2.098 -7.827z" />
  </svg>
);

const Eye = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-eye-closed"
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
    <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
    <path d="M3 15l2.5 -3.8" />
    <path d="M21 14.976l-2.492 -3.776" />
    <path d="M9 17l.5 -4" />
    <path d="M15 17l-.5 -4" />
  </svg>
);

const World = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-world-bolt"
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
    <path d="M20.985 12.52a9 9 0 1 0 -7.52 8.36" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h10.9" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3c2.313 3.706 3.07 7.856 2.27 12" />
    <path d="M19 16l-2 3h4l-2 3" />
  </svg>
);

const Icon = ({ icon, ...props }) => {
  switch (icon) {
    case "data":
      return <MobileData {...props} />;
    case "switch":
      return <Switch {...props} />;
    case "eye":
      return <Eye {...props} />;
    case "world":
      return <World {...props} />;
  }
};

const Hero = ({ title, description, icon }) => {
  return (
    <SectionHeroStyle>
      <div className="hero-content">
        <div className="hero-data">
          <Icon
            icon={icon}
            size={64}
            color={"currentColor"}
            stroke={2}
            class="icon"
          />
          <h4>{title}</h4>
          <p className="hero-description">{description}</p>
        </div>
      </div>
    </SectionHeroStyle>
  );
};

return <Hero {...props} />;
