export default function WaiterAvailability(database) {

    async function setUsers(username,theRole){
        await database.createUser(username,theRole)
    }

    async function getMondayRoster(){
        let monRoster = await database.getEmployees('MONDAY')
        return monRoster
    }

    async function getTuesdayRoster(){
        let tuesRoster = await database.getEmployees('TUESDAY')
        return tuesRoster
    }

    async function getWednesdayRoster(){
        let wedRoster = await database.getEmployees('WEDNESDAY')
        return wedRoster 
    }

    async function getThursdayRoster(){
        let thursRoster = await database.getEmployees('THURSDAY')
        return thursRoster
    }

    async function getFridayRoster(){
        let friRoster = await database.getEmployees('FRIDAY')
        return friRoster 
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