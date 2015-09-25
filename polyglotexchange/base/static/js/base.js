(function($) {
  var $main = $("#mainContent"),
  
  init = function() {
    // Do this when a page loads.
  },
  
  ajaxLoad = function(html) {

    init();
  },
  
  loadPage = function(href) {
    $main.load(href + " #mainContent", ajaxLoad);
  };
  
  init();
  
  $(window).on("popstate", function() {
    loadPage(location.href);
  });

  $(document).on("click", "a", function() {
    var href = $(this).attr("href");

    if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1){
    	history.pushState({}, '', href);
    	loadPage(href);
    	return false;
    }
  });
  $(window).on('beforeunload',function() {
  	$.ajax({url:"/chat/unload/"});
  });

  $(window).load(function() {
  	$.ajax({url:"/chat/load/"});
  });
})(jQuery);