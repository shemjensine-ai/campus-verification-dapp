let provider;
let signer;
let contract;

// 🔥 PASTE YOUR CONTRACT ADDRESS HERE
const contractAddress = "0xA3E650b835C7A4fAbED32c7815E711Ab063B71D6";

// ABI (only verify function needed)
const abi = [
    "function verifyCertificate(string certId) view returns (string, string, bool)"
];

// Connect Core Wallet
async function connectWallet() {
    if (window.ethereum) {

        provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        signer = provider.getSigner();

        contract = new ethers.Contract(contractAddress, abi, signer);

        alert("Wallet Connected ✅");
    } else {
        alert("Install Core Wallet");
    }
}

// Verify certificate
async function verifyCert() {

    let certId = document.getElementById("certId").value;

    try {
        let result = await contract.verifyCertificate(certId);

        document.getElementById("result").innerText =
            "Name: " + result[0] +
            " | Course: " + result[1] +
            " | Valid: " + result[2];

    } catch (err) {
        console.log(err);
        alert("Error verifying certificate");
    }
}