var urlParams = new URLSearchParams(window.location.search);
var chapter_id = urlParams.get('data');

function getUrl(type){
    return fetch("http://localhost:8080/upload/lesson/getpreurl?type="+type)
    .then(response => response.json())
    .then(data =>{
      return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addLesson(){
  const inputVideo = document.getElementById('videoFile').files[0];
  const inputText =  document.getElementById('textFile').files[0];

  const formData = new FormData();

  const title = document.getElementById('textNameC').value;
  formData.append('title', title);

  const description = document.getElementById('textDescriptionC').value;
  formData.append('description', description);

  const content = document.getElementById('textContent').value;
  formData.append('content', content);

  formData.append('chapter_id', chapter_id);

  if(inputVideo!=null){
    getUrl("video")
    .then(data => {
      console.log(data);
      uploadToS3(data.url,inputVideo)
      .then(()=>{
        formData.append('videoUrl', title);
        addLessonToDB(formData)
        .then(data2 => console.log(data2))
      })
    })
  }


}


function uploadToS3(presignedUrl, file) {
    return fetch(presignedUrl, {
      method: 'PUT',
      body: file
    })
    .then(response => {
        if (response.ok) {
            console.log('Uploaded');
        } else {
          console.error('Upload failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
}


function addLessonToDB(formData){

  return fetch('http://localhost:8080/upload/lesson/addlessontochapter', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.href = "./ql_baihoc.html?data="+chapter_id;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
