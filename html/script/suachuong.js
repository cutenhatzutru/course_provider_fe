var urlParams = new URLSearchParams(window.location.search);
var data1 = urlParams.get('data');
const jwt = localStorage.getItem('jwt');

function getchapterbyid() {
  fetch('http://localhost:8083/chapter/'+data1, {
    headers: {
      'Authorization': `Bearer ${jwt}` // Add JWT to Authorization header
    }
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('chaptername').value = data.data.title;
    document.getElementById('chapterdescription').value = data.data.description;
  })
  .catch(error => {
    console.error('Error:', error); // Log error if any
  });
}

function updatechapter() {
  console.log(data1);
  const formData = new FormData(); // Create FormData object
  formData.append('course_id', data1);

  // Get values from input fields and add to FormData
  const title = document.getElementById('chaptername').value;
  formData.append('title', title);

  formData.append("id",data1)

  const description = document.getElementById('chapterdescription').value;
  formData.append('description', description);

  console.log(formData.getAll)
  // Send POST request to update the chapter
  fetch('http://localhost:8083/chapter/update/'+ data1, { // Corrected URL concatenation
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    body: formData // Send the FormData object
  })
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    console.log(data);
    // Uncomment the line below if you want to redirect after update
    // window.location.href = "ql_chuong.html?data=" + data1.course_id;
  })
  .catch(error => {
    console.error('Error:', error); // Log error if any
  });
}

document.addEventListener('DOMContentLoaded', getchapterbyid);