require("dotenv").config();

const axios = require("axios");


exports.handler = async(event, context) =>{

  try{
    
    let res = await axios.get(
      `https://api.nasa.gov/planetary/apod?count=12&api_key=${process.env.API_KEY}`
    )
   
    return{
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({err})
    }
  }
}