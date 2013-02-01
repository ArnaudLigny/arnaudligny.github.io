;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

(function($) {
  $(function() {
    $.getJSON("https://api.github.com/users/narno/repos?callback=?", function(response) {
      $("div#github-repos dl dt").remove();
      $("div#github-repos dl dd").remove();
      $.each(response.data, function(idx, repo) {
        if(!repo.fork) {
          $("div#github-repos dl").append(
            $("<dt>").append(
              $("<a>")
                .html(repo.name)
                .attr("href", repo["html_url"])
            )
          );
          $("div#github-repos dl").append(
            $("<dd>").append(
              $("<span>")
                .html(repo.description)
            )
          );
        }
      });
    });
  });
})(jQuery);
(function($) {
  $(function() {
    $.getJSON("https://api.github.com/orgs/baobaz/repos?callback=?", function(response) {
      $("div#github-org-repos dl dt").remove();
      $("div#github-org-repos dl dd").remove();
      $.each(response.data, function(idx, repo) {
        if(!repo.fork) {
          $("div#github-org-repos dl").append(
            $("<dt>").append(
              $("<a>")
                .html(repo.name)
                .attr("href", repo["html_url"])
            )
          );
          $("div#github-org-repos dl").append(
            $("<dd>").append(
              $("<span>")
                .html(repo.description)
            )
          );
        }
      });
    });
  });
})(jQuery);