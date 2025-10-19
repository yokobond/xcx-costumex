import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import Cast from '../../util/cast';
import log from '../../util/log';
import translations from './translations.json';
import blockIcon from './block-icon.png';

import {checkDebugMode} from './dev-util.js';
import {insertImageAsSvgCostume, getCostumeIndexByNameOrNumber, flipCostume} from './costume-util';

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
                    opcode: 'insertSnapshotAsCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.insertSnapshotAsCostume',
                        default: 'insert snapshot [NAME] at [INDEX] x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]',
                        description: 'costumex insertSnapshotAsCostume text'
                    }),
                    func: 'insertSnapshotAsCostume',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'costumex.insertSnapshotAsCostume.defaultCostumeName',
                                default: 'snapshot',
                                description: 'CostumeX insertSnapshotAsCostume defaultCostumeName text'
                            })
                        },
                        INDEX: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
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
                    opcode: 'insertCameraImageAsCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.insertCameraImageAsCostume',
                        default: 'insert video frame [NAME] at [INDEX] x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]',
                        description: 'costumex insertCameraImageAsCostume text'
                    }),
                    func: 'insertCameraImageAsCostume',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'costumex.insertCameraImageAsCostume.defaultCostumeName',
                                default: 'video',
                                description: 'CostumeX insertCameraImageAsCostume defaultCostumeName text'
                            })
                        },
                        INDEX: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
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
                    opcode: 'insertImageAsCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.insertImageAsCostume',
                        default: 'insert costume [NAME] at [INDEX] width [WIDTH] height [HEIGHT] with image [DATA]',
                        description: 'CostumeX insertImageAsCostume text'
                    }),
                    func: 'insertImageAsCostume',
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'data:image/png;base64,AAA'
                        },
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'costumex.insertImageAsCostume.defaultCostumeName',
                                default: 'costume',
                                description: 'CostumeX insertImageAsCostume defaultCostumeName text'
                            })
                        },
                        INDEX: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        WIDTH: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        },
                        HEIGHT: {
                            type: ArgumentType.STRING,
                            defaultValue: ' '
                        }
                    }
                },
                {
                    opcode: 'addImageAsCostume',
                    hideFromPalette: true,
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
                    opcode: 'flipCostume',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'costumex.flipCostume',
                        default: 'flip costume [COSTUME] [DIRECTION]',
                        description: 'CostumeX flipCostume text'
                    }),
                    func: 'flipCostumeBlock',
                    arguments: {
                        COSTUME: {
                            type: ArgumentType.COSTUME,
                            menu: 'costumeNamesMenu'
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'flipDirectionMenu'
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
                    opcode: 'takeSnapshot',
                    hideFromPalette: true, // Use insertSnapshotAsCostume instead.
                    blockType: BlockType.REPORTER,
                    blockAllThreads: false,
                    text: formatMessage({
                        id: 'costumex.takeSnapshot',
                        default: 'snapshot center x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]',
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
                    opcode: 'captureVideoFrame',
                    hideFromPalette: true, // Use insertCameraImageAsCostume instead.
                    blockType: BlockType.REPORTER,
                    blockAllThreads: false,
                    text: formatMessage({
                        id: 'costumex.captureVideoFrame',
                        default: 'capture video center x:[X] y:[Y] w:[WIDTH] h:[HEIGHT]',
                        description: 'costumex captureVideoFrame text'
                    }),
                    func: 'captureVideoFrame',
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
                    opcode: 'costumeSize',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'costumex.costumeSize',
                        default: '[DIMENSION] of costume [COSTUME]',
                        description: 'CostumeX costumeSize text'
                    }),
                    func: 'costumeSize',
                    arguments: {
                        DIMENSION: {
                            type: ArgumentType.STRING,
                            menu: 'dimensionMenu'
                        },
                        COSTUME: {
                            type: ArgumentType.COSTUME,
                            menu: 'costumeNamesMenu'
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
                },
                dimensionMenu: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'costumex.dimensionMenu.width',
                                default: 'width',
                                description: 'CostumeX width text'
                            }),
                            value: 'width'
                        },
                        {
                            text: formatMessage({
                                id: 'costumex.dimensionMenu.height',
                                default: 'height',
                                description: 'CostumeX height text'
                            }),
                            value: 'height'
                        },
                        {
                            text: formatMessage({
                                id: 'costumex.dimensionMenu.centerX',
                                default: 'center x'
                            }),
                            value: 'centerX'
                        },
                        {
                            text: formatMessage({
                                id: 'costumex.dimensionMenu.centerY',
                                default: 'center y'
                            }),
                            value: 'centerY'
                        }
                    ]
                },
                flipDirectionMenu: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'costumex.flipDirectionMenu.horizontal',
                                default: 'left-right',
                                description: 'CostumeX horizontal flip'
                            }),
                            value: 'horizontal'
                        },
                        {
                            text: formatMessage({
                                id: 'costumex.flipDirectionMenu.vertical',
                                default: 'up-down',
                                description: 'CostumeX vertical flip'
                            }),
                            value: 'vertical'
                        }
                    ]
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
        const centerX = Cast.toNumber(args.X);
        const centerY = Cast.toNumber(args.Y);
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
                    ((stageWidth / 2) + centerX - (width / 2)) * stepPixelRatioWidth,
                    ((stageHeight / 2) - (centerY + (height / 2))) * stepPixelRatioHeight,
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
     * Insert a snapshot as a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves when the snapshot is added then returns the data URL
     */
    insertSnapshotAsCostume (args, util) {
        const target = util.target;
        const imageName = Cast.toString(args.NAME);
        const runtime = this.runtime;
        let insertIndex = Cast.toNumber(args.INDEX);
        if (isNaN(insertIndex) || insertIndex < 1) {
            insertIndex = 1;
        }
        if (insertIndex > target.getCostumes().length + 1) {
            insertIndex = target.getCostumes().length + 1;
        }
        insertIndex -= 1; // Convert to 0-origin

        const width = Cast.toNumber(args.WIDTH);
        const height = Cast.toNumber(args.HEIGHT);

        return this.takeSnapshot(args, util)
            .then(dataURL => {
                const trimmedDataURL = dataURL.trim();
                return insertImageAsSvgCostume(runtime, target, trimmedDataURL, width, height, imageName, insertIndex);
            })
            .then(costume => ` ${costume.asset.encodeDataURI()} `)
            .catch(error => {
                log.error(error);
                return error.message;
            });
    }

    /**
     * Insert a video frame as a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves when the video frame is added then returns the data URL
     */
    insertCameraImageAsCostume (args, util) {
        const target = util.target;
        const imageName = Cast.toString(args.NAME);
        const runtime = this.runtime;
        let insertIndex = Cast.toNumber(args.INDEX);
        if (isNaN(insertIndex) || insertIndex < 1) {
            insertIndex = 1;
        }
        if (insertIndex > target.getCostumes().length + 1) {
            insertIndex = target.getCostumes().length + 1;
        }
        insertIndex -= 1; // Convert to 0-origin

        const width = Cast.toNumber(args.WIDTH);
        const height = Cast.toNumber(args.HEIGHT);

        return this.captureVideoFrame(args, util)
            .then(dataURL => {
                const trimmedDataURL = dataURL.trim();
                return insertImageAsSvgCostume(runtime, target, trimmedDataURL, width, height, imageName, insertIndex);
            })
            .then(costume => ` ${costume.asset.encodeDataURI()} `)
            .catch(error => {
                log.error(error);
                return error.message;
            });
    }

    /**
     * Capture a video frame.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves video frame data URL
     */
    captureVideoFrame (args, util) {
        const centerX = Cast.toNumber(args.X);
        const centerY = Cast.toNumber(args.Y);
        const width = Cast.toNumber(args.WIDTH);
        const height = Cast.toNumber(args.HEIGHT);
        const runtime = util.runtime;
        const captureResolution = 2;
        
        const videoProvider = runtime.ioDevices.video.provider;
        if (!videoProvider) {
            return Promise.resolve('');
        }

        return videoProvider.enableVideo()
            .then(() =>
                // Wait for video to be ready
                new Promise(resolve => {
                    const checkVideoReady = () => {
                        if (videoProvider.videoReady) {
                            resolve();
                        } else {
                            setTimeout(checkVideoReady, 100);
                        }
                    };
                    checkVideoReady();
                })
            )
            .then(() => {
                const sourceCanvas = videoProvider.getFrame({
                    dimensions: [480 * captureResolution, 360 * captureResolution],
                    format: 'canvas'
                });
                
                if (!sourceCanvas) {
                    return '';
                }

                // Get actual canvas dimensions from video provider
                const canvasWidth = sourceCanvas.width;
                const canvasHeight = sourceCanvas.height;
                const [videoWidth, videoHeight] = [480, 360];
                
                // Calculate scale factor from video dimensions to canvas dimensions
                const scaleX = canvasWidth / videoWidth;
                const scaleY = canvasHeight / videoHeight;
                
                // Calculate source rectangle in canvas coordinates (high resolution)
                const srcX = ((videoWidth / 2) + centerX - (width / 2)) * scaleX;
                const srcY = ((videoHeight / 2) - (centerY + (height / 2))) * scaleY;
                const srcWidth = width * scaleX;
                const srcHeight = height * scaleY;
                
                // Create output canvas with high resolution matching source
                const outputCanvas = document.createElement('canvas');
                outputCanvas.width = srcWidth;
                outputCanvas.height = srcHeight;
                const context = outputCanvas.getContext('2d');
                
                // Draw the cropped region to output canvas at full resolution
                context.drawImage(
                    sourceCanvas,
                    srcX,
                    srcY,
                    srcWidth,
                    srcHeight,
                    0,
                    0,
                    srcWidth,
                    srcHeight
                );
                
                return ` ${outputCanvas.toDataURL()} `;
            })
            .catch(error => {
                log.error(error);
                return error.message;
            });
    }

    /**
     * Insert an image as a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise<string>} - a Promise that resolves when the image is added then returns the data URL
     */
    insertImageAsCostume (args, util) {
        const target = util.target;
        const dataURL = Cast.toString(args.DATA).trim();
        const imageName = Cast.toString(args.NAME);
        const runtime = this.runtime;
        let insertIndex = Cast.toNumber(args.INDEX);
        if (isNaN(insertIndex) || insertIndex < 1) {
            insertIndex = 1;
        }
        if (insertIndex > target.getCostumes().length + 1) {
            insertIndex = target.getCostumes().length + 1;
        }
        insertIndex -= 1; // Convert to 0-origin
        let width = Cast.toNumber(args.WIDTH);
        if (isNaN(width) || width <= 0) {
            width = runtime.renderer.canvas.width;
        }
        let height = Cast.toNumber(args.HEIGHT);
        if (isNaN(height) || height <= 0) {
            height = runtime.renderer.canvas.height;
        }

        return insertImageAsSvgCostume(runtime, target, dataURL, width, height, imageName, insertIndex)
            .then(costume => ` ${costume.asset.encodeDataURI()} `)
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
     * @deprecated Use 'insertImageAsCostume' instead.
     */
    addImageAsCostume (args, util) {
        return this.insertImageAsCostume(args, util);
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

    costumeSize (args, util) {
        const dimension = Cast.toString(args.DIMENSION).toLowerCase();
        const target = util.target;
        const costumeName = Cast.toString(args.COSTUME);
        const costumeIndex = getCostumeIndexByNameOrNumber(target, costumeName);
        if (costumeIndex === null) return 0;
        const costume = target.getCostumes()[costumeIndex];
        // Get sprite size (scale factor) as a percentage (e.g., 100 means 100%)
        const spriteScale = target.size / 100;
        const resolution = costume.bitmapResolution;
        if (dimension === 'width') {
            return Math.round(resolution * costume.size[0] * spriteScale);
        }
        if (dimension === 'height') {
            return Math.round(resolution * costume.size[1] * spriteScale);
        }
        if (dimension === 'centerx') {
            const centerX = (costume.size[0] / 2) - costume.rotationCenterX;
            return Math.round(resolution * centerX * spriteScale);
        }
        if (dimension === 'centery') {
            const centerY = costume.rotationCenterY - (costume.size[1] / 2);
            return Math.round(resolution * centerY * spriteScale);
        }
        return 0;
    }

    /**
     * Flip a costume.
     * @param {object} args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @returns {Promise} - a Promise that resolves when the costume is flipped
     */
    flipCostumeBlock (args, util) {
        const target = util.target;
        const costumeName = Cast.toString(args.COSTUME);
        const direction = Cast.toString(args.DIRECTION);
        const runtime = this.runtime;

        return flipCostume(runtime, target, costumeName, direction)
            .then(() => Promise.resolve())
            .catch(error => {
                log.error(error);
            });
    }
}

export {ExtensionBlocks as default, ExtensionBlocks as blockClass};
