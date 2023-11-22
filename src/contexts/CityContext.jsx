import { createContext, useContext, useEffect, useReducer } from "react";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: {},
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Invalid action");
  }
}

function CityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "loading" });
        const resp = await fetch("http://localhost:3004/cities");
        const data = await resp.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        throw new Error("Data fetching Error");
      } finally {
        dispatch({ type: "rejected", payload: "Error" });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id, setHasDisplayCity) => {
    try {
      if (Number(id) === currentCity.id) {
        return;
      }
      setHasDisplayCity((prev) => !prev);
      dispatch({ type: "loading" });
      const resp = await fetch(`http://localhost:3004/cities/${id}`);
      const data = await resp.json();
      dispatch({ type: "city/loaded", payload: data });
      setHasDisplayCity((prev) => !prev);
    } catch (e) {
      console.log(e);
      throw new Error("Data fetching Error");
    } finally {
      dispatch({ type: "rejected", payload: "Error" });
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const resp = await fetch("http://localhost:3004/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await resp.json();
      dispatch({ type: "city/created", payload: [...cities, data] });
      dispatch({ type: "city/loaded", payload: data });
    } catch (e) {
      throw new Error("Data fetching Error");
    } finally {
      dispatch({ type: "rejected", payload: "Error" });
    }
  };

  const removeCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const resp = await fetch("http://localhost:3004/cities/" + id, {
        method: "DELETE",
      });
      await resp.json();
      dispatch({
        type: "city/deleted",
        payload: cities.filter((city) => city.id !== id),
      });
    } catch (e) {
      throw new Error("Data fetching Error");
    } finally {
      dispatch({ type: "rejected", payload: "Error" });
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        removeCity,
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
