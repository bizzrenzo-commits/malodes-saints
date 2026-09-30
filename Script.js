document.addEventListener('DOMContentLoaded', function() {
  const regForm = document.getElementById('regForm');
  const regStatus = document.getElementById('statusMessage');
  const playerList = document.getElementById('playerList');

  const mpesaForm = document.getElementById('mpesaForm');
  const mpesaStatus = document.getElementById('mpesaStatus');

  // Load existing player list on page startup
  loadPlayers();

  // Registration Form Handler
  if (regForm) {
    regForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const playerName = document.getElementById('playerName').value.trim();
      const position = document.getElementById('position').value;
      const parentName = document.getElementById('parentName').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (phone.length < 10) {
        regStatus.className = 'status-message error';
        regStatus.textContent = 'Please enter a valid 10-digit phone number.';
        return;
      }

      const newPlayer = {
        name: playerName,
        position: position,
        parent: parentName,
        phone: phone
      };

      savePlayer(newPlayer);

      regStatus.className = 'status-message success';
      regStatus.textContent = `Success! ${playerName} (${position}) has been registered.`;

      loadPlayers();
      regForm.reset();
    });
  }

  // M-Pesa Form Handler
  if (mpesaForm) {
    mpesaForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const phone = document.getElementById('mpesaPhone').value.trim();
      const amount = document.getElementById('feeType').value;

      if (phone.length < 10) {
        mpesaStatus.className = 'status-message error';
        mpesaStatus.textContent = 'Enter a valid 10-digit phone number.';
        return;
      }

      mpesaStatus.className = 'status-message success';
      mpesaStatus.textContent = `Sending M-Pesa STK Push of KSh ${amount} to ${phone}... Check your phone to enter PIN.`;

      setTimeout(() => {
        mpesaStatus.textContent = `Payment of KSh ${amount} from ${phone} received! Thank you.`;
      }, 4000);
    });
  }

  function savePlayer(player) {
    let players = JSON.parse(localStorage.getItem('academyPlayers')) || [];
    players.push(player);
    localStorage.setItem('academyPlayers', JSON.stringify(players));
  }

  function loadPlayers() {
    if (!playerList) return;
    playerList.innerHTML = '';

    let players = JSON.parse(localStorage.getItem('academyPlayers')) || [];

    if (players.length === 0) {
      playerList.innerHTML = '<li class="no-players">No registrations yet.</li>';
      return;
    }

    players.forEach((p) => {
      const li = document.createElement('li');
      li.className = 'player-item';
      li.innerHTML = `<strong>${p.name}</strong> - ${p.position} <span class="contact-info">(Guardian: ${p.parent})</span>`;
      playerList.appendChild(li);
    });
  }
});