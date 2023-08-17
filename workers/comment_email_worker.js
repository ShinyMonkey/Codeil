const queue=require('../config/kue');
const commentmailer=require('../mailer/comments_mailer')


queue.process('emails',function(job,done){
    console.log('Worker is processing the job',job.data)
    commentmailer.newComment(job.data);
    done();
    
})