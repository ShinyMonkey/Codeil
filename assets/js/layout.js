const imageInput=document.getElementById('image');
const previewImage=document.getElementById('preview_image');
const preImageConatiner=document.getElementById('preview-container');

imageInput.addEventListener('change',function(e){
    const file=imageInput.files[0];
    if(file){
        reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(e){
            preImageConatiner.style.visibility='visible';
            previewImage.src= e.target.result;

        }
    }
})