module.exports.home=function(req,res){
    // res.end("<h1>Express is up for Codeil</h1>")
    return res.render('home',{
        title:'Codel',
        header:'header',
    })
}


// module.exports.actionName=function(req,res){};