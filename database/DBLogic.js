

export default function WaiterDBLogic(database) {

    async function checkExistingWaiter(username) {
        const result = await database.any('SELECT username FROM waiters WHERE username = $1', [username]);
        return result;
    }

    async function getWeekdayId(day) {
        let weekday_id = await database.one('SELECT id FROM weekdays WHERE weekday=$1', [day])
        return weekday_id;
    }
    async function createRoster(waiter_id, weekday_id) {
        try {
            await database.none('INSERT INTO schedule (waiter_id, weekday_id) VALUES ($1, $2)', [waiter_id, weekday_id]);
            return 'Days added successfully!';
        } catch (error) {
            return false
        }
    }

    async function joinQuery() {
        const daysQuery = `
                    SELECT  * FROM schedule
                    JOIN weekdays ON weekdays.id = schedule.weekday_id
                    JOIN waiters ON waiters.id = schedule.waiter_id
                `;

        const results = await database.any(daysQuery);
        return results;
    }



    async function getWaiterId(username) {
        const result = await database.one('SELECT id FROM waiters WHERE username = $1', [username]);

        if (result) {
            return result.id;
        }
    
    }

    async function reset() {
        await database.none('DELETE FROM schedule')
    }

 
    return {
        checkExistingWaiter,
        getWeekdayId,
        createRoster,
        joinQuery,
        getWaiterId,
        reset,

    }
}