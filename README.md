# be-link-valued [TODO]

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
availabilityLink.beEnhanced.beLinkValued.value = {
    availability: 'InStock'
};
availabilityLink.beEnhanced.beLinkValued.addEventListener('value-changed', e => {
    //fires anytime href changes
})
```

So the value is derived from the string after the last slash of the URL.  One exception:

https://schema.org/True , https://Schema.org/False automatically maps to boolean values true/false.

be-link-valued can also automatically set the display property of the link attribute, so that css can use ::after or ::before to display some text:

```html
<link id=availabilityLink itemprop="availability" href="https://schema.org/InStock" be-link-valued=inline />In stock
```

...sets the style.display property to inline when an href is present.  It is removed when no href is present.