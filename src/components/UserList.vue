<template>
    <div id="app" class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" class="form-control" v-model="name" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" class="form-control" v-model="email" />
                        </div>
                        <button class="btn btn-success mt-2" style="margin: 10px;" @click="saveUser">Save</button>
                        <button class="btn btn-primary mt-2 ml-2" style="margin: 10px;"
                            @click="updateUser">Update</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h3>List of Users</h3>
                <div v-for="user in users" :key="user.id" class="card mb-2">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">{{ user.name }}</h5>
                            <p class="card-text">{{ user.email }}</p>
                        </div>
                        <div>
                            <button class="btn btn-primary" style="margin: 10px;"
                                @click="chooseUser(user)">Choose</button>
                            <br>
                            <button class="btn btn-danger ml-2" style="margin: 10px;"
                                @click="confirmRemoveUser(user.id)">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            users: [],
            name: '',
            email: '',
            selectedUser: null,
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            api.getUsers()
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('There was an error fetching the users:', error.response ? error.response.data : error.message);
                });
        },
        validateInput() {
            if (!this.name || !this.email) {
                alert('Name and email are required');
                return false;
            }
            return true;
        },
        saveUser() {
            if (!this.validateInput()) return;

            const newUser = {
                name: this.name,
                email: this.email,
            };
            api.createUser(newUser)
                .then((response) => {
                    this.users.push(response.data);
                    this.name = '';
                    this.email = '';
                })
                .catch(error => {
                    console.error('There was an error saving the user:', error.response ? error.response.data : error.message);
                });
        },
        updateUser() {
            if (!this.selectedUser || !this.validateInput()) return;

            const updatedUser = {
                id: this.selectedUser.id,
                name: this.name,
                email: this.email,
            };

            api.updateUser(updatedUser)
                .then((response) => {
                    const index = this.users.findIndex(user => user.id === response.data.id);
                    this.users.splice(index, 1, response.data);
                    this.name = '';
                    this.email = '';
                    this.selectedUser = null;
                })
                .catch(error => {
                    console.error('There was an error updating the user:', error.response ? error.response.data : error.message);
                });
        },
        chooseUser(user) {
            this.selectedUser = user;
            this.name = user.name;
            this.email = user.email;
        },
        confirmRemoveUser(userId) {
            if (window.confirm("Do you want to remove the user?")) {
                this.removeUser(userId);
            }
        },
        removeUser(userId) {
            api.deleteUser(userId)
                .then(() => {
                    this.users = this.users.filter(user => user.id !== userId);
                })
                .catch(error => {
                    console.error('There was an error removing the user:', error.response ? error.response.data : error.message);
                });
        },
    },
};
</script>

<style>
#app {
    margin-top: 20px;
}

.card-title {
    margin-bottom: 0;
}

.card-text {
    margin-bottom: 0;
}
</style>
