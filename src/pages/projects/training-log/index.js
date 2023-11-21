import { Fragment, useState } from "react";
import Layout from "../../../components/Layout";
import styles from "./index.module.scss";
import { getStravaActivities } from "../../../service/stravaService";
import {
  startOfWeek,
  addDays,
  addWeeks,
  getYear,
  endOfWeek,
  format,
  isSameMonth,
  differenceInCalendarWeeks,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  return {
    props: {
      activities: await getStravaActivities(75),
    },
  };
}

const TrainingLog = (props) => {
  const ALL = "All";
  const RUN = "Run";
  const WALK = "Walk";
  const DISTANCE = "Distance";
  const TIME = "Time";
  const RELATIVE_EFFORT = "Relative Effort";

  const [activityType, setActivityType] = useState(RUN);
  const [displayUnit, setDisplayUnit] = useState(DISTANCE);
  const [activities, setActivities] = useState(props.activities);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMore = async () => {
    console.log("CURRENT PAGE", currentPage + 1);
    const newActivities = await (
      await fetch(`/api/activities?page=${currentPage + 1}`)
    ).json();

    setActivities([...activities, ...newActivities]);
    setCurrentPage(currentPage + 1);
  };

  const activitiesDateFormat = "MMM-d-yyyy";
  const activitiesObj = activities
    .filter(({ type }) =>
      activityType === "All" ? true : type === activityType
    )
    .reduce((acc, activity) => {
      const date = format(new Date(activity.start_date), activitiesDateFormat);
      acc[date] = acc[date] || [];
      acc[date].push(activity);

      return acc;
    }, {});

  const today = utcToZonedTime(new Date(), "America/Chicago");

  const isToday = (date) =>
    date.getYear() === today.getYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const isFuture = (date) =>
    date.getYear() > today.getYear() ||
    (date.getYear() === today.getYear() &&
      date.getMonth() > today.getMonth()) ||
    (date.getYear() === today.getYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() > today.getDate());

  const weekOptions = { weekStartsOn: 1 };

  const header = [
    getYear(today),
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
    "Sun",
  ];

  const getWeek = (date) => {
    const tmpDate = startOfWeek(date, weekOptions);
    const week = [...Array(7)].map((day, index) => addDays(tmpDate, index));
    return week;
  };

  const formatDistance = (distance, decimals = 1) =>
    `${
      Math.floor((distance / 1609) * Math.pow(10, decimals)) /
      Math.pow(10, decimals)
    }`;

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = `${Math.floor(
      (totalSeconds - hours * 60 * 60) / 60
    )}`.padStart(2, "0");

    return `${`${hours}:`}${minutes}`;
  };

  const formatTotalTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor((totalSeconds - hours * 60 * 60) / 60);

    return `${`${hours > 0 ? `${hours}h ` : ""}`}${minutes}m`;
  };

  const getWeekTotal = (referenceDate) => {
    const week = getWeek(referenceDate);
    const total = week.reduce((acc, day) => {
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
              acc += suffer_score;
              break;
          }
        });
      }
      return acc;
    }, 0);

    switch (displayUnit) {
      case DISTANCE:
        return formatDistance(total, 1);
      case TIME:
        return formatTotalTime(total);
      case RELATIVE_EFFORT:
        return total;
    }
  };

  const getActivityDisplayUnit = ({ distance, moving_time, suffer_score }) => {
    switch (displayUnit) {
      case DISTANCE:
        return formatDistance(distance);
      case TIME:
        return formatTime(moving_time);
      case RELATIVE_EFFORT:
        return suffer_score;
    }
  };

  const getNumWeeks = () =>
    differenceInCalendarWeeks(
      today,
      new Date(activities[activities.length - 1].start_date)
    );

  return (
    <Layout title="Training Log" className={styles.trainingLog} {...props}>
      <div className={styles.header}>
        <div className={styles.controlsContainer}>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value={RUN}>{RUN}</option>
            <option value={WALK}>{WALK}</option>
            <option value={ALL}>{ALL}</option>
          </select>
          <select
            value={displayUnit}
            onChange={(e) => setDisplayUnit(e.target.value)}
          >
            <option value={DISTANCE}>{DISTANCE}</option>
            <option value={TIME}>{TIME}</option>
            <option value={RELATIVE_EFFORT}>{RELATIVE_EFFORT}</option>
          </select>
        </div>
        <div className={styles.daysContainer}>
          {header.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      </div>
      {[...Array(getNumWeeks())].map((week, weekIndex) => {
        const referenceDate = addWeeks(today, -weekIndex);
        const startDate = startOfWeek(referenceDate, weekOptions);
        const endDate = endOfWeek(referenceDate, weekOptions);
        const startDateFormatted = format(startDate, "MMM d");
        const endDateFormatted = format(
          endDate,
          isSameMonth(startDate, endDate) ? "d" : "MMM d"
        );

        return (
          <div
            className={styles.week}
            key={`${startDateFormatted} – ${endDateFormatted}`}
          >
            <div>
              <div>{`${startDateFormatted} – ${endDateFormatted}`}</div>
              <div className={styles.totalContainer}>
                <small>Total {displayUnit}</small>
                <div>
                  {getWeekTotal(referenceDate)}
                  {displayUnit === DISTANCE && <span>&nbsp;mi</span>}
                </div>
              </div>
            </div>
            {getWeek(referenceDate).map((day) => (
              <div
                key={day}
                className={`
                  ${styles.day} 
                  ${!isFuture(day) ? styles.dayPlaceholder : ""} 
                  ${isToday(day) ? styles.today : ""}
                `}
              >
                {!!activitiesObj[format(day, activitiesDateFormat)] &&
                  activitiesObj[format(day, activitiesDateFormat)]
                    .slice(0, 2)
                    .map((activity) => (
                      <Fragment key={activity.start_date + activity.id}>
                        <div className={styles.displayUnitContainer}>
                          <small className={styles.displayUnit}>
                            {getActivityDisplayUnit(activity)}
                            {displayUnit === DISTANCE && <span>&nbsp;mi</span>}
                          </small>
                        </div>
                        {activitiesObj[format(day, activitiesDateFormat)]
                          .length === 1 && (
                          <small className={styles.activityName}>
                            {activity.name}
                          </small>
                        )}
                      </Fragment>
                    ))}
              </div>
            ))}
          </div>
        );
      })}
      <div className={styles.loadMoreContainer}>
        <button onClick={loadMore}>Load More</button>
      </div>
    </Layout>
  );
};

export default TrainingLog;
