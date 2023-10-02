import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import DEFAULT_RATE from "./data.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 10])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({});
  const handleMouseEnter = (geo, currentData) => {
    const tooltipText = currentData
      ? `${currentData.name}: ${currentData.unemployment_rate}%`
      : " No Data Found";
    setTooltipContent(tooltipText);
    setTooltipPosition({ left: geo.clientX, top: geo.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="container mx-auto"> 
      <ComposableMap className="h-[85vh] mx-auto"  projection="geoAlbersUsa">
        <Geographies  geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = DEFAULT_RATE.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cur ? cur.unemployment_rate : "#fff")}
                  onMouseEnter={() => handleMouseEnter(geo, cur)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          className="tooltip text-red-500 font-bold text-xs"
          style={{ left: tooltipPosition.left, top: tooltipPosition.top }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default MapChart;