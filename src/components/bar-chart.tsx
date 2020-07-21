import React from "react";
import NodeGroup from "react-move/NodeGroup";
import { scaleLinear, scaleBand } from "d3-scale";
import { easeExpInOut } from "d3-ease";
import { max } from "d3-array";
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

export const BarChart: React.FC<Props> = (props) => {
  const maxValue = max(props.data, (d) => d.value);
  const y = scaleLinear()
    .range([viewport.y - gutter, 0])
    .domain([0, maxValue]);

  const scale = scaleBand()
    .rangeRound([0, viewport.x - gutter])
    .domain(props.data.map((d) => d.key))
    .padding(0.1);

  return (
    <ScalableSvg viewX={viewport.x} viewY={viewport.y} padding={gutter}>
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
                  <rect
                    height={viewport.y - gutter - y}
                    y={y}
                    fill={"red"}
                    {...rest}
                  />

                  {i % 40 === 0 && (
                    <text
                      x={scale.bandwidth() / 2}
                      y={viewport.y - gutter + 15}
                      dx="-.35em"
                      fill="#333"
                    >
                      {props.formatKey(key)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        )}
      </NodeGroup>
    </ScalableSvg>
  );
};
