import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";
import { User } from "@/types";

const useUser = () => {
  const query = useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await authApi.get("api/user");
      return response.data;
    },
    retry: false,
  });
  return query;
};

export default useUser;
