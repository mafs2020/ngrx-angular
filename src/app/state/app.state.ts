import { UsersState } from "./user.reduce";

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
    user: UsersState;
}
