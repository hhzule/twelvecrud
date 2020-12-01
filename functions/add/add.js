// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb'),
    q = faunadb.query;

exports.handler = async (event, context) => {
    console.log(event.body)
    try {
        var client = new faunadb.Client({ secret: process.env.REACT_FAUNADB_SERVER_KEY });
        var task = JSON.parse(event.body)
        console.log(task, "task")
        var result = await client.query(
            q.Create(q.Collection('customers'), {
                data: {
                    task,
                },
            })
        );
        console.log("Document added Database: " + JSON.stringify(result));
        // ok
        return {
            statusCode: 200,
            body: JSON.stringify(result),

        }
    } catch (e) {
        // something went wrong
        console.log('Error: ');
        console.log(e);
    }
}
