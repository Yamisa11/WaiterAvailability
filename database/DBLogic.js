export default function WaiterAvailabilityDB(database){

    async function createUser(username,theRole) {
        await database.oneOrNone('INSERT INTO users (username, userrole) VALUES ($1, $2)', [username, theRole])
    }
    async function getEmployees(theDay) {
        const result = await database.any('SELECT username FROM shifts WHERE ${theDay} = true')
        return result
    }


    return{
        createUser,
        getEmployees
    }
}