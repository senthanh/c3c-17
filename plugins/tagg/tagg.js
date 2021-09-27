!global.data.tagg ? global.data.tagg = {} : "";


function nhom(name,threadID,data) {
	data.facebookapi.getThreadInfo(threadID,(err,adinfo) =>{
		if(err) return{
				handler: 'internal',
				data: `Hiện tại bot đang lỗi lệnh lấy thông tin nhóm, mong bạn thông cảm`
		}

		if(!adinfo.isGroup) {
	       	return{
				handler: 'internal',
				data: `ủa đây là nhóm à ?`
			}
	    }else if(name == "qtv"){
			var adminIDs = adinfo.adminIDs.map(x => x.id.toString());

	    	return tagsml("qtv",adminIDs,data,threadID)

	   	}else if( name == "all"){
	    	return{
				handler: 'internal',
				data: `@everyone`
			}
	    }
				
     });
}

var tag = async function(type, data){
	var threadID =  data.msgdata.threadID;
    var api =  data.facebookapi;
	 
	 
    
	var args = data.msgdata.body;
	
    var vitri = args.indexOf("<=");
    var listTag = [];

    var body = args.slice(5);
    !global.data.tagg[threadID] ? global.data.tagg[threadID] = {} : "";

    if ( vitri == -1 ) {

    	var chon = (body.toString()).toLowerCase();

		if (chon == "qtv") {

			return nhom(chon,threadID,data);

		}else if(chon == "all"){

			return nhom(chon,threadID,data);

		}else if (!global.data.tagg[threadID][body]) {

			return{
				handler: 'internal',
				data: `Nhóm của bạn k có lệnh ${body}`
			}

	    } else {
            listTag = Object.keys(global.data.tagg[threadID][body]);
            return tagsml(body,listTag,data,threadID)
	    }
                       
    } else {
        var name = args.slice(5, vitri-1).toLowerCase();
        for (var y in data.mentions) {
		    listTag.push(y.slice(3,y.length));
		}

        
      //          return{
						// 	handler: 'internal',
						// 	data: name
						// }
		if (!listTag.length) {
	          return{
					handler: 'internal',
					data: "Bạn phải nhận người cần tag"
				}
		} else if (!global.data.tagg[threadID][name]) {
        	global.data.tagg[threadID][name] = {};

        	listTag.forEach(v => {
	          global.data.tagg[threadID][name][v] = {};
	        });

	        return{
				handler: 'internal',
				data: `Đã tạo tag vs name: ${name} gồm ${listTag.length} thành viên`
			}
	   		 
        }else {
            listTag.forEach(v => {
	            global.data.tagg[threadID][name][v] ={}
	        });
	        return{
				handler: 'internal',
				data: `Đã thếm vào ${name}: ${listTag.length} thành viên`
			}
        }
        
   }
}

var list = function(type, data){
   var a = data.args[1];
   var threadID = data.msgdata.threadID;
   var b = data.args[2];
   var c = data.args[3];
   !global.data.tagg[threadID] ? global.data.tagg[threadID] = {} : "";
   var body = "\n";
   var isFind = false;

   var listTag = Object.keys(global.data.tagg[threadID]);
   listTag.push("qtv");
   listTag.push("all");

   if (a == "show") {
   	if(typeof b == "string"){
   		if(b == "qtv"){
   			return{
				handler: 'internal',
				data: `tag all qtv trong nhóm`
			}
   		}else if(b == "all"){
   			return{
				handler: 'internal',
				data: `tag all mem trong nhóm`
			}
   		}else{
   			!global.data.tagg[threadID][b] ? isFind = false : isFind = true;
   			if (!isFind) {
   				return{
					handler: 'internal',
					data: `k có lệnh này`
				}
   			} else {
   				var listMen = Object.keys(global.data.tagg[threadID][b]);
		   		for(let i in listMen){
		   			body = body + i +". "+global.data.cacheName["FB-" +listMen[i]]+"\n"
		   		}
		   		return{
					handler: 'internal',
					data: `Nhóm ${b} gồm :`+body
				}
   			}
   			
   	}
   }
   	if (!b) {
   		return{
			handler: 'internal',
			data: `Bạn chưa nhập nhóm muốn xem \nVD: ${global.config.commandPrefix}list show 1`
		}
   	
   	} else {
   		var namee = listTag[b];
   		if(namee == "qtv"){
   			return{
				handler: 'internal',
				data: `tag all qtv trong nhóm`
			}
   		}else if(namee == "all"){
   			return{
				handler: 'internal',
				data: `tag all mem trong nhóm`
			}
   		}else{
   			!global.data.tagg[threadID][namee] ? isFind = false : isFind = true;
   			if (!isFind) {
   				return{
					handler: 'internal',
					data: `k có lệnh này`
				}
   			} else {
   				var listMen = Object.keys(global.data.tagg[threadID][namee]);
		   		for(let i in listMen){
		   			body = body + i +". "+global.data.cacheName["FB-" +listMen[i]]+"\n"
		   		}
		   		return{
					handler: 'internal',
					data: `Nhóm ${namee} gồm :`+body
				}
   			}
   			
   		}
   		
   	}
   } else if (a == "del") {
   	if(typeof b == "string"){
   		if(b == "qtv"){
	   			return{
					handler: 'internal',
					data: `Bạn k thể xóa nhóm này`
				}
	   		}else if(b == "all"){
	   			return{
					handler: 'internal',
					data: `Bạn k thể xóa nhóm này`
				}
	   		}else{
	   			!global.data.tagg[threadID][b] ? isFind = false : isFind = true;
	   			if (!isFind) {
	   				return{
						handler: 'internal',
						data: `k có lệnh này`
					}
	   			} else {
	   				delete global.data.tagg[threadID][b];
	   		
			   		return{
						handler: 'internal',
						data: `Đã xóa nhóm ${b}`
					}
	   			}
	   			
	   		}
   }
	   	if (!b) {
	   		return{
				handler: 'internal',
				data: `Bạn chưa nhập nhóm muốn xem \nVD: ${global.config.commandPrefix}list show 1`
			}
	   	} else  {
	   		var namee = listTag[b];
	   		if(namee == "qtv"){
	   			return{
					handler: 'internal',
					data: `Bạn k thể xóa nhóm này`
				}
	   		}else if(namee == "all"){
	   			return{
					handler: 'internal',
					data: `Bạn k thể xóa nhóm này`
				}
	   		}else{
	   			!global.data.tagg[threadID][namee] ? isFind = false : isFind = true;
	   			if (!isFind) {
	   				return{
						handler: 'internal',
						data: `k có lệnh này`
					}
	   			} else {
	   				delete global.data.tagg[threadID][listTag[b]];
	   		
			   		return{
						handler: 'internal',
						data: `Đã xóa nhóm ${listTag[b]}`
					}
	   			}
	   			
	   		}



	   		
	   	}
   		
        
    }else {
		for (var i = 0; i < listTag.length; i++) {
   
   			body = body + i +". "+listTag[i]+"\n"
		 }

	   return{
			handler: 'internal',
			data: 'Nhóm của bạn gồm các lệnh sau:'+body+`dùng ${global.config.commandPrefix}list show/del stt nhóm bạn muốn xem/xóa \nVD: ${global.config.commandPrefix}list show/del 1`
		}
    }


   
   

}






function tagsml(body,listTag,data,threadID) {
	var  mentions = [];
    var end = body.slice(body.length-1,body.length);



	for(let i in listTag){
		if (i == body.length) body += end;

			mentions.push({
				tag: body[i],
				id: listTag[i],
				fromIndex: i
			});
	}
	

	 data.facebookapi.sendMessage({ body,mentions}, threadID);;
}

module.exports = {
	tag,
	list
}