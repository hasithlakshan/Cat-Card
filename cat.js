let { writeFile } = require("fs")
let { join } = require("path")
let blend = require("@mapbox/blend")
let argv = require("minimist")(process.argv.slice(2))

const { getCat } = require("./services/CatService")

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv

const createImage = async () => {
  try {
    const firstResponse = await getCat(
      "https://cataas.com/cat/says/" +
        greeting +
        "?width=" +
        width +
        "&height=" +
        height +
        "&color" +
        color +
        "&s=" +
        size
    )
    console.log('Received response with status:' + firstResponse.status);
    const secondResponse = await getCat(
      "https://cataas.com/cat/says/" +
        who +
        "?width=" +
        width +
        "&height=" +
        height +
        "&color" +
        color +
        "&s=" +
        size
    )
    console.log('Received response with status:' + secondResponse.status);
    mergeImages(firstResponse.data, secondResponse.data)
  } catch (error) {
    console.log(error)
    return
  }
}
const mergeImages = (firstImage, secondImage) =>
  blend(
    [
      {
        buffer: new Buffer.from(firstImage, "binary"),
        x: 0,
        y: 0,
      },
      {
        buffer: new Buffer.from(secondImage, "binary"),
        x: width,
        y: 0,
      },
    ],
    {
      width: width * 2,
      height: height,
      format: "jpeg",
    },
    (err, data) => {
      const fileOut = join(process.cwd(), `/cat-card.jpg`)
      writeFile(fileOut, data, "binary", (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.log("The file was saved!")
      })
    }
  )

createImage()
