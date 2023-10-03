export default function WaiterAvailabilityDB(database){

    async function createUser(username,theRole) {
        await database.oneOrNone('INSERT INTO users (username, userrole) VALUES ($1, $2)', [username, theRole])
    }

    return{
        createUser
    }
}