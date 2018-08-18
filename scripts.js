const userDiv = document.getElementById('user-div');
const getUserButton = document.getElementById('get-user');

getUser();

getUserButton.addEventListener('click', getUser);

function getUser() {
  getUserButton.disabled = true;
  userDiv.innerHTML = '';
  document.getElementById('loader').style.display = 'block';
  setTimeout(() => {
    axios.get('https://randomuser.me/api')
      .then(function (response) {
        document.getElementById('loader').style.display = 'none';
        render(response.data.results[0]);
      })
      .catch(function (error) {
        document.getElementById('loader').style.display = 'none';
        console.log(error);
        showError();
      });
  }, 1000);
}

function render(obj) {
  userDiv.innerHTML = '';
  let user = document.createElement('div');
  userDiv.appendChild(user);
  user.setAttribute('id', 'user');
  let avatar = createAvatar(obj);
  user.appendChild(avatar);
  let userData = createUserData(obj);
  user.appendChild(userData);
  getUserButton.disabled = false;
}

function createAvatar(obj) {
  let avatar = document.createElement('div');
  let userImage = document.createElement('img');
  userImage.setAttribute('src', obj.picture.large);
  avatar.appendChild(userImage);
  return avatar;
}

function createUserData(obj) {
  let userData = document.createElement('div');
  let name = document.createElement('p');
  let age = document.createElement('p');
  let email = document.createElement('p');
  userData.setAttribute('id', 'data');
  name.innerText =
      `Name: ${obj.name.first.charAt(0).toUpperCase()}${obj.name.first.slice(1)} ${obj.name.last.charAt(0).toUpperCase()}${obj.name.last.slice(1)}\n`;
  userData.appendChild(name);
  age.innerText += `Age: ${obj.dob.age}\n`;
  userData.appendChild(age);
  email.innerText += `Email: ${obj.email}`;
  userData.appendChild(email);
  return userData;
}

function showError() {
  const userDiv = document.getElementById('user-div');
  userDiv.innerHTML = '';
  let error = document.createElement('div');
  userDiv.appendChild(error);
  error.setAttribute('id', 'user');
  error.innerText = 'Sorry. Try again.';
  getUserButton.disabled = false;
}