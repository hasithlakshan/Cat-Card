const MainService = require('./MainService');

const mainService = new MainService();
/**
 * this cat service funtion will return the cat image data
 * @param  {string} path image path
 * @return {Promise<void|*>} image details
 */
const getCat = async (path) => {
  try {
    const response = await mainService.get(path);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getCat,
};
