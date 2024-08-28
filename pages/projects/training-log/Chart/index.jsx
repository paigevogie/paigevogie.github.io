import ChartJS from "chart.js/auto";
import { addDays, addMonths, addWeeks, format, isSameMonth } from "date-fns";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  DAY,
  DISTANCE,
  getChartGroups,
  getTotal,
  MONTH,
  PACE,
  RELATIVE_EFFORT,
  TIME,
  TOTAL_CHART_GROUPS,
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
  activities,
}) => {
  const chartGroups = getChartGroups(chartDate, groupBy);
  const oldestActivityDate = new Date(
    activities[activities.length - 1].start_date_local
  );
  const oldestGroupDate = new Date(chartGroups[0][0]);
  const shouldLoadMore = oldestGroupDate < oldestActivityDate;

  useEffect(() => {
    if (shouldLoadMore) {
      loadMore();
    }
  }, [shouldLoadMore, loadMore]);

  const getData = () =>
    chartGroups.map((group) =>
      // Don't display partial data
      shouldLoadMore
        ? 0
        : getTotal(group, filteredActivities, displayUnit, false)
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
        return chartGroups.map((group) => format(group[0], "MMM d"));
      case WEEK:
        return chartGroups.map(
          (group) =>
            `${format(group[0], "MMM d")} – ${format(
              group[6],
              isSameMonth(group[0], group[6], weekOptions) ? "d" : "MMM d"
            )}`
        );
      case MONTH:
        return chartGroups.map((group) => format(group[0], "MMM"));
    }
  };

  const navigate = (direction = 1) => {
    const addFunc =
      groupBy === DAY
        ? addDays
        : groupBy === WEEK
        ? addWeeks
        : groupBy === MONTH
        ? addMonths
        : () => {};

    setChartDate(addFunc(chartDate, direction * TOTAL_CHART_GROUPS));
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
        <button onClick={() => navigate(-1)}>Prev</button>
        <button onClick={() => navigate()}>Next</button>
      </div>
      <Bar className={styles.chart} data={chartData} options={options} />
    </>
  );
};

export default Chart;
