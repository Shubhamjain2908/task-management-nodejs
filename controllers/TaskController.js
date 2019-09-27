'use strict';

const Task = require('./../models/Task');

const createTask = async (req, res) => {
    let data = req.body, err, insertedTask;
    const user = req.user;
    data.userId = user.id;
    data.status = 'ON';
    [err, insertedTask] = await to(Task.query().insertAndFetch(data));
    if (err) return ReE(res, err, 422);
    return createdResponse(res, insertedTask, 'Task created successfully.');
}

const fetchTasks = async (req, res) => {
    const user = req.user
    let err, tasks;
    [err, tasks] = await to(Task.query().where('userId', user.id));
    if (err) return ReE(res, err, 422);
    return okResponse(res, tasks);
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const taskExists = await Task.query().where('id', id).andWhere('userId', req.user.id);
    if (!taskExists) {
        return badRequestError(res, 'No task exists with this Id or the task does not belong to this user!');
    }
    let updatedData = await Task.query().patchAndFetchById(id, req.body);
    return okResponse(res, updatedData);
}

const updateStatus = async (req, res) => {
    let status = req.body.status;
    if (!status) {
        return badRequestError(res, 'Requests expects a Status.');
    }
    status = status.toUpperCase();
    if (status === 'ON' || status === 'INPROGRESS' || status === 'DONE') {
        const id = req.params.id;
        const taskExists = await Task.query().where('id', id).andWhere('userId', req.user.id);
        if (!taskExists) {
            return badRequestError(res, 'No task exists with this Id or the task does not belong to this user!');
        }
        let updatedData = await Task.query().patchAndFetchById(id, { status: status });
        return okResponse(res, updatedData);
    } else {
        return badRequestError(res, 'Invalid status');
    }

}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    let QUERY = Task.query().where('id', id).andWhere('userId', req.user.id);
    const taskExists = await QUERY;
    if (!taskExists) {
        return badRequestError(res, 'No task exists with this Id or the task does not belong to this user!');
    }
    await QUERY.del();
    return noContentResponse(res, 'Deleted!!!');
}

const dashboard = async (req, res) => {
    const userId = req.user.id;
    const totalTask = await Task.query().where('userId', userId).count().then(c => c[0].count);
    const totalCompletedTask = await Task.query().where('userId', userId).andWhere('status', 'DONE').count().then(c => c[0].count);
    const totalPendingTask = await Task.query().where('userId', userId).andWhere('status', 'ON').count().then(c => c[0].count);
    const totalInprogressTask = await Task.query().where('userId', userId).andWhere('status', 'INPROGRESS').count().then(c => c[0].count);
    const data = {
        totalTask,
        totalCompletedTask,
        totalInprogressTask,
        totalPendingTask
    }
    return successResponse(res, 200, data, 'Successfully get');
}

module.exports = {
    createTask,
    fetchTasks,
    updateTask,
    updateStatus,
    deleteTask,
    dashboard
}