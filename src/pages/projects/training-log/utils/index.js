import {
  startOfWeek,
  addDays,
  format,
  startOfMonth,
  isSameMonth,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const ALL = "All";
export const RUN = "Run";
export const DISTANCE = "Distance";
export const TIME = "Time";
export const RELATIVE_EFFORT = "Relative Effort";

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

export const getActivityDisplayUnit = (
  displayUnit,
  { distance, moving_time, suffer_score }
) => {
  switch (displayUnit) {
    case DISTANCE:
      return formatDistance(distance);
    case TIME:
      return formatTime(moving_time);
    case RELATIVE_EFFORT:
      return suffer_score || 0;
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

export const activitiesDateFormat = "MMM-d-yyyy";

export const getTotal = (days, activitiesObj, displayUnit) => {
  const total = days.reduce((acc, day) => {
    const activityArr = activitiesObj[format(day, activitiesDateFormat)];
    if (!!activityArr) {
      activityArr.forEach(({ distance, moving_time, suffer_score }) => {
        switch (displayUnit) {
          case DISTANCE:
            acc += distance;
            break;
          case TIME:
            acc += moving_time;
            break;
          case RELATIVE_EFFORT:
            acc += suffer_score || 0;
            break;
        }
      });
    }
    return acc;
  }, 0);

  switch (displayUnit) {
    case DISTANCE:
      return formatDistance(total, 1, true);
    case TIME:
      return formatTotalTime(total);
    case RELATIVE_EFFORT:
      return total;
  }
};
