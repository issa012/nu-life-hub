import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useUser = () => {
  const apiClient = useAxiosPrivate();

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await apiClient.get("api/user");
      return response.data;
    },
    retry: false,
  });
  return query;
};

export default useUser;
