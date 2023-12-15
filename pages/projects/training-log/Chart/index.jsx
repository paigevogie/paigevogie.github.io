import ChartJS from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styles from "./index.module.scss";
import {
  DAYS,
  MONTHS,
  today,
  getWeek,
  getActivityDisplayUnit,
  activitiesDateFormat,
  COUNT,
  DISTANCE,
  TIME,
  PACE,
  RELATIVE_EFFORT,
  getGroup,
  getTotal,
  WEEK,
  MONTH,
  weekOptions,
} from "../utils";
import { format, isSameMonth } from "date-fns";

const Chart = ({ activityType, displayUnit, filteredActivities, groupBy }) => {
  const getData = () =>
    getGroup(today, groupBy).map((group) =>
      getTotal(group, filteredActivities, displayUnit, activityType, false)
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
      case COUNT:
        return activityType;
    }
  };

  const getLabels = () => {
    switch (groupBy) {
      case WEEK:
        return getGroup(today, groupBy).map(
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

  // https://www.chartjs.org/docs/latest/configuration/
  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        data: getData(),
        label: getLabel(),
        backgroundColor: "#97ead0",
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
        titleColor: "#323232",
        titleFont: {
          weight: "normal",
        },
        titleMarginBottom: 2,
        bodyColor: "#323232",
        backgroundColor: "#ededed",
        displayColors: false,
        xAlign: "center",
        yAlign: "bottom",
      },
    },
  };

  ChartJS.defaults.font.size = 10;
  ChartJS.defaults.font.family = "Helvetica, Arial, sans-serif";
  ChartJS.defaults.font.weight = "lighter";
  ChartJS.defaults.color = "#323232";
  ChartJS.defaults.borderColor = "#ededed";

  return (
    <div className={styles.charts}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
