let mongoose=require('mongoose');

const restaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone_number: { type: String, required: true },
  genre: { type: String, required: true },
  
});

const restaModel = mongoose.model('Resta', restaSchema);

module.exports = restaModel;