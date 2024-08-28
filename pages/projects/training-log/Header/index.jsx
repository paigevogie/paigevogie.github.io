import { format } from "date-fns";
import {
  ALL,
  CALENDAR,
  CHART,
  DISPLAY_UNITS,
  getMonth,
  getTotal,
  GROUP_BY,
} from "../utils";
import styles from "./index.module.scss";

const Header = ({
  headerRef,
  activityType,
  setActivityType,
  displayUnit,
  setDisplayUnit,
  topWeek,
  filteredActivities,
  activities,
  view,
  setView,
  groupBy,
  setGroupBy,
  chartDate,
}) => {
  const getActivityTypes = () => {
    const types = {};
    activities.forEach(({ type }) => (types[type] = true));

    return Object.keys(types);
  };

  const onActivityTypeChange = (e) => {
    const { value: newActivityType } = e.target;
    setActivityType(newActivityType);
  };

  return (
    <div className={styles.header} ref={headerRef}>
      <div className={styles.controlsContainer}>
        <div>
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option value={CALENDAR}>{CALENDAR}</option>
            <option value={CHART}>{CHART}</option>
          </select>
          <select value={activityType} onChange={onActivityTypeChange}>
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
            {DISPLAY_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          {view === CHART && (
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              {GROUP_BY.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={styles.topWeek}>
          {view === CALENDAR && topWeek ? (
            <>
              <small>
                {format(
                  new Date(topWeek.getAttribute("data-value")),
                  "MMM yyy"
                )}
              </small>
              <div>
                {getTotal(
                  getMonth(new Date(topWeek?.getAttribute("data-value"))),
                  filteredActivities,
                  displayUnit
                )}
              </div>
            </>
          ) : view === CHART ? (
            format(chartDate, "yyy")
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
