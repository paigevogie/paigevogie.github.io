import { format, getYear } from "date-fns";
import {
  ALL,
  CALENDAR,
  CHART,
  COUNT,
  DISPLAY_UNITS,
  DISTANCE,
  getGroups,
  getMonth,
  getStepsStreak,
  getTotal,
  GROUP_BY,
  STATS,
  STEPS,
  WEEK,
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
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option value={CALENDAR}>{CALENDAR}</option>
            <option value={CHART}>{CHART}</option>
          </select>
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
          {view === CALENDAR && activityType === STEPS ? (
            <>
              <small>Streak</small>
              <div>{getStepsStreak(filteredActivities)}</div>
            </>
          ) : view === CALENDAR && topWeek ? (
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
                  displayUnit,
                  activityType
                )}
              </div>
            </>
          ) : view === CHART ? (
            <>
              <small>{getYear(chartDate)} Total</small>
              <div>
                {getTotal(
                  getGroups(chartDate, WEEK).flat(),
                  filteredActivities,
                  displayUnit,
                  activityType
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
