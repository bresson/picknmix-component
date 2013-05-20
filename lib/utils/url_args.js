function args() {
	var out = {};
	var args = document.location.search.replace(/^\?/, "").split("&");
	args.forEach(function(arg) {
		var parts = arg.split("=");
		out[parts[0]] = parts[1];
	});
	return out;
}

function get(k) {
	return args()[k];
}

module.exports = {
	args: args,
	get:  get
};
