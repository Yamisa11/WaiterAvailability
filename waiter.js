export default function WaiterAvailability(database) {

  async function addShift(theWaiterId,theDaysId){
let message = ""
   if (theDaysId == undefined) {
    message = "Please select your days"
    return message
   }else{
    for (let i = 0; i < theDaysId.length; i++) {
 
      const element = parseInt(theDaysId[i]);
     
      await database.createRoster(theWaiterId,element)
      
    }

   }
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
    const day = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase(); 

    if (weekdaysData[day]) {
      weekdaysData[day].push(username);
    } else {
      console.error(`Invalid weekday: ${weekday}`);
    }
  });

  return weekdaysData;
}
async function checkClass(daysArray){
 if (daysArray.length == 3) {
  return "success"
 } else if (daysArray.length < 3 && daysArray.length > 0) {
  return "warning"
 } else if (daysArray.length > 3) {
  return "danger"
 }
}

async function getCheckedDays(username,checkboxDays,isWeekdayChecked){
 let result = await getWaiterDays(username)
  isWeekdayChecked.checked = false

  // Check if any object in the result has weekdayid equal to 2
  for (const row of result) {
      for (let i = 0; i < checkboxDays.length; i++) {
        const element = checkboxDays[i];
        if (row.weekdayid === element) {
          isWeekdayChecked = true;
          break; // No need to continue checking once found
      }
      }
  }
}
    return{
    addShift,
    getAllWaiters,
    assignDays,
    checkClass,
    getCheckedDays
    }
}