class Modal {
  constructor() {
    this.modal = document.getElementById('modal');
    this.contents = document.querySelector('.modal-contents');
    this.isOpen = false;
    document
      .getElementById('modal-close')
      .addEventListener('click', () => modal.toggle());
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.modal.style.display = this.isOpen ? 'block' : 'none';
  }

  setContent(id) {
    if (!this.modal.firstElementChild.querySelector(`#${id}`)) {
      const newContent = this.contents.querySelector(`#${id}`);
      if (newContent) {
        const oldContent =
          this.modal.firstElementChild.querySelector('.modal-content');
        if (oldContent) {
          this.contents.appendChild(oldContent);
        }
        this.modal.firstElementChild.appendChild(newContent);
      }
    }
    this.toggle();
  }
}

class SessionManager {
  constructor() {}

  setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  signIn(username, password) {
    const storedData = localStorage.getItem(username);
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (password === userData.password) {
        this.setCookie('user', storedData, 30);
        alert('Logged in');
        modal.toggle();
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('User not found');
    }
  }

  signUp(username, email, password, name, birthDate, interests) {
    const userData = {
      username: username,
      email: email,
      password: password,
      name: name,
      birthDate: birthDate,
      interests: interests,
    };
    if (!localStorage.getItem(username)) {
      localStorage.setItem(username, JSON.stringify(userData));
      alert('User created');
      modal.toggle();
    } else {
      alert('User already exists');
    }
  }

  signOut() {
    this.eraseCookie('user');
    alert('Signed out');
  }
}

function filterSearch() {
  const searchInput = document.getElementById('search');
  const filter = searchInput.value.toUpperCase();
  const searchables = document.body.querySelectorAll('.searchable');
  for (i = 0; i < searchables.length; i++) {
    const title = searchables[i].getElementsByTagName('h3')[0];
    const txtValue = title.textContent || title.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      searchables[i].style.display = '';
    } else {
      searchables[i].style.display = 'none';
    }
  }
}

function signUp() {
  const username = document.body.querySelector('#signup-username').value;
  const email = document.body.querySelector('#signup-email').value;
  const password = document.body.querySelector('#signup-password').value;
  const name = document.body.querySelector('#signup-name').value;
  const birthDate = document.body.querySelector('#signup-dob').value;
  const interests = document.body.querySelector('#signup-username').value; // to do: change this
  if (username && email && password && name && birthDate && interests) {
    sessionManager.signUp(
      username,
      email,
      password,
      name,
      birthDate,
      interests
    );
  } else {
    alert('Invalid input');
  }
}

function signIn() {
  const username = document.body.querySelector('#signin-username').value;
  const password = document.body.querySelector('#signin-password').value;
  if (username && password) {
    sessionManager.signIn(username, password);
  } else {
    alert('Invalid input');
  }
}

const sessionManager = new SessionManager();
const modal = new Modal();
const mapAreasContainer = document.getElementsByClassName('map-area');

for (let i = 0; i < mapAreasContainer.length; ++i) {
  mapAreasContainer
    .item(i)
    .addEventListener('click', () => modal.setContent(`map-area-content-${i}`));
}

document
  .getElementById('signin-button')
  .addEventListener('click', () => modal.setContent('signin-content'));

document
  .getElementById('signup-button')
  .addEventListener('click', () => modal.setContent('signup-content'));

document
  .getElementById('signup-submit-button')
  .addEventListener('click', (event) => {
    event.preventDefault();
    signUp();
  });

document
  .getElementById('signin-submit-button')
  .addEventListener('click', (event) => {
    event.preventDefault();
    signIn();
  });
