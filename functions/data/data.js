// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    var client = new faunadb.Client({ secret: process.env.REACT_FAUNADB_SERVER_KEY });
    var result = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('all_customers') // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );
    console.log("Document retrived from Container in Database: " + JSON.stringify(result.data));

    // ok
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),

    }
  } catch (error) {
    console.log('Error: ');
    console.log(error);
  }
}
