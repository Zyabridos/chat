import { useEffect } from 'react';
import leoProfanity from 'leo-profanity';
import forbiddenWords from '../dictionary/index.js';

const useProfanityFilter = () => {
  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    forbiddenWords.forEach((word) => leoProfanity.add(word));
  }, []);
};

export default useProfanityFilter;