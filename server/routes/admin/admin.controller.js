const { Types: { ObjectId } } = require('mongoose');
const { validationResult } = require('express-validator');

const Supervisor = require('../../models/Supervisor');
const Entry = require('../../models/Entry');
const User = require('../../models/User');


exports.createSupervisor = async (req, res, next) => {
    validationResult(req).throw();

    const { name } = req.body;

    const existingSupervisor = await Supervisor.exists({ name });
    if (existingSupervisor) return res.status(409).json({ errorMsg: `User with same name already exists.` });

    const newSupervisor = new Supervisor({ name });
    await newSupervisor.save();

    req.io.emit('new-supervisor', newSupervisor);

    return res.status(201).json(newSupervisor);
};

exports.deleteSupervisor = async (req, res, next) => {
    const { _id } = req.params;

    const supervisor = await Supervisor.findOne({ _id }, {});
    if (!supervisor) return res.status(404).json({ errorMsg: `Supervisor not found.` });

    await Entry.deleteMany({ $or: [{ from: supervisor._id }, { to: supervisor._id }] });

    await supervisor.remove();

    req.io.emit('delete-supervisor', supervisor);

    return res.status(200).json(supervisor);
};

exports.updateSupervisor = async (req, res, next) => {
    validationResult(req).throw();

    let { _id } = req.params;
    const { name } = req.body;

    try {
        _id = ObjectId(_id);
    } catch (err) { return res.status(422).json({ errorMsg: `Invalid Id.` }); }

    const supervisor = await Supervisor.findOne({ _id });
    if (!supervisor) return res.status(404).json({ errorMsg: `Supervisor not found.` });

    if (name === supervisor.name) return res.status(422).json({ errorMsg: `Please enter new name.` });

    const existingSupervisorWithSameName = await Supervisor.exists({ name });
    if (existingSupervisorWithSameName) return res.status(409).json({ errorMsg: `User with same name already exists.` });

    await supervisor.set({ name }).save();

    req.io.emit('update-supervisor', supervisor);

    return res.status(200).json(supervisor);
};

exports.fetchAccounts = async (req, res, next) => {
    const users = await User.find().select({ emailVerificationString: 0, password: 0, __v: 0 })
                                    .sort({ admin: -1 })
                                    .limit(50);

    return res.status(200).json(users);
};

exports.deleteAccount = async (req, res, next) => {
    let { _id } = req.params;

    try {
        _id = ObjectId(_id);
    } catch (err) { return res.status(422).json({ errorMsg: `Invalid Id.` }); }

    const account = await User.findById(_id);
    if (!account) return res.status(404).json({ errorMsg: `Account not found` });
    await account.remove();

    req.io.emit('delete-account', account);

    return res.status(200).json(account);
};