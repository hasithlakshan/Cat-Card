const axios = require("axios")
module.exports = class MainService {
  timeout = 60000
  async get(path, params, headers = {}) {
    try {
      const response = await axios({
        url: path,
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        params,
        timeout: this.timeout,
        responseEncoding: 'binary'
      })
      return response
    } catch (error) {
      throw error
    }
  }
}
