export interface IUser {
    id: string;
    email: string;
    avatar?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    followerId?: string;
    refreshToken?: string;
    about?: string;
}
