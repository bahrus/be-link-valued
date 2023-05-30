import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { BEConfig, EnhancementInfo } from 'be-enhanced/types';
import { XE } from 'xtal-element/XE.js';
import { Actions, AllProps, AP, PAP, ProPAP } from './types';
import { register } from 'be-hive/register.js';

export class BeLinkValued extends BE<AP, Actions, HTMLLinkElement> implements Actions{
    #mutationObserver: MutationObserver | undefined;
    override async attach(enhancedElement: HTMLLinkElement, enhancementInfo: EnhancementInfo): Promise<void> {
        await super.attach(enhancedElement, enhancementInfo);
        const mutOptions: MutationObserverInit = {
            attributeFilter: ['href'],
            attributes: true
        };
        this.#mutationObserver = new MutationObserver(() => {
            this.calcVal();
        });
        this.#mutationObserver.observe(enhancedElement);
        this.calcVal();
    }
    calcVal(){
        const {enhancedElement} = this;
        if(!enhancedElement.hasAttribute('href')){
            this.value = undefined;
            return;
        }
        const split = (enhancedElement.getAttribute('href')!).split('/');
        const lastVal = split.at(-1);
        switch(lastVal){
            case 'True':
                this.value = true;
                break;
            case 'False':
                this.value = false;
                break;
            default:
                this.value = lastVal;
        }
    }
    override detach(detachedElement: HTMLLinkElement) {
        if(this.#mutationObserver !== undefined) this.#mutationObserver.disconnect();
    }
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
            value: {
                notify:{
                    dispatch: true,
                }
            }
        },
        actions: {}
    },
    superclass: BeLinkValued
});

register(ifWantsToBe, upgrade, tagName);