function signin() {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let body_data = {
      "username": username,
      "password": password
    };
    
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(body_data)
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        localStorage.setItem('jwt', data);
        window.location.href = "ql_khoahoc.html";
      })
      .catch(error => {
        console.error('Error:', error); // Log lỗi nếu có
      });
  }