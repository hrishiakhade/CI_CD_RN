import Realm from 'realm';

const ContinentSchema = {
    name: 'Continent',
    embedded: true,
    properties: {
        name: 'string',
    }
};

// class Continent extends Realm.Object { }
// Continent.schema = {
//     name: 'Continent',
//     embedded: true,
//     properties: {
//         name: 'string', // Define the type of the 'name' property
//     },
// };

class Language extends Realm.Object { }
Language.schema = {
    name: 'Language',
    embedded: true,
    properties: {
        code: 'string', // Define the type of the 'code' property
        name: 'string', // Define the type of the 'name' property
    },
};

export class Country extends Realm.Object { }
Country.schema = {
    name: 'Country',
    properties: {
        code: 'string',
        name: 'string',
        native: 'string',
        emoji: 'string',
        currency: 'string',
        phone: 'string',
        // continent: 'Continent',
        // languages: 'Language[]'
    },
};