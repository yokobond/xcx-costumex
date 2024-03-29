import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import Cast from '../../util/cast';
import log from '../../util/log';
import translations from './translations.json';
import blockIcon from './block-icon.png';

import {checkDebugMode} from './dev-util.js';
import {addImageAsCostume, getCostumeIndexByNameOrNumber} from './costume-util';

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.default;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const EXTENSION_ID = 'costumex';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://yokobond.github.io/xcx-costumex/dist/costumex.mjs';

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class ExtensionBlocks {
    /**
     * A translation object which is used in this class.
     * @param {FormatObject} formatter - translation object
     */
    static set formatMessage (formatter) {
        formatMessage = formatter;
        if (formatMessage) setupTranslations();
    }

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return formatMessage({
            id: 'costumex.name',
            default: 'CostumeX',
            description: 'name of the extension'
        });
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * The extensionURL will be changed to the URL of the loading server.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * Construct a set of blocks for CostumeX.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }
        runtime.on('EXTENSION_ADDED', this.onExtensionAdded.bind(this));
    }

    onExtensionAdded (extensionInfo) {
        if (extensionInfo.id === EXTENSION_ID) {
            checkDebugMode();
        }
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        setupTranslations();
        return {
            id: ExtensionBlocks.EXTENSION_ID,
            name: ExtensionBlocks.EXTENSION_NAME,
            extensionURL: ExtensionBlocks.extensionURL,
            blockIconURI: blockIcon,
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'addImageAsCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.addImageAsCostume',
                        default: 'add image [DATA] as costume [NAME]',
                        description: 'CostumeX addImageAsCostume text'
                    }),
                    func: 'addImageAsCostume',
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data:image/png;base64,'
                        },
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'costumex.addImageAsCostume.defaultCostumeName',
                                default: 'costume',
                                description: 'CostumeX addImageAsCostume defaultCostumeName text'
                            })
                        }
                    }
                },
                {
                    opcode: 'deleteCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.deleteCostume',
                        default: 'delete costume [COSTUME]',
                        description: 'CostumeX deleteCostume text'
                    }),
                    func: 'deleteCostume',
                    arguments: {
                        COSTUME: {
                            type: ArgumentType.COSTUME,
                            menu: 'costumeNamesMenu'
                        }
                    }
                },
                {
                    opcode: 'costumeData',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'costumex.costumeData',
                        default: 'image data of costume [COSTUME]',
                        description: 'CostumeX costumeData text'
                    }),
                    func: 'costumeData',
                    arguments: {
                        COSTUME: {
                            type: ArgumentType.COSTUME,
                            menu: 'costumeNamesMenu'
                        }
                    }
                },
                {
                    opcode: 'takeSnapshot',
                    blockType: BlockType.REPORTER,
                    blockAllThreads: false,
                    text: formatMessage({
                        id: 'costumex.takeSnapshot',
                        default: 'snapshot x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]',
                        description: 'costumex takeSnapshot text'
                    }),
                    func: 'takeSnapshot',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        WIDTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 480
                        },
                        HEIGHT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 360
                        }
                    }
                },
                {
                    opcode: 'costumesLength',
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    text: formatMessage({
                        id: 'costumex.costumesLength',
                        default: 'costumes length',
                        description: 'CostumeX costumesLength text'
                    }),
                    func: 'costumesLength'
                },
                {
                    opcode: 'costumeNameAt',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'costumex.costumeNameAt',
                        default: 'costume name at [INDEX]',
                        description: 'CostumeX costumeNameAt text'
                    }),
                    func: 'costumeNameAt',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                }
            ],
            menus: {
                costumeNamesMenu: {
                    acceptReporters: true,
                    items: 'getCostumeNamesMenu'
                }
            }
        };
    }

    getCostumeNamesMenu () {
        const menu = [];
        const target = this.runtime.getEditingTarget();
        if (!target) {
            return menu;
        }
        const costumes = target.sprite.costumes;
        for (let i = 0; i < costumes.length; i++) {
            menu.push({
                text: costumes[i].name,
                value: costumes[i].name
            });
        }
        return menu;
    }

    /**
     * Take a snapshot.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves snapshot data URL
     */
    takeSnapshot (args, util) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const width = Cast.toNumber(args.WIDTH);
        const height = Cast.toNumber(args.HEIGHT);
        const runtime = util.runtime;
        return new Promise(resolve => {
            this.runtime.renderer.requestSnapshot(imageDataURL => {
                resolve(` ${imageDataURL} `);
            });
        })
            .then(imageDataUrl => new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = function () {
                    resolve(image);
                    image.onload = null;
                    image.onerror = null;
                };
                image.onerror = function () {
                    reject(new Error('Costume load failed. Asset could not be read.'));
                    image.onload = null;
                    image.onerror = null;
                };
                image.src = imageDataUrl;
            }))
            .then(imageElem => {
                const bitmapResolution = 2;
                const outputWidth = 480 * bitmapResolution;
                const outputHeight = 360 * bitmapResolution;
                const [stageWidth, stageHeight] = runtime.renderer.getNativeSize();
                const stepPixelRatioWidth = imageElem.width / stageWidth;
                const stepPixelRatioHeight = imageElem.height / stageHeight;
                const canvas = document.createElement('canvas');
                canvas.width = (width / stageWidth) * outputWidth;
                canvas.height = (height / stageHeight) * outputHeight;
                const context = canvas.getContext('2d');
                context.drawImage(
                    imageElem,
                    ((stageWidth / 2) + x - (width / 2)) * stepPixelRatioWidth,
                    ((stageHeight / 2) - (y + (height / 2))) * stepPixelRatioHeight,
                    width * stepPixelRatioWidth,
                    height * stepPixelRatioHeight,
                    0,
                    0,
                    canvas.width,
                    canvas.height);
                return ` ${canvas.toDataURL()} `;
            })
            .catch(error => {
                log.error(error);
                return error.message;
            });
    }

    /**
     * Add an image as a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves when the image is added then returns the data URL
     */
    addImageAsCostume (args, util) {
        const target = util.target;
        const dataURL = Cast.toString(args.DATA).trim();
        const imageName = Cast.toString(args.NAME);
        const runtime = this.runtime;
        return addImageAsCostume(target, dataURL, runtime, imageName, runtime.vm)
            .then(costume => ` ${costume.asset.encodeDataURI()} `)
            .catch(error => {
                log.error(error);
                return error.message;
            });
    }

    /**
     * Delete a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     */
    deleteCostume (args, util) {
        const target = util.target;
        if (target.sprite.costumes.length <= 1) {
            // Must have at least one costume
            return;
        }
        const costumeName = Cast.toString(args.COSTUME);
        const costumeIndex = getCostumeIndexByNameOrNumber(target, costumeName);
        if (costumeIndex === null) return;
        target.deleteCostume(costumeIndex);
    }

    /**
     * Get the number of costumes.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {number} - the number of costumes.
     */
    costumesLength (args, util) {
        return util.target.sprite.costumes.length;
    }

    /**
     * Get the name of a costume at a given index.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {string} - the name of the costume.
     */
    costumeNameAt (args, util) {
        const index = Cast.toNumber(args.INDEX);
        const target = util.target;
        const costumes = target.sprite.costumes;
        if (index < 1 || index > costumes.length) {
            return '';
        }
        return costumes[index - 1].name;
    }

    /**
     * Get the image data of a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {string} - the image data of the costume.
     */
    costumeData (args, util) {
        const target = util.target;
        const costumeName = Cast.toString(args.COSTUME);
        const costumeIndex = getCostumeIndexByNameOrNumber(target, costumeName);
        if (costumeIndex === null) return '';
        return ` ${target.getCostumes()[costumeIndex].asset.encodeDataURI()} `;
    }
}

export {ExtensionBlocks as default, ExtensionBlocks as blockClass};
