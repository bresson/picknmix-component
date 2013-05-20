module.exports = {
  hack: function() {
    $(".pagename a").html("<marquee>Pick 'n' mix</marquee>");
  },
  userCookie: function(k) {
    var cookie = $.cookie("FT_U")
    if(cookie === undefined) return;
    var items  = cookie.split("_")
    var out = {};

    items.forEach(function(item) {
      var parts = item.split("=");
      out[parts[0]] = parts[1];
    });
    if(k !== undefined && out[k] !== undefined) {
      return out[k];
    }
    return out;
  }
};
