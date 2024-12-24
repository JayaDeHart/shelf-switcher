let windowOrientation;

function getOrientation(width, height) {
    return width > height ? "landscape" : "portrait";
  }
chrome.windows.getCurrent((win) => {
    windowOrientation = getOrientation(win.width, win.height);
    console.log(`Initial orientation: ${windowOrientation}`);
});

chrome.windows.onBoundsChanged.addListener(() => {
    chrome.windows.getCurrent((win) => {
      const newOrientation = getOrientation(win.width, win.height);
  
      if (newOrientation !== windowOrientation) {
        windowOrientation = newOrientation;
        if(windowOrientation==="landscape"){
            const port = chrome.runtime.connectNative('com.shelfswitcher.dock.right')
            port.onDisconnect.addListener(() => {
                console.error(`Disconnected: ${chrome.runtime.lastError?.message}`);
            });
        }
        if(windowOrientation==="portrait"){
            const port = chrome.runtime.connectNative('com.shelfswitcher.dock.bottom')
            port.onDisconnect.addListener(() => {
                console.error(`Disconnected: ${chrome.runtime.lastError?.message}`);
            });
        }
      }
    });
  });
