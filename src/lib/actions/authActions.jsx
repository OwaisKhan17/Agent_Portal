import * as actionTypes from "./../actionTypes.jsx";
import {
  usersURL,
  permissionsURL,
  customerInquiryURL,
} from "common/api-end-points.js";

const loaderStatus = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading,
});

const GetUserInfo = async (accessToken, userID, uniqueIdentifier, portalID) => {
  console.log("GetUserInfo:", accessToken, userID, uniqueIdentifier, portalID);
  console.log(
    "GetUserInfo URL: ",
    `${usersURL}${portalID}/entities/${uniqueIdentifier}/user/${userID}`
  );

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const url = `${usersURL}${portalID}/entities/${uniqueIdentifier}/user/${userID}`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorResponse = await response.text(); // Get the text response for error messages
      throw new Error(errorResponse || "Network response was not ok");
    }

    // Try to parse the response as JSON
    const data = await response.json();

    return {
      type: "success",
      message: "User information retrieved successfully",
      data,
    };
  } catch (ex) {
    console.error("GetUserInfo error:", ex.message);
    return {
      type: "error",
      message: ex.message || "An error occurred while fetching user info",
    };
  }
};

const GetUserPermissions = async (accessToken, userID) => {
  console.log("GetUserPermissions:", accessToken, userID);
  console.log(
    "GetUserPermissions URL: ",
    `${permissionsURL}${userID}/permissions`
  );

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const url = `${permissionsURL}${userID}/permissions`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorResponse = await response.text(); // Get the text response for error messages
      throw new Error(errorResponse || "Network response was not ok");
    }

    // Try to parse the response as JSON
    const data = await response.json();

    return {
      type: "success",
      message: "User information retrieved successfully",
      data,
    };
  } catch (ex) {
    console.error("GetUserPermissions error:", ex.message);
    return {
      type: "error",
      message: ex.message || "An error occurred while fetching user info",
    };
  }
};

const GetCustomerInquiry = async (accessToken, businessIdentifier) => {
  console.log("GetCustomerInquiry:", accessToken, businessIdentifier);
  console.log("GetCustomerInquiry URL: ", customerInquiryURL);

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Business-Identifier": businessIdentifier,
    };

    const response = await fetch(customerInquiryURL, {
      method: "POST",
      headers: headers,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorResponse = await response.text(); // Get the text response for error messages
      throw new Error(errorResponse || "Network response was not ok");
    }

    // Try to parse the response as JSON
    const data = await response.json();

    return {
      type: "success",
      message: "User information retrieved successfully",
      data,
    };
  } catch (ex) {
    console.error("GetCustomerInquiry error:", ex.message);
    return {
      type: "error",
      message: ex.message || "An error occurred while fetching user info",
    };
  }
};

export { loaderStatus, GetUserInfo, GetUserPermissions, GetCustomerInquiry };
