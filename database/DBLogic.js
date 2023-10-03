export default function WaiterAvailabilityDB(database){

    async function createUser(username,theRole) {
        await database.oneOrNone('INSERT INTO users (username, userrole) VALUES ($1, $2)', [username, theRole])
    }
    async function getEmployees(theDay) {
        let result =[]
        let temp = await database.any(`SELECT employee FROM shifts WHERE ${theDay} = true`);
        for (let i = 0; i < temp.length; i++) {
            const element = temp[i].employee;
            result.push(element)
        }
        return result;
      }
      


    return{
        createUser,
        getEmployees
    }
}