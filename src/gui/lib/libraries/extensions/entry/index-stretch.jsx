import React from 'react';
import {FormattedMessage} from 'react-intl';

/**
 * This is an extension for Xcratch.
 */

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';
const translations =
{
    'en': {
        'costumex.entry.name': 'CostumeX',
        'costumex.entry.description': 'Costume extension'
    },
    'ja': {
        'costumex.entry.name': 'CostumeX',
        'costumex.entry.description': 'コスチュームの拡張'
    },
    'ja-Hira': {
        'costumex.entry.name': 'CostumeX',
        'costumex.entry.description': 'コスチューム の かくちょう'
    }
};

const entry = {
    name: (
        <FormattedMessage
            defaultMessage="CostumeX"
            description="Name for this extension"
            id="costumex.entry.name"
        />
    ),
    extensionId: 'costumex',
    extensionURL: null,
    collaborator: 'Yengawa Lab',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Costume extension"
            description="Description for this extension"
            id="costumex.entry.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    helpLink: 'https://yokobond.github.io/xcx-costumex/',
    translationMap: translations
};

export default entry;
