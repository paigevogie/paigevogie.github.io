import {
  addWeeks,
  differenceInCalendarWeeks,
  endOfWeek,
  format,
  isSameMonth,
  startOfWeek,
} from "date-fns";
import throttle from "lodash.throttle";
import { Fragment, useEffect, useRef } from "react";
import config from "../config";
import {
  activitiesDateFormat,
  DAYS,
  DISTANCE,
  getActivityDisplayUnit,
  getTotal,
  getWeek,
  isFuture,
  isToday,
  RUN,
  today,
  weekOptions,
} from "../utils";
import styles from "./index.module.scss";

const Calendar = ({
  headerRef,
  calendarRef,
  displayUnit,
  activityType,
  activities,
  setTopWeek,
  filteredActivities,
  loadMore,
  showLoadMore,
}) => {
  const calendarHeaderRef = useRef();

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
  }, [calendarRef, headerRef, setTopWeek]);

  const getNumWeeksDisplayed = () => {
    const lastActivityDate = new Date(
      activities[activities.length - 1].start_date_local
    );

    return differenceInCalendarWeeks(today, lastActivityDate);
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
          const { weeklyDistanceGoal } = config;
          const total = getTotal(
            getWeek(referenceDate),
            filteredActivities,
            displayUnit,
            !(isRunAndDistance && weeklyDistanceGoal)
          );

          return (
            <div
              className={styles.week}
              key={`${startDateFormatted} – ${endDateFormatted}`}
              data-value={startDate}
            >
              <div className={styles.weekDetails}>
                <div>{`${startDateFormatted} – ${endDateFormatted}`}</div>
                <div className={styles.weekTotal}>
                  {isRunAndDistance && weeklyDistanceGoal ? (
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
                          activity
                        );

                        return display ? (
                          <Fragment
                            key={activity.start_date_local + activity.id}
                          >
                            <div className={styles.displayUnitContainer}>
                              <small className={styles.displayUnit}>
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
