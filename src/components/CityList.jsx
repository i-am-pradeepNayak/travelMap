import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add visited city to list" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city, idx) => (
        <CityItem city={city} key={idx} />
      ))}
    </ul>
  );
}

export default CityList;
