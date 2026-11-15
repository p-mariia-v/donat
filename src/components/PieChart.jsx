import { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = 30;
const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20;

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"];
const color = "#524a5c";

export const PieChart = ({ width, height, data, inRadius = 0 }) => {
  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((p, i) => {
    // First arc is for the pie
    const sliceInfo = {
      innerRadius: inRadius,
      outerRadius: radius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    };
    const centroid = arcGenerator.centroid(sliceInfo);
    const slicePath = arcGenerator(sliceInfo);

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    };
    const inflexionPoint = arcGenerator.centroid(inflexionInfo);

    const isRightLabel = inflexionPoint[0] > 0;
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1);
    const textAnchor = isRightLabel ? "start" : "end";
    const label = p.data.name + " (" + p.value + ")";

    const [cx, cy] = arcGenerator.centroid(sliceInfo);
    const [ix, iy] = arcGenerator.centroid(inflexionInfo);

    return (
      <g key={i}>
        <path d={slicePath} fill={colors[i]} />

        <line x1={cx} y1={cy} x2={ix} y2={iy} stroke={color} />
        <circle cx={centroid[0]} cy={centroid[1]} r={2} fill={color} />
        <line x1={ix} y1={iy} x2={labelPosX} y2={iy} stroke={color} />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={iy}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={14}
          fill={color}
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
    </svg>
  );
};
