A convenience to call `querySelector()` until a non-`null` value is returned using mutation events.

# Usage

Include this in your userscript using [`@require`](https://wiki.greasespot.net/Metadata_Block#.40require). It is recommended to [use a permalink](https://docs.github.com/repositories/working-with-files/using-files/getting-permanent-links-to-files) instead of referring to `master`.

```js
// ==UserScript==
// @name example
// @version 1.0
// @require ttps://github.com/binki/binki-userscript-when-element-query-selector-async/raw/master/binki-userscript-when-element-query-selector-async.js
// ==UserScript==

(async () => {
  const button = await whenElementQuerySelectorAsync(document.body, 'a.btn-primary');
  button.click();
})();
```

# API

```js
whenElementQuerySelectorAsync(element, selectors, signal);
```

Parameters:

* `element` is the [`Element`](https://dom.spec.whatwg.org/#interface-element) whose [`querySelector`](https://dom.spec.whatwg.org/#dom-parentnode-queryselector) function is called and which is monitored for mutation events.
* `selectors` is a string of CSS selectors to query. Note that, since this is powered by mutation events, it is inappropriate to use pseudo classes such as `:focus` which can change without the document being mutated. 
* `signal` (optional) an [`AbortSignal`](https://dom.spec.whatwg.org/#abortsignal). If supplied, this can be used to cancel the wait. Otherwise, the wait will continue until the query matches.
