const{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

// Generating a new wallet key pair
const newPair = new Keypair();
console.log(newPair);

// Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey

// Getting the wallet balance
const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet balance : ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`)
    }
    catch(err){
        console.log(err);
    }
};

// Airdropping SOL (in terms of LAMPORTS)
const airDropSOl = async() => {
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log("******Airdropping 2 SOL******")
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2*LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    }
    catch(err){
        console.log('err');
    }
}

// Driver function
const driverFunction = async() => {
    await getWalletBalance();
    await airDropSOl();
    await getWalletBalance();
};

driverFunction();