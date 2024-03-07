import axios from "axios";
import { useQuery } from "react-query";

export const useAccount = () => {
  const auth = localStorage.getItem("token");

  const { data, isLoading } = useQuery(["account"], async () => {
    const res = await axios.get(`http://localhost:8080/api/auth/account`, {
      headers: {
        Authorization: `Bearer ${auth.replace('"', "")}`,
      },
    });
    return res.data;
  });
  return { user: data, isLoading };
};
