export default function WaiterAvailabilityDB(database){

    async function createUser(username,theRole) {
        await database.oneOrNone('INSERT INTO users (username, userrole) VALUES ($1, $2)', [username, theRole])
        await database.none('INSERT INTO shifts (employee, monday, tuesday, wednesday, thursday, friday, saturday) VALUES ($1, false, false, false, false, false, false)', [username])
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
      
    async function updateEmployeeRoster(theDay,username){
        await database.any(`UPDATE shifts SET ${theDay} = true WHERE employee = $1`, [username] )
    }

    return{
        createUser,
        getEmployees,
        updateEmployeeRoster
    }
}