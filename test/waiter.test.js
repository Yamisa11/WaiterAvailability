import assert from "assert"
import waiterDBLogic from "../database/DBLogic.js";
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/waiterapp';

const db = pgPromise()(connectionString);
describe('Waiter Availability App database tests', () => {
    let registrationDBLogic = waiterDBLogic(db)


   
    
})
