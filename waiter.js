export default function WaiterAvailability(database) {

    async function setUsers(username,theRole){
        await database.createUser(username,theRole)
    }

    return{
        setUsers
    }
}