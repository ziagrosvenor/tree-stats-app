import React from "react";
import styled from "styled-components";

// uses bottom-padding hack. See https://css-tricks.com/scale-svg/
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => Math.round((props.viewY / props.viewX) * 100)}%;
`;

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: visible;
`;

interface Props {
  viewX: number;
  viewY: number;
  padding: number;
  children: any[];
}

export const ScalableSvg: React.FC<Props> = (props) => {
  return (
    <Container {...props}>
      <Svg viewBox={`0 0 ${props.viewX} ${props.viewY}`}>
        <g transform={`translate(${props.padding} ,${props.padding})`}>
          {props.children}
        </g>
      </Svg>
    </Container>
  );
};
