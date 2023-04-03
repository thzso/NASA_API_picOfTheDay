require("dotenv").config();

const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const { date } = event.queryStringParameters;

    let res = await axios.get(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    // const message = await err.response.data.msg;

    // if (message.startsWith("Date must be between")) {
    //   const yesterdayObj = ((d) => new Date(d.setDate(d.getDate() - 1)))(
    //     new Date()
    //   );
    //   let day = yesterdayObj.getDate();
    //   if (day < 10) {
    //     day = `0${day}`;
    //   }
    //   const month = yesterdayObj.getMonth() + 1;
    //   const year = yesterdayObj.getFullYear();
    //   const yesterday = `${year}-0${month}-${day}`;

    //   const res = await axios(
    //     `https://api.nasa.gov/planetary/apod?date=${yesterday}&api_key=${process.env.API_KEY}`
    //   );
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(res.data),
    //   };
    // } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ err }),
      };
    }
  
};
