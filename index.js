const textToImage = require("text-to-image");
var QRCode = require('qrcode')
const fs = require('fs')
const joinImages =  require('join-images');



let texto = ''
let qr = ''

const funcion = async () => {
  const dataUri = await textToImage.generate("ABC-541\nSERVICIO TECNICO\nALMACENES UNIVERSAL", {
    debug: true,
    maxWidth: 250,
    fontSize: 20,
    fontFamily: "Arial",
    lineHeight: 30,
    margin: 5,
    // bgColor: "blue",
    // textColor: "red",
  });

//   console.log({
//     dataUri,
//   });

  fs.writeFileSync('image.txt', dataUri)
  texto = dataUri.split(',')[1]

  QRCode.toDataURL('ABC541', function (err, url) {
    console.log({url})
    qr = url.split(',')[1]

    joinImages.joinImages([Buffer.from(qr, 'base64'), Buffer.from(texto, 'base64')]).then((img) => {
        // Save image as file
        console.log({ img })
        img.toFile('out.png');
      });
  })
};

funcion();








