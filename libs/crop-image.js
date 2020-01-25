saveCropImage = async function(login, url, coordinates, user){
    const sharp = require('sharp');
    coordinates= JSON.parse(coordinates);
  //обрезка
  console.log(url);
  await sharp('uploads/'+url)
  .rotate()
  
  .resize()
  .extract({
    left: coordinates.left,
    top: coordinates.top,
    width: coordinates.width,
    height: coordinates.height,
  })
  .toBuffer()
  .then( data => {
    require("fs").writeFile('uploads/'+url, data, 'base64', 
    function(err, data) {
    if (err) {
        console.log('err', err);
    }
    console.log('success');

    user.update({ logoUrl:  url },  function(err){
        console.log(err)
        });
        console.log(url);
        

    });
  })
  .catch( err => { console.log(err)
}
);
return { login: login, logoUrl:url };  
  };
  module.exports = saveCropImage;