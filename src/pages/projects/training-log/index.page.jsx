import { useState, useRef } from "react";
import { format } from "date-fns";
import styles from "./index.module.scss";
import { getStravaActivities } from "../../../service/stravaService";
import { RUN, DISTANCE, ALL, activitiesDateFormat } from "./utils";
import Layout from "../../components/Layout";
import Header from "./components/Header";
import Weeks from "./components/Weeks";
import LoadMore from "./components/LoadMore";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  return {
    props: {
      activities: await getStravaActivities(75),
    },
  };
}

const TrainingLog = (props) => {
  const [activityType, setActivityType] = useState(RUN);
  const [displayUnit, setDisplayUnit] = useState(DISTANCE);
  const [activities, setActivities] = useState(props.activities);
  const [topWeek, setTopWeek] = useState(null);

  const headerRef = useRef();
  const weeksRef = useRef();

  const activitiesObj = activities
    .filter(({ type }) => (activityType === ALL ? true : type === activityType))
    .reduce((acc, activity) => {
      const date = format(new Date(activity.start_date), activitiesDateFormat);
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
          activitiesObj,
          activities,
        }}
      />
      <Weeks
        {...{
          headerRef,
          weeksRef,
          displayUnit,
          activities,
          setTopWeek,
          activitiesObj,
        }}
      />
      <LoadMore {...{ activities, setActivities }} />
    </Layout>
  );
};

export default TrainingLog;
