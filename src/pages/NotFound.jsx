import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-3px, 3px);
  }

  40% {
    transform: translate(-3px, -3px);
  }

  60% {
    transform: translate(3px, 3px);
  }

  80% {
    transform: translate(3px, -3px);
  }

  to {
    transform: translate(0);
  }
`;

const shiftAnimation = keyframes`
  0%,
  40%,
  44%,
  58%,
  61%,
  65%,
  69%,
  73%,
  100% {
    transform: skewX(0deg);
  }

  41% {
    transform: skewX(10deg);
  }

  42% {
    transform: skewX(-10deg);
  }

  59% {
    transform: skewX(40deg) skewY(10deg);
  }

  60% {
    transform: skewX(-40deg) skewY(-10deg);
  }

  63% {
    transform: skewX(10deg) skewY(-5deg);
  }

  70% {
    transform: skewX(-50deg) skewY(-20deg);
  }

  71% {
    transform: skewX(10deg) skewY(-10deg);
  }
`;

const GlitchContainer = styled.div`
  position: relative;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  letter-spacing: 5px;
  z-index: 1;
  animation: ${shiftAnimation} 1s ease-in-out infinite alternate;
`;

const GlitchBefore = styled.div`
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  animation: ${glitchAnimation} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
    infinite;
  color: #8b00ff;
  z-index: -1;
`;

const GlitchAfter = styled.div`
  display: block;
  content: attr(data-glitch);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  animation: ${glitchAnimation} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    reverse both infinite;
  color: #00e571;
  z-index: -2;
`;

const GlitchText = styled.span`
  /* GlitchText styles */
`;

const Glitch = ({ text }) => {
  return (
    <GlitchContainer className="glitch">
      <GlitchBefore data-glitch={text} />
      <GlitchText>{text}</GlitchText>
      <GlitchAfter data-glitch={text} />
    </GlitchContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Glitch text="Page not Found!" />
      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </NotFoundContainer>
  );
};

export default NotFound;
export { Glitch };
