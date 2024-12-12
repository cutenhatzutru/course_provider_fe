var urlParams = new URLSearchParams(window.location.search);
var chapter_id = urlParams.get('data');
const jwt = localStorage.getItem('jwt');

function getUrl(type) {
    return fetch(`http://localhost:8081/lesson/getpreurl?type=${type}`, {
        headers: {
            'Authorization': `Bearer ${jwt}` // Add JWT to Authorization header
        }
    })
    .then(response => response.json())
    .then(data1 => data1.data)
    .catch(error => {
        console.error('Error:', error);
    });
}

function addLesson() {
    const inputVideo = document.getElementById('videoFile').files[0];
    const inputText = document.getElementById('textFile').files[0];

    const formData = new FormData();
    formData.append('title', document.getElementById('textNameC').value);
    formData.append('description', document.getElementById('textDescriptionC').value);
    formData.append('content', document.getElementById('textContent').value);
    formData.append('chapterId', chapter_id); // Use chapter_id from URL

    if (inputVideo) {
        getUrl("video").then(data => {
            uploadToS3(data.url, inputVideo).then(() => {
                formData.append('videoUrl', data.fileName);
                addLessonToDB(formData);
            });
        });
    }

    if (inputText) {
        getUrl("text").then(data => {
            uploadToS3(data.url, inputText).then(() => {
                formData.append('textUrl', data.fileName);
                addLessonToDB(formData);
            });
        });
    }

    // If both are present, handle them separately
    if (inputVideo && inputText) {
        // Already handled in the above if statements
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

function addLessonToDB(formData) {
    return fetch('http://localhost:8081/lesson/addlessontochapter', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            // No 'Content-Type' header needed for FormData
        },
        body: formData // Send FormData directly
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Optionally redirect or handle success
        window.location.href = `./ql_baihoc.html?data=${chapter_id}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}