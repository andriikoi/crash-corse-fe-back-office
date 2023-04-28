import Requester from './index';

class UserApi extends Requester {
    constructor() {
        super();
    }

    public async login(payload) {
        return this.instance.post('/users/signin', payload);
    }
}

export default new UserApi();
