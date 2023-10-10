export default function WaiterAvailability(database) {

  async function addShift(theWaiterId,theDaysId){
    await database.createRoster(theWaiterId,theDaysId)
  }

async function getAllWaiters(){
    let waiters = await database.getWaiters()
    return waiters
}
    return{
    addShift,
    getAllWaiters
    }
}