import {
  startOfWeek,
  addDays,
  format,
  startOfMonth,
  isSameMonth,
  subDays,
  startOfYear,
  addMonths,
  isSameWeek,
  addWeeks,
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
export const STEPS = "Steps";
export const INTENSITY_MINUTES = "Intensity Minutes";
export const STATS = [STEPS, INTENSITY_MINUTES];

export const DISTANCE = "Distance";
export const TIME = "Time";
export const RELATIVE_EFFORT = "Relative Effort";
export const PACE = "Pace";
export const COUNT = "Count";
export const DISPLAY_UNITS = [DISTANCE, TIME, PACE, COUNT];

export const WEEK = "Week";
export const MONTH = "Month";
export const GROUP_BY = [WEEK, MONTH];

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

const formatSteps = (steps, showUnit = true) =>
  `${Math.floor(Number(steps) / 100) / 10}${showUnit ? "K" : ""}`;

const formatTotalSteps = (steps) =>
  steps < 1000000
    ? `${Math.floor(Number(steps) / 1000)}K`
    : steps.toLocaleString();

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

const formatIntensityMinutes = (moderate, vigorous) => 2 * vigorous + moderate;

export const getActivityDisplayUnit = (
  displayUnit,
  activityType,
  {
    distance,
    moving_time,
    suffer_score = 0,
    totalSteps = 0,
    average_speed = 0,
    moderateIntensityMinutes = 0,
    vigorousIntensityMinutes = 0,
  },
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
    case COUNT:
      switch (activityType) {
        case STEPS:
          return formatSteps(totalSteps, showUnit);
        case INTENSITY_MINUTES:
          return formatIntensityMinutes(
            moderateIntensityMinutes,
            vigorousIntensityMinutes
          );
      }
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

export const getGroup = (date, type = WEEK) => {
  const group = [];
  let tmpDate =
    type === WEEK
      ? startOfWeek(startOfYear(date), weekOptions)
      : startOfYear(date);

  while (
    type === WEEK
      ? !isSameWeek(date, tmpDate, weekOptions)
      : !isSameMonth(date, tmpDate)
  ) {
    group.push(type === WEEK ? getWeek(tmpDate) : getMonth(tmpDate));

    tmpDate =
      type === WEEK ? addWeeks(tmpDate, 1, weekOptions) : addMonths(tmpDate, 1);
  }

  group.push(type === WEEK ? getWeek(tmpDate) : getMonth(tmpDate));

  return group;
};

export const activitiesDateFormat = "yyyy-MM-dd";

export const getTotal = (
  days,
  filteredActivities,
  displayUnit,
  activityType,
  showUnit = true
) => {
  const total = days.reduce((acc, day) => {
    const activityArr = filteredActivities[format(day, activitiesDateFormat)];
    if (!!activityArr) {
      activityArr.forEach(
        ({
          distance,
          moving_time,
          suffer_score = 0,
          totalSteps = 0,
          average_speed = 0,
          moderateIntensityMinutes = 0,
          vigorousIntensityMinutes = 0,
        }) => {
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
            case COUNT:
              switch (activityType) {
                case STEPS:
                  acc += totalSteps;
                  break;
                case INTENSITY_MINUTES:
                  acc += formatIntensityMinutes(
                    moderateIntensityMinutes,
                    vigorousIntensityMinutes
                  );
                  break;
              }
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
    case COUNT:
      switch (activityType) {
        case STEPS:
          return showUnit ? formatTotalSteps(total) : total;
        case INTENSITY_MINUTES:
          return showUnit ? total.toLocaleString() : total;
      }
  }
};

export const getStepsStreak = (filteredActivities) => {
  let tmpDate = today;
  let { totalSteps, dailyStepGoal } =
    filteredActivities[format(tmpDate, activitiesDateFormat)]?.[0] || {};

  const increment = () => {
    tmpDate = subDays(tmpDate, 1);
    ({ totalSteps, dailyStepGoal } =
      filteredActivities[format(tmpDate, activitiesDateFormat)]?.[0]) || {};
  };

  let streakCount = totalSteps >= dailyStepGoal ? 1 : 0;
  increment();

  while (totalSteps >= dailyStepGoal) {
    streakCount++;
    increment();
  }

  return streakCount;
};
