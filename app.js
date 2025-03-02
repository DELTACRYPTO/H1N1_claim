WE ARE BASED#
// Vérifie si MetaMask est installé
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  alert("Please install MetaMask to interact with this site.");
}

// Crée une instance de Web3 avec MetaMask
const web3 = new Web3(window.ethereum);

// Adresse du contrat déployé
const contractAddress = '0x663FdD6Cdf393d6deFbD30e2fFffb070DDab8Bfa';

// L'ABI du contrat (copie-colle ici l'ABI que tu as donnée)
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "IntroTokenClaimed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasClaimed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimIntroToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Crée une instance du contrat
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Fonction pour obtenir l'adresse de l'utilisateur via MetaMask
async function getUserAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

// Fonction pour réclamer le token
async function claimToken() {
  const userAccount = await getUserAccount();
  if (!userAccount) {
    alert("Please connect your wallet.");
    return;
  }

  // Vérifier si l'utilisateur a déjà réclamé le token
  try {
    const hasClaimed = await contract.methods.hasClaimed(userAccount).call();
    if (hasClaimed) {
      alert("You have already claimed your token.");
      return;
    }

    // Appel de la fonction claimIntroToken() du contrat
    await contract.methods.claimIntroToken().send({ from: userAccount });
    alert("Token claimed successfully!");
  } catch (error) {
    console.error("Error claiming token:", error);
    alert("There was an error claiming the token.");
  }
}

// Attacher l'événement au bouton "Claim"
document.getElementById('claimButton').addEventListener('click', claimToken);
