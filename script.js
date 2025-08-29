const countdownEl = document.getElementById('countdown');
const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEl.textContent = 'Airdrop ended';
    clearInterval(interval);
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

const connectButton = document.getElementById('connectButton');
const statusEl = document.getElementById('status');

connectButton.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      statusEl.textContent = `Connected: ${accounts[0]}`;
    } catch (err) {
      statusEl.textContent = `Connection failed: ${err.message}`;
    }
  } else {
    statusEl.textContent = 'MetaMask not detected';
  }
});

const claimForm = document.getElementById('claimForm');
claimForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  statusEl.textContent = `Thank you, ${name}! Claim submitted for ${email}.`;
});
