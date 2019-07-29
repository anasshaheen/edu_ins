import { Schema } from 'mongoose';

import SyllableSection from './syllableSection';

const Syllable = new Schema({
  sections: [SyllableSection],
});

export default Syllable;
