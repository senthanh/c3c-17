var fetch = global.nodemodule["node-fetch"];

function onLoad(data) {

var onLoadText = "Đang tải kit thiên văn học by DauPhuAB";
onLoadText += "\n\n";
onLoadText += "================================================================================\n";
onLoadText += "=                     ----------------------------------                       =\n";
onLoadText += "=                              Kit Thiên Văn Học                               =\n";
onLoadText += "=                     ==================================                       =\n";
onLoadText += "=                           *Facebook : Đậu Phụ Nè                             =\n";
onLoadText += "=                          *Plugin run by DauPhuAB*                            =\n";
onLoadText += "=                       Loader Kit Thiên Văn Học V2.0                          =\n";
onLoadText += "=                            Plugin For C3C Bot                                =\n";
onLoadText += "=                       Thank for the used and download                        =\n";
onLoadText += "=                     ==================================                       =\n";
onLoadText += "================================================================================\n";
onLoadText += "#############################################\n";
onLoadText += "Phiên bản hiện tại đang là mới nhất\n";
onLoadText += "#############################################\n";
onLoadText += "Đã tải xong plugins kit thiên văn học ^^\n";
onLoadText += "Đang sẵn sàng cho lần chạy này ..... \n"

data.log(onLoadText);
data.log(data);

}

var saobang_get = function saobang_get(type, data) {
	(async function () {
		var returntext = `Sao băng, hay sao sa, là đường nhìn thấy của các thiên thạch và vẫn thạch khi chúng đi vào khí quyển Trái Đất. Trên Trái Đất, việc nhìn thấy đường chuyển động của các thiên thạch này là do nhiệt phát sinh ra bởi áp suất nén khi chúng đi vào khí quyển. `;
		return {
			handler: "internal",
			data: returntext
		}
	})().then(function (returndata) {
		data.return(returndata);
	});
} 

module.exports = {
	saobang_get: saobang_get,
	onLoad
}