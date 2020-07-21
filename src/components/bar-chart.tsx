import React from "react";
import NodeGroup from "react-move/NodeGroup";
import { scaleLinear, scaleBand } from "d3-scale";
import { easeExpInOut } from "d3-ease";
import { max } from "d3-array";
import styled from "styled-components";
import { ScalableSvg } from "./scalable-svg";

const viewport = {
  x: 1000,
  y: 450,
};

const gutter = 10;

interface Datum {
  key: string;
  value: number;
}

interface Props {
  data: Datum[];
  formatKey: any;
}

const Line = styled.line`
  stroke: rgba(0, 0, 0, 0.5);
  stroke-width: 1;
`;

const Rect = styled.rect`
  fill: var(--mdc-theme-primary);
`;

export const BarChart: React.FC<Props> = (props) => {
  const maxValue = max(props.data, (d) => d.value);
  const y = scaleLinear()
    .range([viewport.y - gutter, 0])
    .domain([0, maxValue]);

  const scale = scaleBand()
    .rangeRound([50, viewport.x - gutter])
    .domain(props.data.map((d) => d.key))
    .padding(0.1);

  const xScaleLines: any[] = [];

  for (let i = 0; i < 6; i++) {
    xScaleLines.push(
      <React.Fragment key={i}>
        <text x={0} y={(viewport.y / 6) * i + 20} fill="#333">
          {Math.floor(maxValue * (1 - (1 / 6) * i))}
        </text>
        <Line
          x1="0"
          x2={viewport.x - gutter}
          y1={(viewport.y / 6) * i}
          y2={(viewport.y / 6) * i}
        />
      </React.Fragment>
    );
  }

  return (
    <ScalableSvg viewX={viewport.x} viewY={viewport.y} padding={gutter}>
      <text x={0} y={-10} fill="#333">
        Number Of Trees Planted
      </text>
      {xScaleLines}
      <NodeGroup
        data={props.data}
        keyAccessor={(d) => d.key}
        start={() => ({
          y: viewport.y - gutter,
          width: scale.bandwidth(),
        })}
        enter={(d) => ({
          y: [y(d.value)],
          timing: { duration: 750, ease: easeExpInOut },
        })}
        update={(d, i) => ({
          y: [y(d.value)],
          width: scale.bandwidth(),
          timing: {
            duration: 750,
            delay: i * 50,
            ease: easeExpInOut,
          },
        })}
        leave={() => ({
          y: [y.range()[1]],
          timing: { duration: 750, ease: easeExpInOut },
        })}
      >
        {(nodes) => (
          <g>
            {nodes.map(({ key, data, state }, i) => {
              const { y, ...rest } = state;

              return (
                <g key={key} transform={`translate(${scale(data.key)},0)`}>
                  <Rect height={viewport.y - gutter - y} y={y} {...rest} />
                </g>
              );
            })}
          </g>
        )}
      </NodeGroup>

      {props.data.map(
        ({ key }, i) =>
          props.formatKey(props.data[i - 1]?.key) !== props.formatKey(key) && (
            <g>
              <g key={key} transform={`translate(${scale(key)},0)`}>
                <text
                  x={scale.bandwidth() / 2}
                  y={viewport.y - gutter + 15}
                  dx="-.35em"
                  fill="#333"
                >
                  {props.formatKey(key)}
                </text>
              </g>
            </g>
          )
      )}
    </ScalableSvg>
  );
};
