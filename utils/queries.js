import { contract } from "./index";
import { ethers } from "ethers"; 

// Function to parse error messages
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || "Unknown error";
}

// Function to validate Ethereum address
function isValidEthereumAddress(address) {
  return address && ethers.isAddress(address) && address !== "0x0";
}

// Function to get username by wallet address
export async function getUsernameByAddress(userAddress) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    if (!isValidEthereumAddress(userAddress)) {
      console.error("Invalid Ethereum address:", userAddress);
      return null;
    }

    const username = await contractObj.getUsernameByAddress(userAddress.toLowerCase());
    return username;
  } catch (e) {
    console.error("Error in getUsernameByAddress:", e);
    return parseErrorMsg(e);
  }
}

// Function to create a new user
export async function createUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const transactionResponse = await contractObj.createUser(
      username, basicInfo, professionalInfo, socialLinks, visibility
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in createUser:", e);
    return parseErrorMsg(e);
  }
}

// Function to edit user information
export async function editUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const transactionResponse = await contractObj.editUser(
      username, basicInfo, professionalInfo, socialLinks, visibility
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in editUser:", e);
    return parseErrorMsg(e);
  }
}

// Function to get user information by username
export async function getUserByUsername(username) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const user = await contractObj.getUserByUsername(username);
    return formatUser(user);
  } catch (e) {
    console.error("Error in getUserByUsername:", e);
    return parseErrorMsg(e);
  }
}

// Function to get user information by wallet address
export async function getUserByAddress(userAddress) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    // Validate Ethereum address before proceeding
    if (!isValidEthereumAddress(userAddress)) {
      console.error("Invalid Ethereum address:", userAddress);
      return null;
    }

    const user = await contractObj.getUserByAddress(userAddress.toLowerCase());
    return formatUser(user);
  } catch (e) {
    console.error("Error in getUserByAddress:", e);
    return parseErrorMsg(e);
  }
}

// Function to add a job ID that a user has applied to
export async function addJob(username, jobId) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const transactionResponse = await contractObj.addJob(username, jobId);
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in addJob:", e);
    return parseErrorMsg(e);
  }
}

// Function to get all job IDs applied by a user
export async function getJobs(username) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const jobIds = await contractObj.getJobs(username);
    return jobIds.map((jobId) => jobId.toString());
  } catch (e) {
    console.error("Error in getJobs:", e);
    return parseErrorMsg(e);
  }
}

// Function to set the visibility of user information
export async function setVisibility(username, education, workHistory, phoneNumber, homeAddress, dateOfBirth) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const transactionResponse = await contractObj.setVisibility(
      username, education, workHistory, phoneNumber, homeAddress, dateOfBirth
    );
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.error("Error in setVisibility:", e);
    return parseErrorMsg(e);
  }
}

// Function to get the visibility of user information
export async function getVisibility(username) {
  try {
    const contractObj = await contract();

    if (!contractObj) {
      console.error("Contract object is null. Ensure MetaMask is connected.");
      return null;
    }

    const visibility = await contractObj.getVisibility(username);
    return {
      education: visibility.education,
      workHistory: visibility.workHistory,
      phoneNumber: visibility.phoneNumber,
      homeAddress: visibility.homeAddress,
      dateOfBirth: visibility.dateOfBirth,
    };
  } catch (e) {
    console.error("Error in getVisibility:", e);
    return parseErrorMsg(e);
  }
}

// Helper function to format user object
function formatUser(user) {
  return {
    basicInfo: {
      firstName: user.basicInfo?.firstName || "",
      lastName: user.basicInfo?.lastName || "",
      email: user.basicInfo?.email || "",
      homeAddress: user.basicInfo?.homeAddress || "",
      dateOfBirth: user.basicInfo?.dateOfBirth || "",
      phoneNumber: user.basicInfo?.phoneNumber || "",
    },
    professionalInfo: {
      education: user.professionalInfo?.education || [],
      workHistory: user.professionalInfo?.workHistory || [],
      jobTitle: user.professionalInfo?.jobTitle || "",
      info: user.professionalInfo?.info || "",
      skills: user.professionalInfo?.skills || [],
      imageURL: user.professionalInfo?.imageURL || "",
    },
    socialLinks: {
      x: user.socialLinks?.x || "",
      instagram: user.socialLinks?.instagram || "",
      tiktok: user.socialLinks?.tiktok || "",
      youtube: user.socialLinks?.youtube || "",
      linkedin: user.socialLinks?.linkedin || "",
    },
    visibility: {
      education: user.visibility?.education || false,
      workHistory: user.visibility?.workHistory || false,
      phoneNumber: user.visibility?.phoneNumber || false,
      homeAddress: user.visibility?.homeAddress || false,
      dateOfBirth: user.visibility?.dateOfBirth || false,
    },
  };
}
