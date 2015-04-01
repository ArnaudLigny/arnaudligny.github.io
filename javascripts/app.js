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
  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
})(jQuery, this);

// Github/Narno
(function($) {
  $(function() {
    $.getJSON("https://api.github.com/users/narno/repos?sort=pushed&callback=?", function(response) {
      $("div#github-repos dl dt").remove();
      $("div#github-repos dl dd").remove();
      $.each(response.data, function(idx, repo) {
        //if(!repo.fork) {
          $("div#github-repos dl").append(
            $("<dt>").append(
              $("<a>")
                .attr("href", repo["html_url"])
                .attr("class", function(i, val) {
                  if(repo.fork) {
                    return "link-fork";
                  } else {
                    return "link-github";
                  }
                })
                .append(
                  $("<span>")
                  .html(repo.name)
                )
            )
          );
          $("div#github-repos dl").append(
            $("<dd>").append(
              $("<span>")
                .html(repo.description)
            )
          );
        //}
      });
    });
  });
})(jQuery);
// Github/ApertureLab
(function($) {
  $(function() {
    $.getJSON("https://api.github.com/orgs/aperturelab/repos?sort=pushed&callback=?", function(response) {
      $("div#github-org-repos dl dt").remove();
      $("div#github-org-repos dl dd").remove();
      $.each(response.data, function(idx, repo) {
        $("div#github-org-repos dl").append(
          $("<dt>").append(
            $("<a>")
              .attr("href", repo["html_url"])
              .attr("class", function(i, val) {
                  if(repo.fork) {
                    return "link-fork";
                  } else {
                    return "link-github";
                  }
                })
              .append(
                $("<span>")
                .html(repo.name)
              )
          )
        );
        $("div#github-org-repos dl").append(
          $("<dd>").append(
            $("<span>")
              .html(repo.description)
          )
        );
      });
    });
  });
})(jQuery);