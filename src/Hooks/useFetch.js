import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    setLoading(true);
    const octokit = new Octokit({
      auth: "Your Auth Token",
    });

    try {
      const response = await octokit.request("GET /gists/public", {
        per_page: 30,
        page: 1,
      });

      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { data, loading, error };
};
export default useFetch;
