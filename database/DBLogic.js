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

    await database.none(`DELETE FROM shifts WHERE waiterid = $1`, [
      waiterid,
    ]);
    for (let i = 0; i < weekdayid.length; i++) {
      const element = weekdayid[i];
      await database.any(
        "INSERT INTO shifts (waiterid, weekdayid) VALUES ($1, $2)",
        [waiterid, element]
      );
    }
  }

  async function joinFunction() {
    const daysQuery = `
                    SELECT * FROM shifts  
                    JOIN days ON days.id = shifts.weekdayid
                    JOIN waiters ON waiters.id = shifts.waiterid
                `;
    const results = await database.any(daysQuery);
    return results;
  }
  async function getWeekday() {
    await database.any("SELECT * FROM days");
  }
  async function getWaiters() {
    const result = await database.any("SELECT * FROM waiters");
    return result;
  }
  async function getWaiterSelectedDays(username) {
    try {
      
      let selectedDays = await database.any(
        `select DISTINCT weekdayid from shifts
    join waiters on waiters.id = shifts.waiterid
    join days on days.id = shifts.weekdayid
    where username = $1`,
        [username]
      );
     
      let weekdays = await database.any("SELECT * FROM days");
     
      for (let i = 0; i < weekdays.length; i++) {
        const weekday = weekdays[i];
      
        for (let y = 0; y < selectedDays.length; y++) {
          const waiterDays = selectedDays[y];
         
          if (weekday.id === waiterDays.weekdayid) {
            weekday.checked = "true";
          }
        }
      }
      return weekdays;
    } catch (error) {
      throw error;
    }
  }
  async function newWaiter(username){
    await database.any(
      "INSERT INTO waiters (username) VALUES ($1)",
      [username]
    )
  }

  async function getWaiterDays(username) {
    let id = await getWaiterId(username);
    const result = await database.any(`SELECT weekdayid FROM shifts WHERE waiterid = ${id}`);
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
    getWaiterSelectedDays,
    newWaiter
  };
}
