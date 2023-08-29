{
    let creatPost=function(){
        let newForm=$('#new-post-form');
        newForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:"POST",
                url: '/posts/create-post',
                data:newForm.serialize(),
                success:function(data){
                    console.log(data);
                    let newformdata=creatNewPost(data.data.post);
                    $('#posts_section>ul').prepend(newformdata);
                    console.log($(' .delete-post-btn',newformdata));
                    deletepost($(' .delete-post-btn',newformdata))

                    // call to creat the comment class

                    new PostComments(data.data.post._id);

                    new Toggle($(' .toggle-like-button', newformdata));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })


        
    }
    
    
    // displaying post in DOM
    let creatNewPost=function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-btn" href="/posts/distroy/${post._id}">x</a>
            </small>
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/${post._id}/Post">0 Likes</a>
            </small>
        </p>
        <div class="comment-feed">
                <form action="/comment/create" method="post" id="post-${post._id }-comments-form">
                    <input type="text" name="content" placeholder="Type comment here..." require>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Commment">
                </form>
        
                 <div class="comments">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                 </div>
        </div>
    </li>`)
    }



    let deletepost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'GET',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



    let convertPostTOAjax=function(){
        $('#posts_section>ul>li').each(function(){
            let self=$(this);
            let deleteButton=$(' .delete-post-btn',self);
            console.log("lo");
            deletepost(deleteButton);


            let postId=self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }


    creatPost();
    convertPostTOAjax();
    
}