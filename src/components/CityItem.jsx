import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../contexts/CityContext";

function CityItem({ city }) {
  const {
    emoji,
    date,
    cityName,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, removeCity } = useCity();

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const handleRemoveCity = async (e, id) => {
    e.preventDefault();
    await removeCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${Number(lat)}&lng=${Number(lng)}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleRemoveCity(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
