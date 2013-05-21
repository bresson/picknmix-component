var $ = require("./jquery");

module.exports = {
  hack: function() {
    $(".pagename").remove();
  },
  userCookie: function(k, defaultValue) {
    var out    = {};
    var cookie = $.cookie("FT_U");

    if(cookie === undefined) {
      return defaultValue;
    }

    var items = cookie.split("_");

    items.forEach(function(item) {
      var parts = item.split("=");
      out[parts[0]] = parts[1];
    });

    if(out[k] === undefined) {
      return defaultValue;
    }
    return out[k];
  }
};
