var ytsr = global.nodemodule["ytsr"];
var axios = global.nodemodule["axios"];
var fetch = global.nodemodule["node-fetch"];

var search = async function (type, data){
    
    /*try {
        var fetchdata = await fetch('https://raw.githubusercontent.com/HerokeyVN/AllowPlugins/main/List-Allow');
    	var json = await fetchdata.json();
    	var list = json.list.yts;
    	var admin = json.admin;
    }
    catch (err) {
        return {
            handler: "internal",
            data: "Can't connect to List-Allow!"
        }
    }
    
    if (list["FB-"+data.facebookapi.getCurrentUserID()] || list.allow == true || admin["FB-"+data.facebookapi.getCurrentUserID()]){*/
    
        var msg = data.args.slice(1).join(" ");
        if (msg) {
            var filters = await ytsr.getFilters(msg);
            var filter = filters.get('Type').get('Video');
            var options = {
            limit: 6,
        };
            var search = await ytsr(filter.url, options);
            var searchResults = JSON.parse(JSON.stringify(search));
            var items = (searchResults.items);
	        var viddata = items.map(x => x);
            var img = [];
            var res = "Search results: \r\n" ;
	        items.forEach((x, y) => {
		        img.push( axios({
		            url: x.bestThumbnail.url.slice(0, x.bestThumbnail.url.indexOf("?")), 
		            method: "GET",
		            responseType: "stream"
	        	}));
		        res += `${y+1}. ${x.title} (${x.duration}):\r\n${x.url}\r\n`;
	        });
	        var img = (await Promise.all(img)).map(x => x.data);
            return {
		        handler: "internal",
		        data: {
		        	body: res,
		        	attachment: img
		        }
    	    }
        }
        else {
                return {
                    handler: "internal",
                    data: "Vui lòng nhập từ khóa tìm kiếm!"
                }
        };
    /*}
    else {
        return {
                    handler: "internal",
                    data: "Unlicensed user!"
                }
    };*/
}

module.exports = {
	ytsearch: search
}