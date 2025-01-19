import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

//saveStaffDetailsAPI 
export const saveStaffDetailsAPI = async(reqBody)=>{
    return await commonAPI("POST" , `${SERVER_URL}/staffDetails` , reqBody)
}
// gets staff details
export const getsStaffDetailsAPI = async()=>{
    return await commonAPI("GET" , `${SERVER_URL}/staffDetails` , {})
}

// Fetch staff details
export const getStaffDetailsByIdAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_URL}/staffDetails/${id}`, {});
};

// Update staff details
export const updateStaffDetailsAPI = async (id, updatedData) => {
    return await commonAPI("PUT", `${SERVER_URL}/staffDetails/${id}`, updatedData);
};

// delete staff details
export const deleteStaffDetailsAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVER_URL}/staffDetails/${id}` ,{});
};






//save task details
export const saveTaskDetailsAPI = async(reqBody)=>{
    return await commonAPI("POST" , `${SERVER_URL}/taskDetails` , reqBody)
}


// delete staff details
export const getsTaskDetailsAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_URL}/taskDetails/${id}` ,{});
};





