
import Filter from 'bad-words';

const filter = new Filter();

export const badWordsFilter = {

    /**
     * validate the sentence have the bad words
     */
    isBadWordsFilter: (str, badWords, applyBadWordsToFilter)=> {
        if (!badWords.isAddedWordFilter && badWords.data.length > 0) {
            filter.addWords(...badWords.data);
            applyBadWordsToFilter();
        }

        return filter.isProfane(str);
    }
}