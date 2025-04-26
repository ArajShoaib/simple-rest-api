const db = require('../models');
const { validateNewUser } = require('../validations/Users.validation');
const passwordGeneratorAndVerifierService = require('../services/PasswordGeneratorAndVerifier');

exports.getUsers = async (req, res) => {
    try {
        let page = req?.query?.page && parseInt(req?.query?.page) > 0 ? parseInt(req?.query?.page) : 1
        let limit = req?.query?.limit && parseInt(req?.query?.limit) > 0 ? parseInt(req?.query?.limit) : 50
        let startIndex = (page - 1) * limit;

        let users = await db.Users.find({ is_active: true }, { full_name: 1, email: 1, is_email_verified: 1 }).limit(limit).skip(startIndex).sort({ created_at: -1 }).lean();
        if (users) {
            return res.status(200).send({ success: true, message: 'OK', data: { users } });
        }
        else {
            return res.status(500).send({ success: false, message: 'An error occured in getting users!', data: {} });
        }
    }
    catch (error) {
        console.log({ getUsers: error });
        return res.status(500).send({ success: false, message: 'An error occured! ' + error });
    }
}

exports.addUser = async (req, res) => {
    try {
        let body = req.body;
        const validateUser = await validateNewUser.validateAsync({ full_name: body?.full_name, email: body?.email, password: body?.password });
        if (validateUser) {
            let checkEmail = await db.Users.findOne({ email: validateUser?.email });
            if (!checkEmail) {
                let hash = await passwordGeneratorAndVerifierService.createPasswordHash(validateUser?.password, saltRounds = 10);
                if (hash != 'error') {
                    let payload = {
                        ...validateUser,
                        password: hash,
                    }
                    let user = await db.Users(payload).save();
                    if (user) {
                        return res.status(200).send({ success: true, message: 'OK! New user added successfully.', data: user });
                    }
                    else {
                        return res.status(500).send({ success: false, message: 'An error occured in creating influencer!', data: {} });
                    }
                }
                else {
                    return res.status(500).send({ success: false, message: 'Password creation failed!', data: {} });
                }
            }
            else {
                return res.status(400).send({ success: false, message: 'A user with this email already exist!', data: {} });
            }
        }
        else {
            return res.status(422).send({ success: false, message: 'Auth validation failed!' });
        }
    }
    catch (error) {
        console.log({ addUsers: error });
        if (error?.isJoi) {
            return res.status(422).send({ success: false, message: error });
        }
        return res.status(500).send({ success: false, message: 'An error occured! ' + error });
    }
}