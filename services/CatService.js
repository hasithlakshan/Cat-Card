const MainService = require("./MainService")

const mainService = new MainService()

const getCat = async (path) => {
  try {
    const response = await mainService.get(path)
    return response
  } catch (error) {
    return error
  }
}

module.exports = {
  getCat
}
