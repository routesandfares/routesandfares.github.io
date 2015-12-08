// Tabby
var hasClickedTabs = false;

tabby.init({
  callback: function(toggle, tabID) {
    window.location.hash = tabID.split('-')[1];
    hasClickedTabs = true;
  }
});

if (location.hash) {
  var tabID = '#code-' + location.hash.substring(1);
  var toggle = document.querySelector('[data-tab="' + tabID + '"]');
  tabby.toggleTab(toggle, tabID);

  mixpanel.track('Pageview', {
    'From hash': true
  });
} else {
  mixpanel.track('Pageview', {
    'From hash': false
  });
}
