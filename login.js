var token = localStorage.getItem('token');

if(!token){
const login = document.querySelector('#login');
console.log(login)
login.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("submit")
const username = document.querySelector('#username').value;
const password = document.querySelector('#password').value;
const data ={username,password}
if(username=="admin"){
    if(password=="admin"){
        localStorage.setItem('token', 'admin');
        window.location.href='index.html'
    }
}else{
    fetch('https://raspberry3.herokuapp.com/user/login', {
        method: 'post', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.token){
            localStorage.setItem('token', data.token);
            window.location.href='user.html'
        }

   
    
      })
      .catch((error) => {
        console.error('Error:', error);
    
      });
}

})
}else{
    if(token=="admin"){
        window.location.href='index.html'
    }else{
        window.location.href='user.html'
    }
 
}