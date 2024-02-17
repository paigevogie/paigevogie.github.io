import { Fragment, useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import {
  startOfWeek,
  endOfWeek,
  format,
  differenceInCalendarWeeks,
  addWeeks,
  isSameMonth,
} from "date-fns";
import throttle from "lodash.throttle";
import {
  DISTANCE,
  STEPS,
  RUN,
  DAYS,
  getActivityDisplayUnit,
  getTotal,
  getWeek,
  isFuture,
  isToday,
  today,
  weekOptions,
  activitiesDateFormat,
} from "../utils";
import config from "../config";

const Calendar = ({
  headerRef,
  calendarRef,
  displayUnit,
  activityType,
  activities,
  stats,
  setTopWeek,
  filteredActivities,
  setActivities,
  setStats,
  activitiesPerPage,
  statsPerPage,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const calendarHeaderRef = useRef();

  const loadMore = async () => {
    const newActivities =
      (await (
        await fetch(
          `/api/activities?perPage=${activitiesPerPage}&page=${currentPage + 1}`
        )
      ).json()) || [];

    const newStats =
      (await (
        await fetch(
          `/api/stats?perPage=${statsPerPage}&page=${currentPage + 1}`
        )
      ).json()) || {};

    const allActivities = [...activities, ...newActivities];
    const allStats = { ...stats, ...newStats };

    const lastActivityDate = new Date(
      allActivities[allActivities.length - 1].start_date_local
    );
    const lastStatsDate = new Date(
      Object.keys(allStats).sort((a, b) => new Date(a) - new Date(b))[0]
    );

    // Since I started using strava before garmin, check that there's no new garmin stats
    // to load and the oldest strava activity is older than oldest garmin stats
    if (!Object.keys(newStats).length && lastActivityDate <= lastStatsDate) {
      setShowLoadMore(false);
    }

    !!newActivities.length && setActivities(allActivities);
    !!Object.keys(newStats).length && setStats(allStats);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const updateTopWeek = () => {
      [...calendarRef.current.children].every((child) => {
        const top = child.getBoundingClientRect().top;
        const offset =
          headerRef.current.offsetHeight +
          calendarHeaderRef.current.offsetHeight;
        if (top - offset > 0) {
          setTopWeek(child);
          return false;
        } else {
          return true;
        }
      });
    };

    updateTopWeek();

    const onScroll = throttle(updateTopWeek, 100);
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const getNumWeeksDisplayed = () => {
    const lastActivityDate = new Date(
      activities[activities.length - 1].start_date_local
    );
    const lastStatsDate = new Date(
      Object.keys(stats).sort((a, b) => new Date(a) - new Date(b))[0]
    );

    return differenceInCalendarWeeks(
      today,
      lastActivityDate > lastStatsDate ? lastActivityDate : lastStatsDate
    );
  };

  return (
    <>
      <div ref={calendarHeaderRef} className={styles.calendarHeader}>
        {DAYS.map((day) => (
          <small key={day}>{day}</small>
        ))}
      </div>
      <div ref={calendarRef}>
        {[...Array(getNumWeeksDisplayed())].map((week, weekIndex) => {
          const referenceDate = addWeeks(today, -weekIndex);
          const startDate = startOfWeek(referenceDate, weekOptions);
          const endDate = endOfWeek(referenceDate, weekOptions);
          const startDateFormatted = format(startDate, "MMM d");
          const endDateFormatted = format(
            endDate,
            isSameMonth(startDate, endDate) ? "d" : "MMM d"
          );
          const isRunAndDistance =
            activityType === RUN && displayUnit === DISTANCE;
          const total = getTotal(
            getWeek(referenceDate),
            filteredActivities,
            displayUnit,
            activityType,
            !isRunAndDistance
          );
          const { weeklyDistanceGoal } = config;

          return (
            <div
              className={styles.week}
              key={`${startDateFormatted} – ${endDateFormatted}`}
              data-value={startDate}
            >
              <div className={styles.weekDetails}>
                <div>{`${startDateFormatted} – ${endDateFormatted}`}</div>
                <div className={styles.weekTotal}>
                  {isRunAndDistance ? (
                    <>
                      <div>
                        {`${total} mi`}
                        <span> / {weeklyDistanceGoal} mi</span>
                      </div>
                      <div className={styles.distanceGoal}>
                        <div
                          style={{
                            width:
                              total < weeklyDistanceGoal
                                ? `${(total / weeklyDistanceGoal) * 100}%`
                                : "100%",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    total
                  )}
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
                  {!!filteredActivities[format(day, activitiesDateFormat)] &&
                    filteredActivities[format(day, activitiesDateFormat)]
                      .slice(0, 2)
                      .map((activity) => {
                        const display = getActivityDisplayUnit(
                          displayUnit,
                          activityType,
                          activity
                        );

                        return !!display ? (
                          <Fragment
                            key={activity.start_date_local + activity.id}
                          >
                            <div className={styles.displayUnitContainer}>
                              <small
                                className={`${styles.displayUnit} ${
                                  activityType === STEPS &&
                                  activity.totalSteps > activity.dailyStepGoal
                                    ? styles.goal
                                    : ""
                                }`}
                              >
                                {display}
                                {displayUnit === DISTANCE}
                              </small>
                            </div>
                            {filteredActivities[
                              format(day, activitiesDateFormat)
                            ].length === 1 && (
                              <small className={styles.activityName}>
                                {activity.name}
                              </small>
                            )}
                          </Fragment>
                        ) : null;
                      })}
                </div>
              ))}
            </div>
          );
        })}
        {showLoadMore ? (
          <div className={styles.loadMoreContainer}>
            <button onClick={loadMore}>Load More</button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Calendar;
