document.getElementById('get-user').addEventListener('click', getUser);

function getUser() {
  axios.get('https://randomuser.me/api')
    .then(function (response) {
      render(response.data.results[0]);
    })
    .catch(function (error) {
      console.log(error);
    });

}

function render(obj) {
  document.getElementById('h1').innerText = obj.email;
}