import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { User } from "@/context/auth-provider";

const useUser = () => {
  const apiClient = useAxiosPrivate();

  const query = useQuery<User>({
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
