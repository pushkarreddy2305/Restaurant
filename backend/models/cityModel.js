let mongoose=require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },

  state_id: { type: String, required: true, default: false },
});

const cityModel = mongoose.model('City', citySchema);

module.exports = cityModel;