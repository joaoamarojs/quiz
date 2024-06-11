const { v4: uuidv4 } = require('uuid');

class Users {
    constructor() {
        this.users = new Map();
    }
        
    addUser(name, score, socket) {
        let id = uuidv4();
        let user = { id, name, score, socket};
        this.users.set(id, user);
        this
        return user;
    }

    getUserById(id) {
        return this.users.get(id);
    }

    setUserScoreById(id, score) {
        let user = this.users.get(id);
        user.score = score;
    }

    getAllNamesAndScores() {
        const results = [];
        for (let user of this.users.values()) {
            results.push({ name: user.name, score: user.score });
        }
        return results;    
    }
}

module.exports = Users;