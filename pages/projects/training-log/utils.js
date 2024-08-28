import {
  addDays,
  addMonths,
  addWeeks,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const CALENDAR = "Calendar";
export const CHART = "Chart";

export const DAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ALL = "All";
export const RUN = "Run";

export const DISTANCE = "Distance";
export const TIME = "Time";
export const RELATIVE_EFFORT = "Relative Effort";
export const PACE = "Pace";
export const DISPLAY_UNITS = [DISTANCE, TIME, PACE];

export const DAY = "Day";
export const WEEK = "Week";
export const MONTH = "Month";
export const GROUP_BY = [DAY, WEEK, MONTH];

const formatTotalTime = (totalSeconds, showUnit = true) => {
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds - hours * 60 * 60) / 60);

  const roundedHours = Math.floor((totalSeconds * 10) / (60 * 60)) / 10;

  return showUnit
    ? `${`${hours > 0 ? `${hours}h ` : ""}`}${minutes}m`
    : roundedHours;
};

const formatDistance = (distance, decimals = 1, showMiles = false) => {
  const formattedDistance =
    Math.floor((distance / 1609) * Math.pow(10, decimals)) /
    Math.pow(10, decimals);

  return showMiles ? `${formattedDistance} mi` : formattedDistance;
};

const formatTime = (totalSeconds, showUnit = true) => {
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = `${Math.floor(
    (totalSeconds - hours * 60 * 60) / 60
  )}`.padStart(2, "0");

  const totalMinutes = Math.floor(totalSeconds / 60);

  return showUnit ? `${`${hours}:`}${minutes}` : totalMinutes;
};

const formatPace = (metersPerSecond, showUnit = true) => {
  if (!metersPerSecond) return 0;

  const minutes = Math.floor(26.8224 / metersPerSecond);
  const seconds = `${
    Math.round(1609.344 / metersPerSecond) - minutes * 60
  }`.padStart(2, "0");

  const roundedMinutes = Math.floor((26.8224 * 10) / metersPerSecond) / 10;

  return showUnit ? `${minutes}:${seconds}` : roundedMinutes;
};

const formatTotalPace = (
  metersPerSecond,
  days,
  filteredActivities,
  showUnit = true
) => {
  const { length } = days
    .map((day) => filteredActivities[format(day, activitiesDateFormat)])
    .flat()
    .filter((activity) => !!activity?.average_speed);
  const pace = formatPace(metersPerSecond / length, showUnit);

  return showUnit ? `${pace} /mi` : pace;
};

export const getActivityDisplayUnit = (
  displayUnit,
  { distance, moving_time, suffer_score = 0, average_speed = 0 },
  showUnit = true
) => {
  switch (displayUnit) {
    case DISTANCE:
      return formatDistance(distance, 1, showUnit);
    case TIME:
      return formatTime(moving_time, showUnit);
    case PACE:
      return formatPace(average_speed, showUnit);
    case RELATIVE_EFFORT:
      return suffer_score;
  }
};

export const today = utcToZonedTime(new Date(), "America/Chicago");

export const isToday = (date) =>
  date.getYear() === today.getYear() &&
  date.getMonth() === today.getMonth() &&
  date.getDate() === today.getDate();

export const isFuture = (date) =>
  date.getYear() > today.getYear() ||
  (date.getYear() === today.getYear() && date.getMonth() > today.getMonth()) ||
  (date.getYear() === today.getYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() > today.getDate());

export const weekOptions = { weekStartsOn: 1 };

export const getWeek = (date) => {
  const tmpDate = startOfWeek(date, weekOptions);
  const week = [...Array(7)].map((day, index) => addDays(tmpDate, index));
  return week;
};

export const getMonth = (date) => {
  const month = [];
  let tmpDate = startOfMonth(date);

  while (isSameMonth(date, tmpDate)) {
    month.push(tmpDate);
    tmpDate = addDays(tmpDate, 1);
  }

  return month;
};

export const TOTAL_CHART_GROUPS = 6;

export const getChartGroups = (date, groupBy) => {
  const groups = [];
  let tmpDate = date;

  while (groups.length < TOTAL_CHART_GROUPS) {
    if (groupBy === DAY) {
      groups.push([tmpDate]);
      tmpDate = addDays(tmpDate, -1);
    } else if (groupBy === WEEK) {
      groups.push(getWeek(tmpDate));
      tmpDate = addWeeks(tmpDate, -1);
    } else if (groupBy === MONTH) {
      groups.push(getMonth(tmpDate));
      tmpDate = addMonths(tmpDate, -1);
    }
  }

  return groups.reverse();
};

export const activitiesDateFormat = "yyyy-MM-dd";

export const getTotal = (
  days,
  filteredActivities,
  displayUnit,
  showUnit = true
) => {
  const total = days.reduce((acc, day) => {
    const activityArr = filteredActivities[format(day, activitiesDateFormat)];
    if (activityArr) {
      activityArr.forEach(
        ({ distance, moving_time, suffer_score = 0, average_speed = 0 }) => {
          switch (displayUnit) {
            case DISTANCE:
              acc += distance;
              break;
            case TIME:
              acc += moving_time;
              break;
            case PACE:
              acc += average_speed;
              break;
            case RELATIVE_EFFORT:
              acc += suffer_score;
              break;
          }
        }
      );
    }
    return acc;
  }, 0);

  switch (displayUnit) {
    case DISTANCE:
      return formatDistance(total, 1, showUnit);
    case TIME:
      return formatTotalTime(total, showUnit);
    case RELATIVE_EFFORT:
      return total;
    case PACE:
      return formatTotalPace(total, days, filteredActivities, showUnit);
  }
};
