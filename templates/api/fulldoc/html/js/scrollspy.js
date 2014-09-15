(function($) {
  var $window = $(window);
  var guid = 0;
  var defaults = { defer: undefined };

  $.fn.scrollSpy = function(options) {
    if (!options) {
      options = defaults;
    }

    var lastId;
    var focalNodes = $(this).toArray().map(function(node) {
      var $node = $(node);

      return {
        id: node.id,
        $node: $node,
        top: parseInt($node.offset().top, 10) + ($node.outerHeight()/2)
      };
    }).sort(function(a,b) {
      return a.top - b.top;
    });

    var trigger = function(nodeEntry) {
      nodeEntry.$node.triggerHandler('scrollSpy', [ nodeEntry.id, lastId ]);
    };

    $window.on('scroll.scrollSpy_' + (++guid), function() {
      var scrollTop = $window.scrollTop();
      var nodeEntry, i;

      for (i = 0; i < focalNodes.length; ++i) {
        if (focalNodes[i].top > scrollTop) {
          if (focalNodes[i].top - scrollTop < $window.outerHeight()) {
            nodeEntry = focalNodes[i];
            break;
          }
        }
      }

      if (nodeEntry && lastId !== nodeEntry.id) {
        if (options.defer !== undefined) {
          setTimeout(trigger.bind(null, nodeEntry), options.defer);
        }
        else {
          trigger(nodeEntry);
        }

        lastId = nodeEntry.id;
      }
    });

    return {
      reset: function() {
        lastId = null;
      }
    }
  };
}(jQuery));