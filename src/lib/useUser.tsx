import { getMe } from "@/pages/api";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/pages/types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
