import "chart.js/auto";
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
  getYear,
  getTotal,
} from "../utils";
import { format } from "date-fns";

const Chart = ({ activityType, displayUnit, filteredActivities }) => {
  // TODO: toggle between week, month, and year
  // const week = getWeek(today);
  // const data = week.map((day) =>
  //   getActivityDisplayUnit(
  //     displayUnit,
  //     activityType,
  //     // TODO: handle multiple activities
  //     filteredActivities[format(day, activitiesDateFormat)]?.[0] || {},
  //     false
  //   )
  // );

  const year = getYear(today);
  const data = year.map((month) =>
    getTotal(month, filteredActivities, displayUnit, activityType, false)
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

  const chartData = {
    labels: MONTHS,
    datasets: [
      {
        data,
        label: getLabel(),
        backgroundColor: "#97ead0",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
