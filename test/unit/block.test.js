import { blockClass } from "../../src/vm/extensions/block/index.js";

describe("blockClass", () => {
    const formatMessage = function (msg) {
        return msg.default;
    };
    formatMessage.setup = function () {
        return {
            locale: 'en',
            translations: {
                en: {}
            }
        };
    };

    const runtime = {
        formatMessage: formatMessage,
        on: jest.fn()
    };

    test("should create an instance of blockClass", () => {
        const block = new blockClass(runtime);
        expect(block).toBeInstanceOf(blockClass);
    });

    test("should have getInfo method that returns extension metadata", () => {
        const block = new blockClass(runtime);
        const info = block.getInfo();
        expect(info).toBeDefined();
        expect(info.id).toBe('costumex');
        expect(info.name).toBe('CostumeX');
        expect(info.blocks).toBeDefined();
        expect(Array.isArray(info.blocks)).toBe(true);
    });

    test("costumesLength should return the number of costumes", () => {
        const block = new blockClass(runtime);
        const util = {
            target: {
                sprite: {
                    costumes: [
                        { name: 'costume1' },
                        { name: 'costume2' },
                        { name: 'costume3' }
                    ]
                }
            }
        };
        const result = block.costumesLength({}, util);
        expect(result).toBe(3);
    });

    test("costumeNameAt should return the costume name at given index", () => {
        const block = new blockClass(runtime);
        const util = {
            target: {
                sprite: {
                    costumes: [
                        { name: 'costume1' },
                        { name: 'costume2' },
                        { name: 'costume3' }
                    ]
                }
            }
        };
        const result = block.costumeNameAt({ INDEX: 2 }, util);
        expect(result).toBe('costume2');
    });

    test("costumeNameAt should return empty string for invalid index", () => {
        const block = new blockClass(runtime);
        const util = {
            target: {
                sprite: {
                    costumes: [
                        { name: 'costume1' }
                    ]
                }
            }
        };
        const result = block.costumeNameAt({ INDEX: 5 }, util);
        expect(result).toBe('');
    });
});
