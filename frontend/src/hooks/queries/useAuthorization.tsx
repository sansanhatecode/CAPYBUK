import API from "@/api/api";
import { useRequest } from "@/api/Request";
import { LoginRequest, LoginResponseData, RegisterRequest } from "@/types/auth";


export function useAuthorization() {
  const { Request } = useRequest();

  const signIn = async ({username, password} : LoginRequest) => {
    const { data } = await Request.post<LoginResponseData>(API.LOGIN, { username, password });
    return data;
  }

  const signUp = async ({displayName, username, password} : RegisterRequest) => {
    const data = await Request.post(API.REGISTER, { displayName, username, password });
    return data;
  }

  const verify = async (code: string) => {
    const data = await Request.get(API.VERIFY, { code: code })
    return data
  }

  return {signIn, signUp, verify}
}