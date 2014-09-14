$(function() {
  // =========================================================================
  // Sidebar navigation
  // =========================================================================
  (function linkifyHeaders() {
    var $staticPages = $('#static_pages');

    var guid = 1;
    var sanitizeText = function(text) {
      return text
        .replace(/\sAPI$/, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\W+/g, '_')
        .trim();
    };

    // Make sure all headings have an id so we can anchor to them
    $('#content').find('h1:not([id]), h2:not([id])').each(function() {
      this.id = ['auto', (++guid), sanitizeText(this.innerText) ].join('_');
    });

    var mainHeaders = $('#content h1[id]').toArray().map(function(h1) {
      var $h1 = $(h1);
      var text;
      var subSections;

      if ($h1.next().is('article')) {
        subSections = $h1.nextAll('.method_details_list').find('h2');
      } else {
        subSections = $h1.nextAll('h2');
      }

      return {
        id: h1.id,
        comparator: sanitizeText(h1.innerText),
        children: subSections.toArray()
      };
    });

    console.log(mainHeaders);

    mainHeaders.forEach(function(header) {
      var $subLinks;
      var sidebarLink = $staticPages.find('a').filter(function() {
        return sanitizeText(this.innerText) === header.comparator;
      })[0];

      if (!sidebarLink) {
        console.warn('Unable to find sidebar entry for header %s', header.comparator);
        return;
      }

      $subLinks = $('<ul />', { class: 'subnav' });

      header.children.forEach(function(el) {
        var $el = $(el);
        var text;
        if ($el.find('a').length) {
          text = $el.find('a:first')[0].innerText;
        }
        else {
          text = $el[0].innerText;
        }

        var $anchor = $('<a />', {
          href: '#' + $el.attr('id')
        }).text(text);

        $('<li />').append($anchor).appendTo($subLinks);
      });

      $(sidebarLink).after($subLinks.hide());

      // finally, change the original anchor that points to the article file
      // to point to the bookmark in the current page
      sidebarLink.href = '#' + header.id;
    });
  }());

  // =========================================================================
  // Scroll spying
  // =========================================================================
  (function installScrollSpy() {
    var $staticPages = $('#static_pages');
    var findLink = function(header) {
      return $staticPages.find('a[href="#' + header.id + '"]');
    };
    var findSubnav = function(header) {
      return findLink(header).next('.subnav');
    };

    var highlightSection = function($subnav) {
      $staticPages.find('> a.active').removeClass('active');
      $staticPages.find('.subnav:visible').hide();
      $subnav.show().prev('a').addClass('active');
    };

    var highlightSubsection = function($link) {
      $staticPages.find('.subnav a.active').removeClass('active');
      $link.addClass('active');
      highlightSection($link.closest('.subnav'));
    };

    $('#content h1').on('scrollSpy:enter', function() {
      highlightSection(findSubnav(this));
      console.log('section:', this.id);
    });

    $('#content h2').on('scrollSpy:enter', function() {
      highlightSubsection(findLink(this));

      console.log('sub-section:\t', this.id);
    });

    $('#content h1').scrollSpy();
    $('#content h2').scrollSpy();
  }(this));
});