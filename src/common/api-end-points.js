const suitURL = "https://10.100.49.162:8443/HSuite/digitalbanking/api/suite/";

const coreURL = "https://10.100.49.162:8443/HSuite/digitalbanking/api/core/";

const authenticateURL = suitURL + "v1/authenticate";
const usersURL = suitURL + "v2/portals/";
const permissionsURL = suitURL + "v1/users/";
const customerInquiryURL = suitURL + "v1/customers/inquiry";

export { authenticateURL, usersURL, permissionsURL, customerInquiryURL };
