import React from "react";
import DashedLineChart from "../components/charts/DashedLineChart";
import LineChartWithXAxisPadding from "../components/charts/LineChartWithXAxisPadding";
import CustomizedDotLineChart from "../components/charts/CustomizedDotLineChart";
import SimpleAreaChart from "../components/charts/SimpleAreaChart";
import StackedAreaChart from "../components/charts/StackedAreaChart";
import LineChartHasMultiSeries from "../components/charts/LineChartHasMultiSeries";
import SimpleBarChart from "../components/charts/SimpleBarChart";
import CustomShapeBarChart from "../components/charts/CustomShapeBarChart";
import PositiveAndNegativeBarChart from "../components/charts/PositiveAndNegativeBarChart";
import BarChartWithMinHeight from "../components/charts/BarChartWithMinHeight";
import LineBarAreaComposedChart from "../components/charts/LineBarAreaComposedChart";
import VerticalComposedChart from "../components/charts/VerticalComposedChart";
import ComposedChartWithAxisLabels from "../components/charts/ComposedChartWithAxisLabels";
import ScatterAndLineOfBestFit from "../components/charts/ScatterAndLineOfBestFit";
import CustomActiveShapePieChart from "../components/charts/CustomActiveShapePieChart";
import TwoLevelPieChart from "../components/charts/TwoLevelPieChart";
import SimpleRadarChart from "../components/charts/SimpleRadarChart";
import SpecifiedDomainRadarChart from "../components/charts/SpecifiedDomainRadarChart";
import CustomContentTreemap from "../components/charts/CustomContentTreemap";
import SimpleTreemap from "../components/charts/SimpleTreemap";

const Dashboard = () => {
  return (
    <div className="py-10 pr-8 borde m-5 rounded-md ">
      <div className=" bg-transparent">
        <div>
        <CustomContentTreemap />

        </div>
        <div className="my-10">
        <SimpleTreemap />
        </div>
        <div className="flex mb-10">
          <SimpleRadarChart />
          <SpecifiedDomainRadarChart />
        </div>
        <div className="flex mb-10">
          <TwoLevelPieChart />
          <CustomActiveShapePieChart />
        </div>
        <div className="flex  justify-between">
          <LineBarAreaComposedChart />
          <VerticalComposedChart />
        </div>
        <div className="flex  justify-between">
          <SimpleBarChart />
          <CustomShapeBarChart />
        </div>
        <div className="flex  justify-between">
          <ComposedChartWithAxisLabels />
          <ScatterAndLineOfBestFit />
        </div>
        <div className="flex  justify-between">
          <SimpleAreaChart />
          <StackedAreaChart />
        </div>
        <div className="flex  justify-between">
          <PositiveAndNegativeBarChart />
          <BarChartWithMinHeight />
        </div>
        <div className="flex justify-between">
          <DashedLineChart />
          <LineChartWithXAxisPadding />
        </div>
        <div className="flex justify-between">
          <CustomizedDotLineChart />
          <LineChartHasMultiSeries />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
