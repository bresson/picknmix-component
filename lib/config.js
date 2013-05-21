var urlArgs = require("./utils/url_args");

module.exports = {
  defaultUser: urlArgs.get("erights", "7"),
  search: {
    limit: urlArgs.get("limit", "20"),
  }
}
