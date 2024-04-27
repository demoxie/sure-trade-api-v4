// import Web3 from "web3";
// import dotenv from "dotenv";
// import WAValidator from "multicoin-address-validator";
//
// dotenv.config();
//
// class Crypto {
//     static verifyCryptoTransactionByHash = hash => {
//         const instance = new Web3(
//             new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL)
//         );
//         const transaction = instance.eth.getTransaction(hash);
//         if (transaction) {
//             return true;
//         }
//         return false;
//     };
//
//     static verifyCryptoTransactionByHashAndAddress = (hash, address) => {
//         const instance = new Web3(
//             new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL)
//         );
//         const transaction = instance.eth.getTransaction(hash);
//         return transaction && transaction.to === address;
//     }
//
//     static getTransactionByHash = hash => {
//         const instance = new Web3(
//             new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL)
//         );
//         const transaction = instance.eth.getTransaction(hash);
//         console.log(transaction);
//         return transaction;
//     };
//
//     static validateAddress = async (address) => {
//         return WAValidator.validate(address, "USDT");
//     }
// }
//
// export default Crypto;
