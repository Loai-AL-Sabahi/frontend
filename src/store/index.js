import { createStore } from 'vuex';
import api from '@/services/api';

export default createStore({
    state: {
        users: [],
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        addUser(state, user) {
            state.users.push(user);
        },
        updateUser(state, updatedUser) {
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser);
            }
        },
        removeUser(state, userId) {
            state.users = state.users.filter(user => user.id !== userId);
        },
    },
    actions: {
        fetchUsers({ commit }) {
            return api.getUsers().then(response => {
                commit('setUsers', response.data);
            });
        },
        saveUser({ commit }, user) {
            return api.createUser(user).then(response => {
                commit('addUser', response.data);
            });
        },
        updateUser({ commit }, user) {
            return api.updateUser(user).then(response => {
                commit('updateUser', response.data);
            });
        },
        removeUser({ commit }, userId) {
            return api.deleteUser(userId).then(() => {
                commit('removeUser', userId);
            });
        },
    },
    getters: {
        users: state => state.users,
    },
});
