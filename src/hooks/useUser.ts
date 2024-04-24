import { useQuery } from "@tanstack/react-query";
import { User } from "@/context/auth-provider";
import { authApi } from "@/authApi";

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
