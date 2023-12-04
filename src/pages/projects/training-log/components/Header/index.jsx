import styles from "./index.module.scss";
import { format } from "date-fns";
import {
  ALL,
  STEPS,
  DISTANCE,
  DISPLAY_UNITS,
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
            {Object.keys(DISPLAY_UNITS).map((key) =>
              DISPLAY_UNITS[key] !== COUNT || displayUnit === COUNT ? (
                <option key={DISPLAY_UNITS[key]} value={DISPLAY_UNITS[key]}>
                  {DISPLAY_UNITS[key]}
                </option>
              ) : null
            )}
          </select>
        </div>
        {displayUnit === COUNT ? (
          <div className={styles.topWeek}>
            <div>Streak</div>
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
        {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
};

export default Header;
