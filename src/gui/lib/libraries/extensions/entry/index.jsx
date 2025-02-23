/**
 * This is an extension for Xcratch.
 */

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';
import translations from './translations.json';

/**
 * Formatter to translate the messages in this extension.
 * This will be replaced which is used in the React component.
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const version = 'v1.0.1';

const entry = {
    get name () {
        return formatMessage({
            id: 'costumex.entry.name',
            defaultMessage: 'CostumeX',
            description: 'name of the extension'
        });
    },
    extensionId: 'costumex',
    extensionURL: 'https://yokobond.github.io/xcx-costumex/dist/costumex.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return `${formatMessage({
            defaultMessage: 'Costume extension',
            description: 'Description for this extension',
            id: 'costumex.entry.description'
        })} (${version})`;
    },
    tags: ['image', 'costume'],
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    helpLink: 'https://yokobond.github.io/xcx-costumex/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
