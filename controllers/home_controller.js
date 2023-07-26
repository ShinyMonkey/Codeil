module.exports.home=function(req,res){
    // res.end("<h1>Express is up for Codeil</h1>")
    // if(req.isAuthenticated()){
    //     return res.redirect('/users/profile');
    // }
    return res.render('home',{
        title:'Codel',
        header:'header',
    })
}


// module.exports.actionName=function(req,res){};