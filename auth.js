document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Menu Dropdown dan Pengaturan
  const dropdownToggle = document.getElementById('dropdown-a'); // Untuk menampilkan email
  const signupLink = document.getElementById('signup-link'); // Link Signup
  const logoutBtn = document.getElementById('logout-btn'); // Tombol Logout
  const userEmailDisplay = document.getElementById('user-email'); // Untuk menampilkan email di paragraf

  // Jika berada di halaman login.html
  if (window.location.pathname.includes('login.html')) {
    const authButton = document.getElementById('auth-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const toggleForm = document.getElementById('toggle-form');

    toggleForm.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'signup.html'; // Arahkan ke signup.html
    });

    authButton.addEventListener('click', () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        errorMsg.textContent = 'Please fill out all fields.';
        return;
      }

      if (user && user.email === email && user.password === password) {
        // Login sukses, arahkan ke halaman profil
        window.location.href = 'index.html';
      } else {
        errorMsg.textContent = 'Invalid email or password.';
      }
    });
  }

  // Jika berada di halaman signup.html
  if (window.location.pathname.includes('signup.html')) {
    const authButton = document.getElementById('auth-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
    const toggleForm = document.getElementById('toggle-form');

    toggleForm.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html'; // Arahkan ke login.html
    });

    authButton.addEventListener('click', () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        errorMsg.textContent = 'Please fill out all fields.';
        return;
      }

      if (user && user.email === email) {
        errorMsg.textContent = 'Email is already registered.';
        return;
      }

      const newUser = { email, password };
      localStorage.setItem('user', JSON.stringify(newUser)); // Menyimpan data user ke localStorage
      alert('Sign Up successful! You can now log in.');
      window.location.href = 'login.html'; // Arahkan ke login setelah sign up
    });
  }

  // Jika berada di halaman index.html (Profil)
  if (window.location.pathname.includes('index.html')) {
    if (!user) {
      // Jika tidak ada user di localStorage, arahkan ke halaman login
      window.location.href = 'login.html';
    } else {
      // Menampilkan email pengguna di halaman profil
      userEmailDisplay.textContent = `Email: ${user.email}`;
    }

    // Logout Button
    logoutBtn.addEventListener('click', () => {
      // Menghapus data user dari localStorage
      localStorage.removeItem('user');
      // Arahkan ke halaman login setelah logout
      window.location.href = 'login.html';
    });
  }

  // Menu dropdown untuk Profile
  if (dropdownToggle) {
    if (user) {
      // Tampilkan email pengguna di dropdown
      userEmailDisplay.textContent = `Email: ${user.email}`; // Ganti teks dengan email pengguna
      signupLink.style.display = 'none'; // Sembunyikan link Signup jika sudah login
      logoutBtn.style.display = 'block'; // Tampilkan link Logout jika sudah login
    } else {
      // Jika pengguna belum login
      dropdownToggle.textContent = 'Profile'; // Setel teks kembali ke "Profile"
      signupLink.style.display = 'block'; // Tampilkan link Signup
      logoutBtn.style.display = 'none'; // Sembunyikan link Logout
    }
  }
});
// Fungsi JavaScript untuk menangani pencarian
function handleSearch(event) {
  event.preventDefault(); // Mencegah pengiriman form

  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const allElements = document.body.getElementsByTagName('*'); // Mengambil semua elemen di halaman

  if (!query) {
    alert('Please enter a search query!');
    return false;
  }

  let found = false;
  Array.from(allElements).forEach(element => {
    // Mencari apakah elemen berisi teks yang dicari
    if (element.textContent.toLowerCase().includes(query) && element.textContent.trim() !== '') {
      element.classList.remove('hidden'); // Menampilkan elemen yang ditemukan
      found = true;
    } else {
      element.classList.add('hidden'); // Menyembunyikan elemen yang tidak ditemukan
    }
  });

  if (!found) {
    alert('No results found!');
  }

  return false;
}
// Fungsi untuk membuka/menutup jendela live chat
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  const livechatButton = document.getElementById('livechat-button');
  
  if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'flex';
    livechatButton.style.display = 'none'; // Sembunyikan tombol Livechat saat chat terbuka
  } else {
    chatWindow.style.display = 'none';
    livechatButton.style.display = 'block'; // Tampilkan tombol Livechat saat chat ditutup
  }
}

// Fungsi untuk menangani input pengguna
function handleInput(event) {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();

  // Jika pengguna menekan enter, kirim pesan
  if (event.key === 'Enter' && message) {
    sendMessage();
  }
}

// Fungsi untuk mengirim pesan dari pengguna
function sendMessage() {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();

  if (!message) return;

  // Menampilkan pesan pengguna
  const chatMessages = document.getElementById('chat-messages');
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user');
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);

  // Mengirim balasan otomatis dari bot
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');
    botMessage.textContent = "Thank you for your message. How can I help you further?";
    chatMessages.appendChild(botMessage);
    
    // Scroll ke bawah setelah pesan baru
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  // Kosongkan input setelah mengirim pesan
  inputField.value = '';
  inputField.focus();

  // Scroll ke bawah setelah pesan baru
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


