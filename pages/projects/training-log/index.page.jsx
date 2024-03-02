import { getGarminData } from "@/service/garminService";

import { getStravaActivities } from "@/service/stravaService";
import { format } from "date-fns";
import { useRef, useState } from "react";
import Layout from "../../components/Layout";
import Calendar from "./Calendar";
import Chart from "./Chart";
import Header from "./Header";
import styles from "./index.module.scss";
import {
  activitiesDateFormat,
  ALL,
  CALENDAR,
  CHART,
  COUNT,
  DAY,
  INTENSITY_MINUTES,
  STEPS,
} from "./utils";

const ACTIVITIES_PER_PAGE = 100;
const STATS_PER_PAGE = 200;
const CURRENT_PAGE = 1;

export async function getServerSideProps({ res, query = {} }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: {
      query,
      activities: await getStravaActivities({
        perPage: ACTIVITIES_PER_PAGE,
        page: CURRENT_PAGE,
      }),
      stats: await getGarminData({
        perPage: STATS_PER_PAGE,
        page: CURRENT_PAGE,
      }),
    },
  };
}

const TrainingLog = (props) => {
  const [view, setView] = useState(props.query.view || CALENDAR);
  const [activityType, setActivityType] = useState(
    props.query.activityType?.replace("+", " ") || STEPS
  );
  const [displayUnit, setDisplayUnit] = useState(
    props.query.displayUnit || COUNT
  );
  const [groupBy, setGroupBy] = useState(props.query.groupBy || DAY);
  const [activities, setActivities] = useState(props.activities);
  const [stats, setStats] = useState(props.stats);
  const [topWeek, setTopWeek] = useState(null);

  const headerRef = useRef();
  const calendarRef = useRef();

  const updateStateWithParams = (key, setState) => (value) => {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState(null, "", url.toString());

    setState(value);
  };

  const filteredActivities = [STEPS, INTENSITY_MINUTES].includes(activityType)
    ? stats
    : activities
        .filter(({ type }) =>
          activityType === ALL ? true : type === activityType
        )
        .reduce((acc, activity) => {
          const date = format(
            new Date(activity.start_date_local),
            activitiesDateFormat
          );
          acc[date] = acc[date] || [];
          acc[date].push(activity);

          return acc;
        }, {});

  return (
    <Layout title="Training Log" className={styles.trainingLog} {...props}>
      <Header
        {...{
          headerRef,
          activityType,
          displayUnit,
          topWeek,
          filteredActivities,
          activities,
          view,
          groupBy,
          setActivityType: updateStateWithParams(
            "activityType",
            setActivityType
          ),
          setDisplayUnit: updateStateWithParams("displayUnit", setDisplayUnit),
          setView: updateStateWithParams("view", setView),
          setGroupBy: updateStateWithParams("groupBy", setGroupBy),
        }}
      />
      {(() => {
        switch (view) {
          case CALENDAR:
            return (
              <Calendar
                {...{
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
                  currentPage: CURRENT_PAGE,
                  activitiesPerPage: ACTIVITIES_PER_PAGE,
                  statsPerPage: STATS_PER_PAGE,
                }}
              />
            );
          case CHART:
            return (
              <Chart
                {...{
                  activityType,
                  displayUnit,
                  filteredActivities,
                  groupBy,
                }}
              />
            );
        }
      })()}
    </Layout>
  );
};

export default TrainingLog;
