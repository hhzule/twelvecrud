// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-meth


const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  console.log(event.body)
  try {
    var client = new faunadb.Client({ secret: process.env.REACT_FAUNADB_SERVER_KEY });
    var id = JSON.parse(event.body)
    console.log(id, "id")
    var result = await client.query(q.Delete(q.Ref(q.Collection('customers'), id)));

    console.log("Document deleted: " + JSON.stringify(result));
    // ok
    return {
      statusCode: 200,
      body: JSON.stringify(result),

    }
  } catch (e) {
    // something went wrong
    console.log('Error: ');
    return { statusCode: 500, body: error.toString() }
  }
}