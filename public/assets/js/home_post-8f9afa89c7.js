{let e=function(){let e=$("#new-post-form");e.submit((function(o){o.preventDefault(),$.ajax({type:"POST",url:"/posts/create-post",data:e.serialize(),success:function(e){console.log(e);let o=t(e.data.post);$("#posts_section>ul").prepend(o),console.log($(" .delete-post-btn",o)),n($(" .delete-post-btn",o)),new PostComments(e.data.post._id),new Toggle($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},t=function(e){return $(`<li id="post-${e._id}">\n        <p>\n            \n            <small>\n                <a class="delete-post-btn" href="/posts/distroy/${e._id}">x</a>\n            </small>\n            ${e.content}\n            <br>\n            <small>\n            ${e.user.name}\n            </small>\n            <small>\n                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/${e._id}/Post">0 Likes</a>\n            </small>\n        </p>\n        <div class="comment-feed">\n                <form action="/comment/create" method="post" id="post-${e._id}-comments-form">\n                    <input type="text" name="content" placeholder="Type comment here..." require>\n                    <input type="hidden" name="post" value="${e._id}">\n                    <input type="submit" value="Add Commment">\n                </form>\n        \n                 <div class="comments">\n                    <ul id="post-comments-${e._id}">\n                        \n                    </ul>\n                 </div>\n        </div>\n    </li>`)},n=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"GET",url:$(e).prop("href"),success:function(e){$(`#post-${e.data.post_id}`).remove()},error:function(e){console.log(e.responseText)}})}))},o=function(){$("#posts_section>ul>li").each((function(){let e=$(this),t=$(" .delete-post-btn",e);console.log("lo"),n(t);let o=e.prop("id").split("-")[1];new PostComments(o)}))};e(),o()}