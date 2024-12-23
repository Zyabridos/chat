import profanityWordsRU from './profanity/profanityRU';
import profanityWordsEN from './profanity/profanityEN';

const forbiddenWords = [profanityWordsEN, profanityWordsRU].flat();
export default forbiddenWords;
