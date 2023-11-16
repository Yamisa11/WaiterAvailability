import assert from "assert"
import waiterDBLogic from "../database/DBLogic.js";
import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/waiterapp';

const db = pgPromise()(connectionString);
describe('Waiter Availability App database tests', () => {
    let registrationDBLogic = waiterDBLogic(db)

    beforeEach(async () => {
        await registrationDBLogic.reset()
    })

    it('should check if an existing waiter with a given username exists', async () => {
        const result = await dbLogic.checkExistingWaiter('Keesha');
        assert.deepStrictEqual(result, []);
      });

   
    
})