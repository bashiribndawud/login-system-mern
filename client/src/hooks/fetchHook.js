import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helpers";
import { GestureSharp } from "@material-ui/icons";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    state: null,
    serverError: null,
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const { username } = !query ?  getUsername() : "";
        const { data, status } = !query
          ? await axios.get(`/api/v1/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({
            ...prev,
            setLoading: false,
            apiData: data,
            status: status,
          }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
