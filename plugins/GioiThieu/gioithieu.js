var fetch = global.nodemodule["node-fetch"];

var gioithieu = function gioithieu(type, data) {
	(async function () {
		var returntext = `https://www.facebook.com/oniichanbakazero.`;
		return {
			handler: "internal",
			data: returntext
		}
	})().then(function (returndata) {
		data.return(returndata);
	});
} 

function onLoad(data) {

var onLoadText = "Loaded \"GIOI THIEU\" by Wua'n";

data.log(onLoadText);

}
module.exports = {
	gioithieu: gioithieu
}