var request = require('request');
var io = require('socket.io')(process.env.SOCKET_PORT);

var proccessData = function(data){
  var tags = {}
  var groupedTags = {}
  if(data && data["@graph"]){
    for(id in data["@graph"]){
     var graph = data["@graph"][id];
     if(graph && graph["enhancer:entity-label"]){
      var tag = graph["enhancer:entity-label"]["@value"];
      var stripedTag = tag.toLowerCase().replace(/[\s\+\=\_\(\)\[\]\<\>\@\?]/ig,"-");
      tags[stripedTag] = tag;
      if(graph["enhancer:entity-type"]){
        for(var gid in graph["enhancer:entity-type"]){
          var group = graph["enhancer:entity-type"][gid];
          if(group.indexOf("dbp-ont:") > -1){
            var groupName = group.replace(/dbp-ont\:/, "")
            groupedTags[groupName] = groupedTags[groupName] || {};
            groupedTags[groupName][stripedTag] = tag;
          }
        }
      }
     }
    }
  }
  return {tags: tags, groupedTags: groupedTags};
}

io.on('connection', function (socket) {
  socket.on("stanbol", function(data, callback){
    var options = {
      url: process.env.STANBOL_URL,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'text/plain'
      },
      body: data.text
    };

    request.post(options,function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var data = proccessData(info);
        callback(data);
      }else{
        console.log({error: error});
      }
    });
  });
});