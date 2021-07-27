const key = process.env.ALCHEMY_KEY
const secret = process.env.PINATA_SECRET

const axios = require('axios')

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: '7d5183df54583ac91482',
        pinata_secret_api_key:
          'e1a9d836eada572af393312879c5d93094396919f2a9f9933d7c29e36bf3caa8'
      }
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message
      }
    })
}
