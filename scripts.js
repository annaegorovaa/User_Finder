const userDiv = document.getElementById('user-div');

getUser();

document.getElementById('get-user').addEventListener('click', getUser);

function getUser() {
  userDiv.innerHTML = '';
  document.getElementById('loader').style.display = 'block';
  axios.get('https://randomuser.me/api')
    .then(function (response) {
      document.getElementById('loader').style.display = 'none';
      render(response.data.results[0]);
    })
    .catch(function () {
      document.getElementById('loader').style.display = 'none';
      showError();
    }
    );
}

function render(obj) {
  let user = document.createElement('div');
  userDiv.appendChild(user);
  user.setAttribute('id', 'user');
  let avatar = createAvatar(obj);
  user.appendChild(avatar);
  let userData = createUserData(obj);
  user.appendChild(userData);
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
}