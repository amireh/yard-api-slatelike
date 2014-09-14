$(function() {
  var scrollSpySelector = $('h1');
  var $sidebar = $('#sidebar');
  var $staticPages = $sidebar.find('#static_pages');

  var guid = 1;
  var sanitizeText = function(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\W+/g, '_')
      .trim();
  };

  // Make sure all headings have an id so we can anchor to them
  $('h1:not([id]), h2:not([id])').each(function() {
    this.id = ['auto', (++guid), sanitizeText(this.innerText) ].join('_');
  });

  var mainHeaders = $('h1').toArray().map(function(h1) {
    var $h1 = $(h1);

    return {
      id: h1.id,
      comparator: sanitizeText($h1.text()),
      children: $h1.nextAll('h2').toArray()
    };
  });

  console.log(mainHeaders);

  mainHeaders.forEach(function(header) {
    var $subLinks;
    var sidebarLink = $staticPages.find('a').filter(function() {
      return sanitizeText($(this).text()) === header.comparator;
    })[0];

    if (!sidebarLink) {
      console.warn('Unable to find sidebar entry for header %s', header.comparator);
      return;
    }

    $subLinks = $('<ul />');

    header.children.forEach(function(el) {
      var $el = $(el);
      var $anchor = $('<a />', {
        href: '#' + $el.attr('id')
      }).text($el.text());

      $('<li />').append($anchor).appendTo($subLinks);
    });

    $(sidebarLink).after($subLinks);

    // finally, change the original anchor that points to the article file
    // to point to the bookmark in the current page
    sidebarLink.href = '#' + header.id;
  });
});