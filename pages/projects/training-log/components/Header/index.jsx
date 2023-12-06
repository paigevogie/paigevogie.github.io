import styles from "./index.module.scss";
import { format } from "date-fns";
import {
  ALL,
  STEPS,
  STATS,
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
    const { value: newActivityType } = e.target;

    if (STATS.includes(newActivityType)) {
      setDisplayUnit(COUNT);
    } else if (!STATS.includes(newActivityType) && displayUnit === COUNT) {
      setDisplayUnit(DISTANCE);
    }

    setActivityType(newActivityType);
  };

  return (
    <div className={styles.header} ref={headerRef}>
      <div className={styles.controlsContainer}>
        <div>
          <select value={activityType} onChange={onActivityTypeChange}>
            {STATS.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
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
            {DISPLAY_UNITS.map((unit) =>
              unit !== COUNT || displayUnit === COUNT ? (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ) : null
            )}
          </select>
        </div>
        {activityType === STEPS ? (
          <div className={styles.topWeek}>
            <small>Streak</small>
            <div>{getStepsStreak(filteredActivities)}</div>
          </div>
        ) : topWeek ? (
          <div className={styles.topWeek}>
            <small>
              {format(new Date(topWeek.getAttribute("data-value")), "MMM yyy")}
            </small>
            <div>
              {getTotal(
                getMonth(new Date(topWeek?.getAttribute("data-value"))),
                filteredActivities,
                displayUnit,
                activityType
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.daysContainer}>
        {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map((day) => (
          <small key={day}>{day}</small>
        ))}
      </div>
    </div>
  );
};

export default Header;
