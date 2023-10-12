export default function WaiterAvailability(database) {
  let message

  async function addShift(theWaiterId,theDaysId){

    for (let i = 0; i < theDaysId.length; i++) {
     message= "inside"
      const element = parseInt(theDaysId[i]);
      console.log(element + " wait " + theWaiterId);
      await database.createRoster(theWaiterId,element)
      
    }
console.log(message);
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