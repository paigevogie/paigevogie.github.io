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
  DAY,
  DISTANCE,
  RUN,
  today,
} from "./utils";

const ACTIVITIES_PER_PAGE = 100;
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
    },
  };
}

const TrainingLog = (props) => {
  const [view, setView] = useState(props.query.view || CALENDAR);
  const [activityType, setActivityType] = useState(
    props.query.activityType?.replace("+", " ") || RUN
  );
  const [displayUnit, setDisplayUnit] = useState(
    props.query.displayUnit || DISTANCE
  );
  const [groupBy, setGroupBy] = useState(props.query.groupBy || DAY);
  const [activities, setActivities] = useState(props.activities);
  const [topWeek, setTopWeek] = useState(null);
  const [chartDate, setChartDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const headerRef = useRef();
  const calendarRef = useRef();

  const updateStateWithParams = (key, setState) => (value) => {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState(null, "", url.toString());

    setState(value);
  };

  const filteredActivities = activities
    .filter(({ type }) => (activityType === ALL ? true : type === activityType))
    .reduce((acc, activity) => {
      const date = format(
        new Date(activity.start_date_local),
        activitiesDateFormat
      );
      acc[date] = acc[date] || [];
      acc[date].push(activity);

      return acc;
    }, {});

  const loadMore = async () => {
    const newActivities =
      (await (
        await fetch(
          `/api/activities?perPage=${ACTIVITIES_PER_PAGE}&page=${
            currentPage + 1
          }`
        )
      ).json()) || [];

    if (!newActivities.length) {
      setShowLoadMore(false);
      return;
    }

    setActivities([...activities, ...newActivities]);
    setCurrentPage(currentPage + 1);
  };

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
          chartDate,
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
                  setTopWeek,
                  filteredActivities,
                  loadMore,
                  showLoadMore,
                }}
              />
            );
          case CHART:
            return (
              <Chart
                {...{
                  displayUnit,
                  filteredActivities,
                  groupBy,
                  chartDate,
                  setChartDate,
                  loadMore,
                }}
              />
            );
        }
      })()}
    </Layout>
  );
};

export default TrainingLog;
