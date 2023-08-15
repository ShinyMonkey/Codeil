module.exports.index=function(req,res){
    return res.json(200,{
        message: "List Of Posts From V2",
        Posts_v2:[],
    })
}