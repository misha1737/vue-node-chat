//var mongoose = require('../libs/mongoose');
var Cat = require('./models/cats.js').Cat;
// var cat= new Cat({
//     catName:'Misha',
//     catAge:25
// }
// )

// cat.save(function(err, cat, affected){
//                    console.log(arguments)
//                  });

Cat.find({}).then(cat=>{
    console.log(cat[0].catAge);
    }
)