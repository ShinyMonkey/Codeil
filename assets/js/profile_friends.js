{
   $(' #toggle-button').click(function(e){
    e.preventDefault();
    console.log($(' #toggle-button').attr('href'));
    $.ajax({
        type: 'GET',
        url: $(' #toggle-button').attr('href'),
    })
    .done(function(data){
        console.log(data);
        if(data.data.areFriends== false){
            $(' #toggle-button').html('Add-friend')
            // req.flash('sucess')
            req.flash('success',`${data.data.name} is your friend now`);
        }else{
            $(' #toggle-button').html('Remove-friend');
            req.flash('success',`${data.data.name} is not your friend now`);
        }
    })
    .fail(function(errData) {
        console.log('error in completing the request', errData);
    });
   }) 
}