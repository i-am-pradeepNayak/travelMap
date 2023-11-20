import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch("http://localhost:3004/cities");
        const data = await resp.json();
        setCities(data);
      } catch (e) {
        // console.log(e);
        throw new Error("Data fetching Error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id,setHasDisplayCity) => {
    try {
      setHasDisplayCity((prev)=>!prev)
      setIsLoading(true);
      const resp = await fetch(`http://localhost:3004/cities/${id}`);
      const data = await resp.json();
      setCurrentCity(data);
      setHasDisplayCity((prev)=>!prev)
    } catch (e) {
      console.log(e);
      throw new Error("Data fetching Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

const useCity = () => {
  return useContext(CityContext);
};

export { CityProvider, useCity };
