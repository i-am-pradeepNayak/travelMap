import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { Link } from "react-router-dom";
import { useCity } from "../contexts/CityContext";

function CountryList() {
  const { cities, isLoading } = useCity();

  const countries = cities.filter(
    (obj, index, self) =>
      index === self.findIndex((el) => el["country"] === obj["country"])
  );
  if (isLoading) return <Spinner />;
  if (!countries.length) return <Message message="Add visited city to list" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country, idx) => (
        <CountryItem country={country} key={idx} />
      ))}
      <Link to=".." relative="path">
        Esc
      </Link>
    </ul>
  );
}

export default CountryList;
