export default function WaiterDBLogic(database) {
  async function checkExistingWaiter(username) {
    const result = await database.any(
      "SELECT username FROM waiters WHERE username = $1",
      [username]
    );
    return result;
  }

  async function getWeekdayId(day) {
    let weekday_id = await database.one(
      "SELECT id FROM weekdays WHERE weekday=$1",
      [day]
    );
    return weekday_id;
  }
  async function getWaiterId(username) {
    const result = await database.one(
      "SELECT id FROM waiters WHERE username = $1",
      [username]
    );

    if (result) {
      return result.id;
    }
  }
  async function createRoster(waiterid, weekdayid) {
    await database.any(
      "INSERT INTO shifts (waiterid, weekdayid) VALUES ($1, $2)",
      [waiterid, weekdayid]
    );
  }

  async function joinFunction() {
    const daysQuery = `
                    SELECT  * FROM shifts  
                    JOIN days ON days.id = shifts.weekdayid
                    JOIN waiters ON waiters.id = shifts.waiterid
                `;
    const results = await database.any(daysQuery);
    return results;
  }
  async function getWeekday(id) {
    await database.any("SELECT weekday FROM days WHERE id = $1", [id]);
  }
  async function getWaiters() {
    const result = await database.any("SELECT * FROM waiters");
    return result;
  }

  async function getWaiterDays(username) {
    let id = await getWaiterId(username);
    const result = await database.any(
      `SELECT weekdayid FROM shifts WHERE waiterid = ${id}`
    );
    return result;
  }
  async function reset() {
    await database.none("truncate shifts");
  }



  return {
    checkExistingWaiter,
    getWeekdayId,
    createRoster,
    getWaiterId,
    reset,
    getWeekday,
    getWaiters,
    joinFunction,
    getWaiterDays,
  };
}
