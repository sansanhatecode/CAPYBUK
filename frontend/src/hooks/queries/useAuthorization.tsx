import API from "@/api/api";
import { useRequest } from "@/api/Request";
import { LoginRequest, LoginResponseData } from "@/types/auth";


export function useAuthorization() {
  const { Request } = useRequest();

  const signIn = async ({username, password} : LoginRequest) => {
    const { data } = await Request.post<LoginResponseData>(API.LOGIN, { username, password });
    return data;
  }

  const signUp = async () => {
    return null;
  }

  return {signIn, signUp}
}