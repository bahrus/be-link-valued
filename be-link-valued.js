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
        this.#mutationObserver.observe(enhancedElement, mutOptions);
        this.calcVal();
    }
    calcVal() {
        const { enhancedElement } = this;
        if (!enhancedElement.hasAttribute('href')) {
            this.value = undefined;
            return;
        }
        const split = (enhancedElement.getAttribute('href')).split('/');
        const lastVal = split.at(-1);
        this.ignoreValChange = true;
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
    onValChange(self) {
        if (this.ignoreValChange) {
            this.ignoreValChange = false;
            return;
        }
        const { value, enhancedElement } = self;
        if (value === undefined)
            return;
        const urlVal = value === true ? 'True' :
            value === false ? 'False' : value;
        enhancedElement.href = 'https://schema.org/' + urlVal;
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
            ignoreValChange: false,
        },
        propInfo: {
            ...propInfo,
            value: {
                notify: {
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
