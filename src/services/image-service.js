'use strict'

const Kraken = require("kraken");
const axios = require("axios");
const fs = require('fs');
const FormData = require('form-data');

const kraken = new Kraken({
    "api_key": "4de1b3eee452fd6823f2a6885e1a3c8f",
    "api_secret": "6e11f47083a92c543d0a4b5621a3084098a8a90a"
});


exports.upload = async(file) => {
    let dataForm = new FormData();
    let params = {
        auth: {
            api_key: "4de1b3eee452fd6823f2a6885e1a3c8f",
            api_secret: "6e11f47083a92c543d0a4b5621a3084098a8a90a"
        },
        wait: true
    }
    dataForm.append('data', JSON.stringify(params));
    dataForm.append('upload', fs.createReadStream(file));
    try {
        let result = await axios.post(`https://api.kraken.io/v1/upload`, dataForm, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return result;
      } catch (error) {
        console.log(error)
        return error;
      }
}