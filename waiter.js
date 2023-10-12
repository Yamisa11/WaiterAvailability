export default function WaiterAvailability(database) {
 

  async function addShift(theWaiterId,theDaysId){
    await database.createRoster(theWaiterId,theDaysId)
  }

async function getAllWaiters(){
    let waiters = await database.getWaiters()
    return waiters
}
async function assignDays(){
  let results = await database.joinFunction()
  const weekdaysData = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };
  
  results.forEach((item) => {
    const { username, weekday } = item;
    const day = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase(); // Capitalize the first letter of the weekday

    if (weekdaysData[day]) {
      weekdaysData[day].push(username);
    } else {
      console.error(`Invalid weekday: ${weekday}`);
    }
  });

  return weekdaysData;
}
    return{
    addShift,
    getAllWaiters,
    assignDays
    }
}