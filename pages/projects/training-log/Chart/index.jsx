import ChartJS from "chart.js/auto";
import { addYears, format, isSameMonth } from "date-fns";
import { Bar } from "react-chartjs-2";
import {
  DAY,
  DISTANCE,
  getGroups,
  getTotal,
  MONTH,
  MONTHS,
  PACE,
  RELATIVE_EFFORT,
  TIME,
  WEEK,
  weekOptions,
} from "../utils";
import styles from "./index.module.scss";

const Chart = ({
  displayUnit,
  filteredActivities,
  groupBy,
  chartDate,
  setChartDate,
  loadMore,
}) => {
  const getData = () =>
    getGroups(chartDate, groupBy).map((group) =>
      getTotal(group, filteredActivities, displayUnit, false)
    );

  const getLabel = () => {
    switch (displayUnit) {
      case DISTANCE:
        return "Miles";
      case TIME:
        return "Hours";
      case PACE:
        return "Minutes";
      case RELATIVE_EFFORT:
        return RELATIVE_EFFORT;
    }
  };

  const getLabels = () => {
    switch (groupBy) {
      case DAY:
        return getGroups(chartDate, groupBy).map(
          (group) => `${format(group[0], "MMM d")}`
        );
      case WEEK:
        return getGroups(chartDate, groupBy).map(
          (group) =>
            `${format(group[0], "MMM d")} – ${format(
              group[6],
              isSameMonth(group[0], group[6], weekOptions) ? "d" : "MMM d"
            )}`
        );
      case MONTH:
        return MONTHS;
    }
  };

  const black = "#323232";
  const grey = "#ededed";
  const green = "#97ead0";

  // https://www.chartjs.org/docs/latest/configuration/
  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        data: getData(),
        label: getLabel(),
        backgroundColor: green,
      },
    ],
  };

  const options = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        cornerRadius: 0,
        padding: 8,
        titleColor: black,
        titleFont: {
          weight: "normal",
        },
        titleMarginBottom: 2,
        bodyColor: black,
        backgroundColor: grey,
        displayColors: false,
        xAlign: "center",
        yAlign: "bottom",
      },
    },
  };

  ChartJS.defaults.font.size = 10;
  ChartJS.defaults.font.family = "Helvetica, Arial, sans-serif";
  ChartJS.defaults.font.weight = "lighter";
  ChartJS.defaults.color = black;
  ChartJS.defaults.borderColor = grey;

  return (
    <>
      <div className={styles.chartNavigation}>
        <button onClick={() => setChartDate(addYears(chartDate, -1))}>
          Prev
        </button>
        <button onClick={() => setChartDate(addYears(chartDate, 1))}>
          Next
        </button>
      </div>
      <Bar data={chartData} options={options} />
      <div className={styles.loadMoreContainer}>
        <button onClick={loadMore}>Load More</button>
      </div>
    </>
  );
};

export default Chart;
