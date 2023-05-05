import Requester from './index';
import { IUser } from '../../interfaces/user';

class UserApi extends Requester {
    constructor() {
        super();
    }

    public async login(payload) {
        return this.instance.post('/users/signin', payload);
    }

    public async update(payload: Partial<IUser>): Promise<IUser> {
        return this.instance.patch(`/users/update-me`, payload);
    }

    public async getMe() {
        return this.instance.get(`/users/me`);
    }
}

export default new UserApi();
