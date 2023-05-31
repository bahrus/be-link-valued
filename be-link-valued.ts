import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { BEConfig, EnhancementInfo } from 'be-enhanced/types';
import { XE } from 'xtal-element/XE.js';
import { Actions, AllProps, AP, PAP, ProPAP } from './types';
import { register } from 'be-hive/register.js';

export class BeLinkValued extends BE<AP, Actions, HTMLLinkElement> implements Actions{
    #mutationObserver: MutationObserver | undefined;
    #ignoreValChange = false;
    override async attach(enhancedElement: HTMLLinkElement, enhancementInfo: EnhancementInfo): Promise<void> {
        await super.attach(enhancedElement, enhancementInfo);
        const mutOptions: MutationObserverInit = {
            attributeFilter: ['href'],
            attributes: true
        };
        this.#mutationObserver = new MutationObserver(() => {
            this.calcVal();
        });
        this.#mutationObserver.observe(enhancedElement, mutOptions);
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
        this.#ignoreValChange = true;
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
        this.resolved = true;
    }
    override detach(detachedElement: HTMLLinkElement) {
        if(this.#mutationObserver !== undefined) this.#mutationObserver.disconnect();
    }

    onValChange(self: this): void {
        if(this.#ignoreValChange){
            this.#ignoreValChange = false;
            return;
        }
        const {value, enhancedElement} = self;
        if(value === undefined) return;
        const urlVal = value === true ? 'True' :
            value === false ? 'False' : value;
        enhancedElement.href = 'https://schema.org/' + urlVal;
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
        actions: {
            onValChange: {
                ifKeyIn: ['value'],
            }
        }
    },
    superclass: BeLinkValued
});

register(ifWantsToBe, upgrade, tagName);