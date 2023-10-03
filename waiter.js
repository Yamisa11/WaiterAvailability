export default function WaiterAvailability(database) {

    async function setUsers(username,theRole){
        await database.createUser(username,theRole)
    }

    async function getMondayRoster(){
        let monRoster = await database.getEmployees('MONDAY')
        return monRoster
    }

    async function getTuesdayRoster(){
        let monRoster = await database.getEmployees('TUESDAY')
        return monRoster
    }

    async function getWednesdayRoster(){
        let monRoster = await database.getEmployees('WEDNESDAY')
        return monRoster 
    }

    async function getThursdayRoster(){
        let monRoster = await database.getEmployees('THURSDAY')
        return monRoster
    }

    async function getFridayRoster(){
        let monRoster = await database.getEmployees('FRIDAY')
        return monRoster 
    }

    async function getSaturdayRoster(){
        let satRoster = await database.getEmployees('SATURDAY')
        return satRoster  
    }

    return{
        setUsers,
        getFridayRoster,
        getMondayRoster,
        getSaturdayRoster,
        getThursdayRoster,
        getWednesdayRoster,
        getTuesdayRoster
    }
}