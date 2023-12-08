import {
  startOfWeek,
  addDays,
  format,
  startOfMonth,
  isSameMonth,
  subDays,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

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

const formatTotalTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds - hours * 60 * 60) / 60);

  return `${`${hours > 0 ? `${hours}h ` : ""}`}${minutes}m`;
};

const formatDistance = (distance, decimals = 1, showMiles = false) =>
  `${
    Math.floor((distance / 1609) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  }${showMiles ? " mi" : ""}`;

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = `${Math.floor(
    (totalSeconds - hours * 60 * 60) / 60
  )}`.padStart(2, "0");

  return `${`${hours}:`}${minutes}`;
};

const formatSteps = (steps) => `${Math.floor(Number(steps) / 100) / 10}K`;

const formatTotalSteps = (steps) => `${Math.floor(Number(steps) / 1000)}K`;

const formatPace = (metersPerSecond) => {
  if (!metersPerSecond) return 0;

  const minutes = Math.floor(26.8224 / metersPerSecond);
  const seconds = `${
    Math.round(1609.344 / metersPerSecond) - minutes * 60
  }`.padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const formatTotalPace = (metersPerSecond, days, filteredActivities) => {
  const { length } = days
    .map((day) => filteredActivities[format(day, activitiesDateFormat)])
    .flat()
    .filter((activity) => !!activity?.average_speed);
  const pace = formatPace(metersPerSecond / length);

  return `${pace} /mi`;
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
  }
) => {
  switch (displayUnit) {
    case DISTANCE:
      return formatDistance(distance);
    case TIME:
      return formatTime(moving_time);
    case PACE:
      return formatPace(average_speed);
    case RELATIVE_EFFORT:
      return suffer_score;
    case COUNT:
      switch (activityType) {
        case STEPS:
          return formatSteps(totalSteps);
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

export const activitiesDateFormat = "yyyy-MM-dd";

export const getTotal = (
  days,
  filteredActivities,
  displayUnit,
  activityType,
  showMiles = true
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
      return formatDistance(total, 1, showMiles);
    case TIME:
      return formatTotalTime(total);
    case RELATIVE_EFFORT:
      return total;
    case PACE:
      return formatTotalPace(total, days, filteredActivities);
    case COUNT:
      switch (activityType) {
        case STEPS:
          return formatTotalSteps(total);
        case INTENSITY_MINUTES:
          return total;
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
