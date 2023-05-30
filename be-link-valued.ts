import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { BEConfig, EnhancementInfo } from 'be-enhanced/types';
import { XE } from 'xtal-element/XE.js';
import { Actions, AllProps, AP, PAP, ProPAP } from './types';
import { register } from 'be-hive/register.js';

export class BeLinkValued extends BE<AP, Actions, HTMLLinkElement> implements Actions{

}

export interface BeLinkValued extends AllProps{}

const tagName = 'be-link-valued';
const ifWantsToBe = 'link-valued';
const upgrade = 'link';

const xe = new XE<AP, Actions>({
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