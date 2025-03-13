import React from 'react';

import { XYPlot, LineMarkSeries } from 'react-vis';

export default function PricePlot() {
  return (
    <XYPlot width={400} height={200}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-vis/dist/style.css"
      ></link>
      {/* <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis tickFormat={v => Number.isInteger(v) ? `${v} bid`: 'bid'}/>
      <YAxis tickFormat={v => `${v}k`}/>*/}
      <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: '3px',
        }}
        lineStyle={{ stroke: 'blue' }}
        markStyle={{ stroke: 'teal' }}
        data={[
          { x: 1, y: 550 },
          { x: 2, y: 560 },
          { x: 3, y: 570 },
          { x: 4, y: 600 },
          { x: 5, y: 650 },
        ]}
      />
      {/* <LineMarkSeries
        className="linemark-series-example-2"
        curve={'curveMonotoneX'}
        data={[{x: 1, y: 11}, {x: 1.5, y: 29}, {x: 3, y: 7}]}
      />  */}
    </XYPlot>
  );
}
