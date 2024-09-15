import { getAuthToken, setAuthToken } from "@/helper/storage";
import { LoginRequest, LoginResponseData } from "@/types/auth";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type HeaderResponse = {
  code: string | null;
  errorMessage: string | null;
  timestamp: number;
  traceId: string;
  timeElapsed: string;
  memoryPeak: string;
};

type Response<T> = {
  data: T;
  header: HeaderResponse;
};

export type Params = {
  [KEY in string]: any;
};

axios.defaults.baseURL = process.env.BASE_URL;

export function useRequest() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  class Request {
    static post<T>(
      url: string,
      params?: Params,
      config = null
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .post<Response<T>>(
            url,
            params,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static get<T>(
      url: string,
      params?: Params,
      config?: object
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .get<Response<T>>(
            url,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
              params,
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static put<T>(
      url: string,
      params?: Params,
      config = null
    ): Promise<Response<T>> {
      return new Promise<Response<T>>((resolve, reject) => {
        axios
          .put<Response<T>>(
            url,
            params,
            config || {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
    static del(
      url: string,
      params?: Params,
      data?: Params
    ): Promise<Response<boolean>> {
      return new Promise<Response<boolean>>((resolve, reject) => {
        axios
          .delete<Response<boolean>>(url, {
            ...(data ? { data } : {}),
            headers: {
              "Content-Type": "application/json",
            },
            params,
          })
          .then((response: AxiosResponse) => {
            resolve(response.data);
          })
          .catch((e) => {
            reject(e.response.data);
          });
      });
    }
  }

  class Authorization {
    static signUp(data: Params): Promise<boolean> | null {
      return null;
    }

    static async signIn(data: LoginRequest): Promise<Response<LoginResponseData>>{
      try {
        const response = await axios.post("/signin", data);
        const { accessToken } = response.data; // Assuming the response contains the accessToken

        // Store the accessToken in local storage
        setAuthToken(accessToken);

        return response.data; // Return the response or any relevant data
      } catch (error) {
        throw new Error("Sign-in failed. Please try again."); 
      }
    }

    static signOut(): Promise<any> | null{
      return null;
    }
  }

  return { Request };
}
