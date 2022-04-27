const mongoose = require("mongoose");
const VoteSchema = new mongoose.Schema({
  transactions: Array,
  nonce: Number,
  timestamp: Date,
  previousHash: String,
  hash: String,
});
module.exports = mongoose.model("pollschain", VoteSchema);
