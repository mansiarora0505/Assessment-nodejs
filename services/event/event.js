const event = require("../../db/modals/event");

class Event {
    static async getCount() {
        return await event.count();
    }

    static async findEvents(offset, limit) {
        return event.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [['start_time', 'ASC']]
        });

    }
    static async addEvent(body) {
        return await event.findOrCreate({
            where: {
                e_name: body.e_name,
                e_date: body.e_date
            },
            defaults: {
                e_name: body.e_name,
                location: body.location,
                e_date: body.e_date,
                start_time: body.start_time,
                end_time: body.end_time
            }
        });
    }
}
module.exports = Event;