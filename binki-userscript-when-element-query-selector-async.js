/**
 * @param target{Element} The element whose whose querySelector() method should be called and on which to wait for mutation events.
 * @param selectors{String} The CSS selector to wait for.
 * @param signal{AbortSignal} (Optional) The cancellation token.
 */
const whenElementQuerySelectorAsync = async (element, selectors, signal) => new Promise((resolve, reject) => {
  if (signal) {
    signal.throwIfAborted();
  }
  const result = element.querySelector(selectors);
  if (result) {
    resolve(result);
  } else {
    function cleanup() {
			if (signal) {
        signal.removeEventListener('abort', handleAbort);
      }
      observer.disconnect();
    }
    function handleAbort() {
      cleanup();
      reject(signal.reason);
    }
    const observer = new MutationObserver(mutations => {
      const result = element.querySelector(selectors);
      if (result) {
        cleanup();
        resolve(result);
      }
    });
    observer.observe(element, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
    if (signal) {
      signal.addEventListener('abort', handleAbort);
    }
  }
});
