import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeLinkValued extends BE {
    #mutationObserver;
    async attach(enhancedElement, enhancementInfo) {
        await super.attach(enhancedElement, enhancementInfo);
        const mutOptions = {
            attributeFilter: ['href'],
            attributes: true
        };
        this.#mutationObserver = new MutationObserver(() => {
            this.calcVal();
        });
        this.#mutationObserver.observe(enhancedElement);
    }
    calcVal() {
        const { enhancedElement } = this;
        if (!enhancedElement.hasAttribute('href')) {
            this.value = undefined;
            return;
        }
        const split = (enhancedElement.getAttribute('href')).split('/');
        const lastVal = split.at(-1);
        switch (lastVal) {
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
    detach(detachedElement) {
        if (this.#mutationObserver !== undefined)
            this.#mutationObserver.disconnect();
    }
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
            value: {
                notify: {
                    dispatch: true,
                }
            }
        },
        actions: {}
    },
    superclass: BeLinkValued
});
register(ifWantsToBe, upgrade, tagName);
