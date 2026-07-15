
alert("JS connected");
let provider;
let signer;
let contract;

// 🔥 PASTE YOUR CONTRACT ADDRESS HERE
const contractAddress = "0x64077a99b4AE85da5B9277953f3Fe8409D34F553";

// ABI (only verify function needed)
const abi = [

"function verifyCertificate(string certId) view returns (string, string, bool)",

"function registerInstitution(string name, string registrationNumber)",

"function issueCertificate(string certId,string studentName,string course)"

];

// Connect Core Wallet
async function connectWallet(){

if(window.ethereum){

provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts",[]);

signer = provider.getSigner();

contract = new ethers.Contract(
contractAddress,
abi,
signer
);


let address = await signer.getAddress();

document.getElementById("walletAddress").innerText =
address;


alert("Wallet Connected ✅");


}

else{

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
//register institution
async function registerInstitution(){

let name =
document.getElementById("institutionName").value;


let reg =
document.getElementById("registrationNumber").value;


try{

let tx = await contract.registerInstitution(
name,
reg
);


await tx.wait();


document.getElementById("registrationResult").innerText =
"Institution Registered ✅";


}

catch(error){

console.log(error);

alert("Registration failed");

}

}
//issue certificate
async function issueCertificate(){

    let id = document.getElementById("certificateId").value;

    let student = document.getElementById("studentName").value;

    let course = document.getElementById("course").value;

    try{

        let tx = await contract.issueCertificate(
            id,
            student,
            course
        );

        await tx.wait();

        alert("Certificate Issued ✅");

    }

    catch(error){

        console.log(error);

        alert("Certificate issue failed");

    }
}
// Make functions available to HTML buttons
window.connectWallet = connectWallet;
window.verifyCert = verifyCert;
window.registerInstitution = registerInstitution;
window.issueCertificate = issueCertificate;