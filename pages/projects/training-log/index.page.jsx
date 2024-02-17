import { useState, useRef } from "react";
import { format } from "date-fns";
import styles from "./index.module.scss";
import { getStravaActivities } from "@/service/stravaService";
import { getGarminData } from "@/service/garminService";
import {
  CALENDAR,
  CHART,
  ALL,
  STEPS,
  INTENSITY_MINUTES,
  COUNT,
  activitiesDateFormat,
  DAY,
} from "./utils";
import Layout from "../../components/Layout";
import Header from "./Header";
import Calendar from "./Calendar";
import Chart from "./Chart";

const ACTIVITIES_PER_PAGE = 100;
const STATS_PER_PAGE = 200;
const CURRENT_PAGE = 1;

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: {
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
  const [view, setView] = useState(CALENDAR);
  const [activityType, setActivityType] = useState(STEPS);
  const [displayUnit, setDisplayUnit] = useState(COUNT);
  const [groupBy, setGroupBy] = useState(DAY);
  const [activities, setActivities] = useState(props.activities);
  const [stats, setStats] = useState(props.stats);
  const [topWeek, setTopWeek] = useState(null);

  const headerRef = useRef();
  const calendarRef = useRef();

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
