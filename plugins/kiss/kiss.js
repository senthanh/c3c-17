var fetch = global.nodemodule["node-fetch"];
var fs = global.nodemodule["fs"];
var path = global.nodemodule["path"];
var wait = global.nodemodule["wait-for-stuff"];
var streamBuffers = global.nodemodule["stream-buffers"];
var fetch = global.nodemodule["node-fetch"];
var merge = global.nodemodule["merge-images"];
var waiton =global.nodemodule["wait-on"];
var Jimp = global.nodemodule["jimp"];
var { Canvas, Image } = global.nodemodule["canvas"];

function onLoad(data) {

var onLoadText = "\n\n";
onLoadText += "=########################################=\n";
onLoadText += "=            I L O V E Y O U             =\n";
onLoadText += "=########################################=\n";
onLoadText += "= Đang tải Plugins Kiss code gốc by Kaysil và được sửa lại bởi DauPhu =";

data.log(onLoadText);
data.log(data);

}

var time = new Date();
function ensureExists(path, mask) {
  if (typeof mask != 'number') {
    mask = 0o777;
  }
  try {
    fs.mkdirSync(path, {
      mode: mask,
      recursive: true
    });
    return undefined;
  } catch (ex) {
    return { err: ex };
  }
}
var rootpath = path.resolve(__dirname, "..", "kiss");
ensureExists(rootpath);
ensureExists(path.join(rootpath, "images"));
ensureExists(path.join(rootpath, "temp"));
var nameMapping = {
    "kiss": path.join(rootpath, "images", "kiss.jpg")
}

for (var n in nameMapping) {
    if (!fs.existsSync(nameMapping[n])) {
        fs.writeFileSync(nameMapping[n], global.fileMap[n]);
    }
}
function sO(object) {
    return Object.keys(object).length;
}
var kiss = function (type, data) {
    var sender = data.msgdata.senderID;
    var mentions = data.mentions;
	var UserAvatar = "UserAvatar_" + Date.now() + ".jpg";
	var UserAvatar1 = "UserAvatar1_" + Date.now() + ".jpg";
	var succ = "Success_" + Date.now() + ".jpg";
	
    if (sO(mentions) == 1) {
        Jimp.read("https://graph.facebook.com/" + sender + "/picture?height=720&width=720").then(img => {
            img.resize(180, 180);
            img.write(path.join(rootpath, "temp", UserAvatar));
        }).catch(err => {
            data.log(err);
        });
        Jimp.read("https://graph.facebook.com/" + Object.keys(mentions)[0].slice(3) + "/picture?height=720&width=720").then(img => {
            img.resize(180, 180);
            img.write(path.join(rootpath, "temp", UserAvatar1));
        }).catch(err => {
            data.log(err);
        });
        waiton({
            resources: [
				path.join(rootpath, "temp", UserAvatar),
				path.join(rootpath, "temp", UserAvatar1)
						],
            timeout: 5000
        }).then(function () {
            merge(
				[
				{
					src: path.join(rootpath, "images", "kiss.jpg")
				},
                {
                    src: path.join(rootpath, "temp", UserAvatar),
                    x: 150,
                    y: 100
                },
                {
                    src: path.join(rootpath, "temp", UserAvatar1),
                    x: 350,
                    y: 180
                }
				], {
                Canvas: Canvas,
                Image: Image
				   }
				).then(function (res) {
					
                fs.writeFile(
					path.join(rootpath, "temp", succ), 
					res.replace(/^data:image\/png;base64,/, ""), 
					'base64', 
					function (err) {
						
                    if (err) data.log(err);
					
                        var img = fs.createReadStream(path.join(rootpath, "temp", succ));
						var name = global.data.cacheName["FB-" + Object.keys(mentions)[0].slice(3)]
                        data.return({
                            handler: "internal-raw",
                            data: {
                                body: `Ôi không @${name}, Đã hôn :<`,
                                mentions: [{
                                	tag: `@${name}`,
                                	id: Object.keys(mentions)[0].slice(3),
                                	fromIndex: 9
                                }],
                                attachment: ([img])
                            }
                        });
						img.on("close", () => {
						try {
                        fs.unlinkSync(path.join(rootpath, "temp", UserAvatar));
                        fs.unlinkSync(path.join(rootpath, "temp", UserAvatar1));
                        fs.unlinkSync(path.join(rootpath, "temp", succ));
						} catch (err) {}
						})
                });
            }).catch(err => {
                data.log(err);
            });
        }).catch(err => {
                data.log(err);
            });
    } else {
        return {
            handler: 'internal',
            data: global.config.commandPrefix+'kiss <@mentions> [Hôn ai đó]'
        }
    }
 }
module.exports = {
	kiss: kiss,
	onLoad
}
