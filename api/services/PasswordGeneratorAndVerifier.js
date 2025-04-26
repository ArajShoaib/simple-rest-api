const bcrypt = require('bcrypt');

exports.createPasswordHash = async (password, saltRounds = 10) => {
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        console.log({ createPasswordHash: JSON.stringify(error) })
        return 'error'
    }
}

exports.verifyPassword = async (password, hash) => {
    try {
        let match = await bcrypt.compare(password, hash);
        return match;
    }
    catch (error) {
        console.log({ verifyPassword: JSON.stringify(error) })
        return false;
    }
}