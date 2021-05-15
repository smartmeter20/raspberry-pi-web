var token = localStorage.getItem('token');
if(token){
    // const consumption = document.querySelector('#consumption');
    // const balance = document.querySelector('#balance');
    const username = document.querySelector('#username');
    const send = document.querySelector('#send');
    allmessages()
    // setInterval(()=>{
    //     allmessages()
    // },10000)
    send.addEventListener('click',()=>{
        let content = document.querySelector('#content').value;
        console.log(content)
        const data = {sender:"admin",receiver:username.textContent,content}
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
        console.log('Error:', error);
    
      });
    })
    function setUser(user){
        console.log("user",user)
        username.textContent=user;
    }
}else{
    window.location.href='login.html'
}

function allmessages(){
    var table = document.querySelector("#messages");
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
        console.log(window.location.href+"?username="+result.sender);
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            const date = new Date(result.date);
            cell1.innerHTML = counter--;
            cell2.innerHTML = result.sender;
            cell3.innerHTML = result.content;
            cell4.innerHTML = date.toLocaleTimeString();
            cell5.innerHTML = date.toLocaleDateString();
            cell6.innerHTML =`<button type="submit" class="btn btn-primary p-2 m-2 mx-2 col-4" onclick="setUser('${result.sender}')" data-bs-toggle="modal" data-bs-target="#messageModal" role="button" >رد</button>`
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    
  });
}

