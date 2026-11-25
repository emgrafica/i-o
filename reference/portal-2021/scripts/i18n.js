const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const jsonStableStringify = require('json-stable-stringify');
const dotenv = require('dotenv');
const querystring = require('query-string');

dotenv.config();

const endpoint = process.env['I18N_TRANSLATOR_ENDPOINT'];
const subscriptionKey = process.env['I18N_APIM_SUBSCRIPTION_KEY'];
const authUrl = process.env['I18N_AUTH_URL'];
const clientId = process.env['I18N_APIM_CLIENT_ID'];
const clientSecret = process.env['I18N_APIM_CLIENT_SECRET'];
const grantType = process.env['I18N_APIM_GRANT_TYPE'];
const scope = process.env['I18N_APIM_SCOPE'];


const RETRY_COUNT = process.env['I18N_RETRY_TRANSLATION_COUNT'];


const englishDictionariesPath = 'src/i18n/en';
const generatedDictionariesPath = 'src/i18n/generated';
const translationLanguages = [
  'de',
  'es',
  'fr',
  'it',
  'hu',
  'pl',
  'ru',
  'zh-Hans',
  'ja',
  'ko',
  'pt',
];

// list of words to skip from translation across the entire app
const globalSkipWords = ['GE', '404'];

// console colors
const red = '\x1b[31m';
const green = '\x1b[32m';
const resetColor = '\x1b[0m';

/** Deletes old translations leaving only the root language directory */
const deleteOldTranslations = function() {
  translationLanguages.forEach(language => {
    const languageDirectory = path.join(generatedDictionariesPath, language);
    fs.rmdirSync(languageDirectory, {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(languageDirectory);
  });
};

/** Generates the directories to store the new translation files */
const generateTranslationDirectories = function(dirPath) {
  dirPath = dirPath || englishDictionariesPath;
  const childrenFiles = fs.readdirSync(dirPath);
  childrenFiles.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      translationLanguages.forEach(language => {
        const languageDir = path.join(generatedDictionariesPath, language);
        const generatedDir = path.join(
          languageDir,
          filePath.slice(englishDictionariesPath.length),
        );
        fs.mkdirSync(generatedDir);
      });
      generateTranslationDirectories(filePath);
    }
  });
};

/** Clones i18n/en/index.ts to all other directory languages */
const cloneIndexDotTs = function() {
  const source = path.join(englishDictionariesPath, 'index.ts');
  translationLanguages.forEach(language => {
    const destiny = path.join(generatedDictionariesPath, language, 'index.ts');
    fs.copyFileSync(source, destiny);
  });
};

/** Gets list of all the files to translate */
const getFilesRecursively = function(dirPath, result) {
  result = result || [];
  const childrenFiles = fs.readdirSync(dirPath);
  childrenFiles.forEach(function(file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory())
      result = getFilesRecursively(path.join(dirPath, file), result);
    else if (path.extname(filePath).toLowerCase() === '.json')
      result.push(filePath);
  });
  return result;
};

/** Gets the list of terms to translate in a given dictionary recursively */
const getTermsRecursively = function(obj, result) {
  result = result || [];
  const type = typeof obj;
  if (type === 'string') result.push(obj);
  else if (type === 'array')
    obj.forEach(item => getTermsRecursively(item, result));
  else if (type === 'object')
    for (const key in obj) {
      const value = obj[key];
      getTermsRecursively(value, result);
    }
  return result;
};

/**
 * Gets list of interpolations on a give dictionary,
 * these are then skipped from the translation
 */
function getInterpolations(dictionary) {
  const terms = getTermsRecursively(dictionary);
  let interpolations = [];
  const regex = /{{[^{}]*}}/g;
  terms.forEach(value => {
    [...value.matchAll(regex)].forEach(match => {
      interpolations.push(match[0]);
    });
  });
  interpolations = [...new Set(interpolations)];
  return interpolations;
}

/* Translates a given dictionary */
const translate = async (dictionary, skipWords, authorization) => {
  const headers = {
    Authorization: authorization,
    'Ocp-Apim-Subscription-Key': subscriptionKey
  }
  const params = {
    languages: translationLanguages.join(','),
    skipWords: [...skipWords, ...globalSkipWords].join(','),
    from: 'en'
  };
  
  const {data} = await axios.post(`${endpoint}`, dictionary, {params, headers})
  return data;
};

/* Generates translation files for a given dictionary file and translation */
const generateTranslationFiles = (translations, file) => {
  translations.forEach(translation => {
    const language = translation.language;
    const dictionary = translation.value;
    const dictionaryPath = path.join(
      generatedDictionariesPath,
      language,
      file.slice(englishDictionariesPath.length),
    );
    const dictionaryJson = jsonStableStringify(dictionary, { space: '  ' });
    fs.writeFileSync(dictionaryPath, dictionaryJson);
  });
};

async function getAuthorization(){
  const data = {
    grant_type: grantType,
    client_id: clientId,
    scope: scope,
    client_secret: clientSecret
  };
  const options = {
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const response = await axios.post(`${authUrl}`, querystring.stringify(data), options);
  return `${response.data.token_type} ${response.data.access_token}`;
}

/*
/* Translates and generates all the dictionaries,
/* translations are performed asynchronously
*/
const translateFiles = async files => {
  let retryCount = RETRY_COUNT;
  let count = 0;
  let errorEncountered = false;
  const authorization = await getAuthorization();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dictionary = require(path.join('../', file));
    let skipWords = getInterpolations(dictionary);
    try {
      const translations = await translate(dictionary, skipWords, authorization);
      generateTranslationFiles(translations, file);
      console.log(
        `  [${++count}/${files.length}] ${file.slice(
          englishDictionariesPath.length + 1,
        )} ${green}translated${resetColor}`,
      );
    } catch (error) {
      if (retryCount-- > 0) {
        console.log(`  ${red}Retrying failed request.${resetColor}`);
        i--;
        await sleep(1000);
        continue;
      }
      errorEncountered = true;
      console.error(
        `  [${++count}/${files.length}] ${file.slice(
          englishDictionariesPath.length + 1,
        )} ${red}failed to translate${resetColor}`,
      );
    }
    if (count === files.length) {
      console.log(
        `Translation completed ${
          errorEncountered ? red + 'with errors' : green + 'successfully'
        }${resetColor}!`,
      );
    }
    retryCount = RETRY_COUNT;
  }
};

/**
* @param {*} ms Time in milliseconds for the process to be blocked
* @returns
*/
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Performs the i18n dictionaries translations */
console.log('Deleting old translations.');
deleteOldTranslations();

console.log('Generating translation directories.');
generateTranslationDirectories();

console.log('Cloning index.ts.');
cloneIndexDotTs();

console.log('Listing dictionary files to translate.');
const files = getFilesRecursively(englishDictionariesPath);

console.log('Translating files:');
translateFiles(files);
