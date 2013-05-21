var urlArgs = require("./utils/url_args");

module.exports = {
  defaultUser: urlArgs.get("erights", "8329133"),
  search: {
    limit: urlArgs.get("limit", "20"),
  }
}
