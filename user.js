var token = localStorage.getItem('token');
if(token && token!=='admin'){
    console.log(token)
    const consumption = document.querySelector('#consumption');
    const balance = document.querySelector('#balance');
    const username = document.querySelector('#username');
    const send = document.querySelector('#send');
    const seeMessages = document.querySelector('#seeMessages');
    user();
    allmessages();
    send.addEventListener('click',()=>{
        const content = document.querySelector('#content').value;
        console.log(username.textContent)
        const data = {sender:username.textContent,receiver:"admin",content}
        console.log(data)
        fetch('https://raspberry3.herokuapp.com/user/addmessage', {
        method: 'post', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        content="";
      })
      .catch((error) => {
        console.error('Error:', error);
    
      });
    })
  function logout(){
    localStorage.removeItem("token");
    window.location.href='login.html'
  }
}else{
    window.location.href='login.html'
}

function user(){
    fetch('https://raspberry3.herokuapp.com/user/user', {
    method: 'post', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username:token})
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    consumption.textContent = data.consumption;
    balance.textContent = data.balance;
    username.textContent = data.username;
  })
  .catch((error) => {
    console.error('Error:', error);

  });
}

function allmessages(){
    fetch('https://raspberry3.herokuapp.com/user/messages', {
    method: 'post', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({username:token})
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    let counter= data.messages.length;
    let messages = data.messages
    for(let i in messages){
        let result = messages[i];
        seeMessages.innerHTML +=`

        <p style="text-align: center; font-size: larger;">${result.content}</p>
        <hr>`
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    
  });
}