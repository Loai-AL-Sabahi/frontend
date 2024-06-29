import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Ensure this is correct
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getUsers() {
        return apiClient.get('/users');
    },
    createUser(user) {
        return apiClient.post('/users', user);
    },
    updateUser(user) {
        return apiClient.put(`/users/${user.id}`, user);
    },
    deleteUser(userId) {
        return apiClient.delete(`/users/${userId}`);
    },
};
