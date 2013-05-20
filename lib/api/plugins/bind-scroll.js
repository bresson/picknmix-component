var binds = [];

module.exports = {
  bind: function(el, scrollEl) {
    binds.push({
      el: el,
      hdl: function() {
        var els = el.find("*[data-ft-term]");

        if(scrollEl === undefined) {
          scrollEl = el;
        }

        $(scrollEl).bind("scroll", function() {
          var scrollTop = $(window).scrollTop();

          var current = null;
          els.each(function() {
            var el  = $(this);
            var top = el.offset().top;

            if(top < scrollTop) {
              current = el;
            }
          });

          if(current === null) {
            current = $(els[els.length-1]);
          }

          console.log("current", current.html());
        });
      }
    })
  },
  unbind: function() {}
};
