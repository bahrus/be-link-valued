import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeLinkValued extends BE {
}
const tagName = 'be-link-valued';
const ifWantsToBe = 'link-valued';
const upgrade = 'link';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {}
    },
    superclass: BeLinkValued
});
register(ifWantsToBe, upgrade, tagName);
