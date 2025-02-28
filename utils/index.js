import { ethers } from "ethers";
import identiFi from "./identiFi.json"; // Smart contract ABI

export const contract = async () => {
  if (typeof window === "undefined") {
    console.error("window is undefined - Are you in a server-side environment?");
    return null;
  }

  const { ethereum } = window;

  if (!ethereum) {
    console.error("MetaMask (Ethereum provider) is not detected. Please install MetaMask.");
    alert("Please install MetaMask to use this feature!");
    return null;
  }

  try {
    // Request wallet connection
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    if (!accounts || accounts.length === 0) {
      console.error("No accounts found. User might have denied the request.");
      return null;
    }

    // Initialize provider and signer (Adjust for ethers v5 or v6)
    const provider = new ethers.BrowserProvider(ethereum); // ethers v6
    // const provider = new ethers.providers.Web3Provider(ethereum); // Use this if on ethers v5
    const signer = await provider.getSigner();

    if (!signer) {
      console.error("Signer not found. Ensure MetaMask is properly connected.");
      return null;
    }

    console.log("Connected account:", accounts[0]);

    // Connect to the smart contract
    const contractReader = new ethers.Contract(
      "0x041b5F12624D072A599F928e6143579D5B70Bd49", // Replace with your contract address
      identiFi.abi,
      signer
    );

    console.log("Contract successfully initialized!");

    return contractReader;
  } catch (error) {
    console.error("Error connecting to contract:", error);
    return null;
  }
};
