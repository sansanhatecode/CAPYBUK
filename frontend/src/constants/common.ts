export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  USERNAME:
    /^[a-zA-Z0-9\uac00-\ud7af|\u1100-\u11ff|\u3130-\u318f|\ua960-\ua97f|\ud7b0-\ud7ff\s]{1,30}$/,
};

export enum REACTION {
  "LIKE" = "👍",
  "LOVE" = "❤️",
  "HAHA" = "😂",
  "WOW" = "😮",
  "SAD" = "😢",
  "ANGRY" = "😡"
}
