export default function WaiterAvailability(database) {

  async function addShift(theWaiterId,theDaysId){
    await database.createRoster(theWaiterId,theDaysId)
  }


    return{
    addShift
    }
}