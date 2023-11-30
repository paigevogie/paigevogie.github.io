import styles from "./index.module.scss";
import { format } from "date-fns";
import {
  ALL,
  STEPS,
  DISTANCE,
  TIME,
  RELATIVE_EFFORT,
  COUNT,
  getMonth,
  getTotal,
  getStepsStreak,
} from "../../utils";

const Header = ({
  headerRef,
  activityType,
  setActivityType,
  displayUnit,
  setDisplayUnit,
  topWeek,
  filteredActivities,
  activities,
}) => {
  const getActivityTypes = () => {
    const types = {};
    activities.forEach(({ type }) => (types[type] = true));

    return Object.keys(types);
  };

  const onActivityTypeChange = (e) => {
    const { value } = e.target;

    if (value === STEPS) {
      setDisplayUnit(COUNT);
    } else if (activityType === STEPS && value !== STEPS) {
      setDisplayUnit(DISTANCE);
    }

    setActivityType(value);
  };

  return (
    <div className={styles.header} ref={headerRef}>
      <div className={styles.controlsContainer}>
        <div>
          <select value={activityType} onChange={onActivityTypeChange}>
            <option value={STEPS}>{STEPS}</option>
            {getActivityTypes().map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value={ALL}>{ALL}</option>
          </select>
          <select
            value={displayUnit}
            onChange={(e) => setDisplayUnit(e.target.value)}
            disabled={displayUnit === COUNT}
          >
            <option value={DISTANCE}>{DISTANCE}</option>
            <option value={TIME}>{TIME}</option>
            <option value={RELATIVE_EFFORT}>{RELATIVE_EFFORT}</option>
            {displayUnit === COUNT && <option value={COUNT}>{COUNT}</option>}
          </select>
        </div>
        {displayUnit === COUNT ? (
          <div className={styles.topWeek}>
            <div>Day Streak</div>
            <div>{getStepsStreak(filteredActivities)}</div>
          </div>
        ) : topWeek ? (
          <div className={styles.topWeek}>
            <div>
              {format(new Date(topWeek.getAttribute("data-value")), "MMM yyy")}
            </div>
            <div>
              {getTotal(
                getMonth(new Date(topWeek?.getAttribute("data-value"))),
                filteredActivities,
                displayUnit
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.daysContainer}>
        {[null, "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map(
          (day) => (
            <div key={day}>{day}</div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
