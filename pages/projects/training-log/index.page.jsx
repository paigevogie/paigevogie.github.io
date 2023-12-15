import { useState, useRef } from "react";
import { format } from "date-fns";
import styles from "./index.module.scss";
import { getStravaActivities } from "@/service/stravaService";
import {
  CALENDAR,
  CHART,
  ALL,
  STEPS,
  INTENSITY_MINUTES,
  COUNT,
  activitiesDateFormat,
  WEEK,
} from "./utils";
import Layout from "../../components/Layout";
import Header from "./Header";
import Calendar from "./Calendar";
import Chart from "./Chart";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  return {
    props: {
      activities: [
        ...(await getStravaActivities(200)),
        ...(await getStravaActivities(200, 2)),
      ],
      stats: await (await fetch(`${process.env.HOST}/api/stats`)).json(),
    },
  };
}

const TrainingLog = (props) => {
  const [view, setView] = useState(CALENDAR);
  const [activityType, setActivityType] = useState(STEPS);
  const [displayUnit, setDisplayUnit] = useState(COUNT);
  const [groupBy, setGroupBy] = useState(WEEK);
  const [activities, setActivities] = useState(props.activities);
  const [topWeek, setTopWeek] = useState(null);

  const headerRef = useRef();
  const calendarRef = useRef();

  const filteredActivities = [STEPS, INTENSITY_MINUTES].includes(activityType)
    ? props.stats
    : activities
        .filter(({ type }) =>
          activityType === ALL ? true : type === activityType
        )
        .reduce((acc, activity) => {
          const date = format(
            new Date(activity.start_date),
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
                  setTopWeek,
                  filteredActivities,
                  setActivities,
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
