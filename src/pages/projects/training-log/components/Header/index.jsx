import styles from "./index.module.scss";
import { format } from "date-fns";
import {
  ALL,
  DISTANCE,
  TIME,
  RELATIVE_EFFORT,
  getMonth,
  getTotal,
} from "../../utils";

const Header = ({
  headerRef,
  activityType,
  setActivityType,
  displayUnit,
  setDisplayUnit,
  topWeek,
  activitiesObj,
  activities,
}) => {
  const getActivityTypes = () => {
    const types = {};
    activities.forEach(({ type }) => (types[type] = true));

    return Object.keys(types);
  };

  return (
    <div className={styles.header} ref={headerRef}>
      <div className={styles.controlsContainer}>
        <div>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
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
          >
            <option value={DISTANCE}>{DISTANCE}</option>
            <option value={TIME}>{TIME}</option>
            <option value={RELATIVE_EFFORT}>{RELATIVE_EFFORT}</option>
          </select>
        </div>
        {topWeek && (
          <div className={styles.topWeek}>
            <div>
              {format(new Date(topWeek.getAttribute("data-value")), "MMM yyy")}
            </div>
            <div>
              {getTotal(
                getMonth(new Date(topWeek?.getAttribute("data-value"))),
                activitiesObj,
                displayUnit
              )}
            </div>
          </div>
        )}
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
