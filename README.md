# be-link-valued

<!-- [![Playwright Tests](https://github.com/bahrus/be-intl/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-intl/actions/workflows/CI.yml) -->
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-link-valued?style=for-the-badge)](https://bundlephobia.com/result?p=be-link-valued)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-link-valued?compression=gzip">
[![NPM version](https://badge.fury.io/js/be-link-valued.png)](http://badge.fury.io/js/be-link-valued)

Monitor href attribute for enumerated values.

Microdata provides boolean / enumerated type status values via urls.  For example:

```html
<link itemprop="availability" href="https://schema.org/InStock" />In stock
```

What be-link-valued does is watch for changing values of the href, and broadcasts updates:

```html
<link id=availabilityLink itemprop="availability" href="https://schema.org/InStock" be-link-valued />In stock
```

would result in:

```JavaScript
availabilityLink.beEnhanced.beLinkValued.value = 'InStock';
availabilityLink.beEnhanced.beLinkValued.addEventListener('value-changed', e => {
    //fires anytime href changes
})
```

So the value is derived from the string after the last slash of the URL.  One exception:

https://schema.org/True , https://Schema.org/False automatically maps to boolean values true/false.

## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-intl/be-link-valued.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-link-valued';
</script>
```
