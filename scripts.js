getUser();

document.getElementById('get-user').addEventListener('click', getUser);

function getUser() {
  axios.get('https://randomuser.me/api')
    .then(function (response) {
      render(response.data.results[0]);
    })
    .catch(function () {
      showError();
    }
    );

}

function render(obj) {
  const userDiv = document.getElementById('user-div');
  userDiv.innerHTML = '';
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
  userData.setAttribute('id', 'data');
  let name = document.createElement('p');
  name.innerText =
      `Name: ${obj.name.first.charAt(0).toUpperCase()}${obj.name.first.slice(1)} ${obj.name.last.charAt(0).toUpperCase()}${obj.name.last.slice(1)}\n`;
  userData.appendChild(name);
  let age = document.createElement('p');
  age.innerText += `Age: ${obj.dob.age}\n`;
  userData.appendChild(age);
  let email = document.createElement('p');
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