'use strict';

const Model = require('objection').Model;

class Task extends Model {

    static get tableName() {
        return 'task';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'status'],
            properties: {

            }
        }
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',

                join: {
                    from: 'task.userId',
                    to: 'user.id'
                }
            }
        }
    }

}

module.exports = Task;
