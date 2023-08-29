// creating a class when an element is clicked using ajax
class Toggle{
    constructor(toggleelement){
        this.toggle=toggleelement;
        console.log(this.toggle);
        this.togglelike();
    }



    togglelike(){
        $(this.toggle).click(function(e){
            e.preventDefault();
            let self=this;
            console.log($(self).attr('href'));
            
            $.ajax({
                type:'get',
                url:$(self).attr('href'),
                success:function(data){
                    let likecount=parseInt($(self).attr('data-likes'));
                   if(data.data.deleted== false){
                    likecount+=1;
                   }else{
                    likecount -=1;
                   }
                   
                   $(self).attr('data-likes', likecount);
                   $(self).html(`${likecount} Likes`);
                },
            })
            .fail(function(errData) {
                console.log('error in completing the request', errData);
            });
        })
    }
}