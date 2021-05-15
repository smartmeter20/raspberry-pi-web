var token = localStorage.getItem('token');
if(token){
    let selector = document.querySelector("#selector");
    let selector1 = document.querySelector("#selector1");
    let deleteSelector = document.querySelector("#deleteSelector");
    let addBalance = document.querySelector("#addBalance");
    let balance = document.querySelector("#balance");
    let pulses = document.querySelector("#pulses");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let addUser = document.querySelector("#addUser");
    let deleteUser = document.querySelector("#deleteUser");
    let addPulses = document.querySelector("#addPulses");
    viewAll()
    fetch('https://raspberry3.herokuapp.com/user/allUsers', {
    method: 'get', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data.user);
    let users = data.user
    for(let i in users){
        selector.innerHTML+=`<option value="${users[i].username}">${users[i].username}</option>`
        deleteSelector.innerHTML+=`<option value="${users[i].username}">${users[i].username}</option>`
        selector1.innerHTML+=`<option value="${users[i].username}">${users[i].username}</option>`
    }

  })
  .catch((error) => {
    console.error('Error:', error);

  });
  addBalance.addEventListener('click',()=>{
        let data = {balance:balance.value,username:selector.value}
        fetch('https://raspberry3.herokuapp.com/user/addBalance', {
            method: 'post', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
        
          });
  })

  addPulses.addEventListener('click',()=>{
    let data = {pulses:pulses.value,username:selector1.value}
    fetch('https://raspberry3.herokuapp.com/user/addPulses', {
        method: 'post', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
    
      });
})

  addUser.addEventListener('click',()=>{
    let data = {username:username.value,password:password.value}
    fetch('https://raspberry3.herokuapp.com/user/addUser', {
        method: 'post', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.href='index.html'
      })
      .catch((error) => {
        console.error('Error:', error);
    
      });
})

deleteUser.addEventListener('click',()=>{
    let data = {username:deleteSelector.value}
    fetch('https://raspberry3.herokuapp.com/user/deleteUser', {
        method: 'post', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.location.href='index.html'
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

function viewAll(){
    var table = document.querySelector("#viewALl");
    fetch('https://raspberry3.herokuapp.com/user/allUsers', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    let counter= data.user.length;
    let users = data.user
    for(let i in users){
        let result = users[i];
        console.log(result);
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = counter--;
            cell2.innerHTML = result.username;
            cell3.innerHTML = result.consumption;
            cell4.innerHTML = result.balance;
            cell5.innerHTML = result.status;
           
           
    }
  })
  .catch((error) => {
    console.error('Error:', error);

  });
  }