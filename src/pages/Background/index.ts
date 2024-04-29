import { captureScreenShot, sendParametersToAPI } from '../../../utils/API';
import {
  EqualifyIssueType,
  EqualifyParams,
} from '../../../utils/API_Constants';

console.log(`Equalify chrome-extension main background script!!!`);

// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
const checkCommandShortcuts = () => {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
    }

    console.log('Missing shortcuts: ', missingShortcuts);
  });
};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }

  // Create a parent item and two children.
  let parent = chrome.contextMenus.create({
    title: 'Send to Equalify',
    id: 'parent',
  });

  // Create one test item for each context type.
  let contexts: [chrome.contextMenus.ContextType] = [
    'selection',
    // 'page',
    // 'link',
    // 'editable',
    // 'image',
    // 'video',
    // 'audio',
  ];
  console.log(`adding context menus for: ${contexts}`);
  for (let i = 0; i < contexts.length; i++) {
    let context = contexts[i];
    let title = `Equalify ${context}`;
    chrome.contextMenus.create({
      title: title,
      contexts: [context],
      id: context,
    });
  }

  chrome.contextMenus.create({
    title: 'All the things',
    parentId: parent,
    id: 'child2',
  });
  chrome.contextMenus.create({
    title: 'Screenshot tab',
    parentId: parent,
    id: 'sreenshot_tab',
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  console.log('Item selected in A: ' + info.menuItemId);

  /*
  // use window to access the global window object
  const current = await chrome.windows.getCurrent();
  const allTabs = await chrome.tabs.query({});

  // log with JSON.stringify to see all the properties
  console.log('Current window: ' + JSON.stringify(current));
  console.log('All tabs: ' + JSON.stringify(allTabs, null, 2));

  let currentInfo = {};
  allTabs.forEach((tab) => {
    if (tab.windowId === current.id) {
      console.log('Tab: ' + tab.id + ' ' + tab.title + ' ' + tab.url);
      currentInfo = tab;
      // chrome.tabs.move(tab.id, {
      //   windowId: current.id,
      //   index: tab.index,
      // });
    }
  });

  */
  if (info.menuItemId === 'selection') {
    console.log('Selected text: ' + info.selectionText);

    const opts = {
      body: info.selectionText,
      url: info.pageUrl,
    };
    sendParametersToAPI(EqualifyIssueType.ELEMENT_ISSUE, opts)
      .then((response) => {
        console.log('Response: ', response);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  } else if (info.menuItemId === 'sreenshot_tab') {
    captureScreenShot();
  }
});

/**
 * Set up the Commands listener event
 * @see http://developer.chrome.com/apps/commands.html
 */
chrome.commands.onCommand.addListener(function (command) {
  console.log('Command triggered: ' + command);

  if (command === 'screenshot-tab') {
    captureScreenShot();
  } else if (command === 'selected-element') {
    console.log('Selected element');

    // FIXME: use dom tools to get the selected element
    const info = {
      selectionText: 'selected element',
      pageUrl: 'https://www.example.com',
    };

    const opts: EqualifyParams = {
      body: info.selectionText,
      url: info.pageUrl,
    };
    sendParametersToAPI(EqualifyIssueType.ELEMENT_ISSUE, opts)
      .then((response) => {
        console.log('Response: ', response);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  } else if (command === 'meta-issue') {
    console.log('META issue');

    // FIXME: get the page URL
    const info = {
      metaIssue: 'See what had happened was...',
      pageUrl: 'https://www.example.com',
    };

    const opts: EqualifyParams = {
      body: info.metaIssue,
      url: info.pageUrl,
    };
    sendParametersToAPI(EqualifyIssueType.META_ISSUE, opts)
      .then((response) => {
        console.log('Response: ', response);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }
});
