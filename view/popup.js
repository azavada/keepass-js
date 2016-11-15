chrome.tabs.query({active: true}, function(tabs) {
   tabs.forEach(function(tab){
       chrome.runtime.sendMessage({log: tab.url});
   });
});