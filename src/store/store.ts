import { produce } from "immer";
import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { IUser } from "../types";


interface State {
  auth?: {
    user: IUser;
    token: string;
  };
}


interface ActionMap {
  login: State['auth'];
  logout: null;
}

type Action<K extends keyof ActionMap> = {
  type: K;
  payload?: ActionMap[K];
};


const initialState: State = {
  auth: {
    user: JSON.parse(localStorage?.getItem('user') as string),
    token: localStorage.getItem('token') as string,
  },
};

const reducer = (state: State, action: Action<keyof ActionMap>) =>
  produce(state, draft => {
    switch (action.type) {
      case 'login':
        draft.auth = action.payload ?? undefined;
        break;
      case 'logout':
        draft.auth = undefined;
        break;
      default:
        break;
    }
  });

export const useReduxStore = create(devtools(redux(reducer, initialState,)));

