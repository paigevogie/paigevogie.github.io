import { Fragment, useEffect } from "react";
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
  getActivityDisplayUnit,
  getTotal,
  getWeek,
  isFuture,
  isToday,
  today,
  weekOptions,
  activitiesDateFormat,
} from "../../utils";
import config from "../../config";

const Weeks = ({
  headerRef,
  weeksRef,
  displayUnit,
  activityType,
  activities,
  setTopWeek,
  filteredActivities,
}) => {
  useEffect(() => {
    const updateTopWeek = () => {
      [...weeksRef.current.children].every((child) => {
        const top = child.getBoundingClientRect().top;
        const offset = headerRef.current.offsetHeight;
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

  const getNumWeeksDisplayed = () =>
    differenceInCalendarWeeks(
      today,
      new Date(activities[activities.length - 1].start_date)
    );

  return (
    <div ref={weeksRef}>
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
                        <Fragment key={activity.start_date + activity.id}>
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
                              {displayUnit === DISTANCE && (
                                <span>&nbsp;mi</span>
                              )}
                            </small>
                          </div>
                          {filteredActivities[format(day, activitiesDateFormat)]
                            .length === 1 && (
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
    </div>
  );
};

export default Weeks;
