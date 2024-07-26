import { get, post } from './api.service';

// export const getAllActiveUser = (queryParams) => {
//     return get('/api/user/all', queryParams);
// };

export const getAllPassById = (queryParams) => {
    return get('/api/PassManagement/GetAllPassByUserId/'+queryParams, queryParams);
};
export const getPassDetailsByPassId = (queryParams) => {
    return get('/api/PassManagement/GetPassDetails/'+queryParams, queryParams);
};
export const getUserCredentialByUserId = (queryParams) => {
    return get('/api/PassManagement/GetUserCredentialDetails/'+queryParams, queryParams);
};


// export const onSaveUser = (body, queryParams) => {
//     return post('/api/user/save', body, queryParams);
// };
export const createNewPass = (body, queryParams) => {
    return post('/api/PassManagement/Create', body, queryParams);
};
// export const deleteUserById = (queryParams) => {
//     return get('/api/user/DeleteUser/'+queryParams, queryParams);
// };