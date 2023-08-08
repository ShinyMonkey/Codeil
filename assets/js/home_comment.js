class PostComments{
    constructor(postId){
        this.postId=postId;
        this.postContainer=$(`#post-${postId}`);
        this.newComment=$(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self=this;

        $(' .delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        // let newComment=$(`#post-${postId}-comments-form`);
        let Pself=this;
        this.newComment.submit(function(e){
            console.log('yes');
            e.preventDefault();
            let self=this;
            $.ajax({
                type: 'POST',
                url: '/comment/create',
                data:$(self).serialize(),
                success:function(data){
                    console.log(data);
                    let commentData=data.data.comment;
                    // let commentPostId=data.data.data.post;
                    // console.log(commentPostId);
                    // console.log(e._id);
                    let newCommentFormed=Pself.newCommentData(commentData);
                    // console.log(newCommentFormed);
                    $(`#post-comments-${postId}`).prepend(newCommentFormed);
                    
                    Pself.deleteComment($(' .delete-comment-button',newCommentFormed));
                    console.log($(' .delete-comment-button',newCommentFormed));
                    
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // Display it on DOM
    newCommentData(comment){
        return (`<li id="comment-${comment._id}">
        ${comment.content}
        <br>
        <small>${comment.user.name}</small>
        <p>
            
                <a class="delete-comment-button" href="/comment/distroy/${comment._id}">x</a>

        </p>
        </li>`);
    }


    deleteComment(deleteLink){
        console.log(deleteLink);
        console.log($(deleteLink).prop('href'));
        $(deleteLink).on('click',function(e){
           console.log($(deleteLink).prop('href'));
            e.preventDefault();
            // console.log(deleteLink);
            $.ajax({
                type:'GET',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    // $(`#comment-${data.data.comment_id}`).remove();
                    // console.log('*');
                    
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    

    
}

