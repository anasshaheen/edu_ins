const mongoose = require('mongoose');

const SyllableSection = require('./syllableSection');

const Syllable = mongoose.Schema({
  sections: [SyllableSection]
});

module.exports = Syllable;
