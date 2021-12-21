<template>      
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center class>
                <v-flex xs12 sm6 elevation-6>
                    <span class="brand-text-icon">Your </span><span class="text-black">Profile</span>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" counter required></v-text-field>
                                    
                                    <v-layout justify-end>
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : !valid, disabled: valid }">Update</v-btn>
                                        <v-btn @click="clear" class="deep-purple accent-4 white--text">Clear</v-btn>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap");
    .icon-brand{
        font-family: "Poppins";
        color: white;
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }

    .brand-text-icon {
        font-size: 35px;

        font-family: "Poppins", sans-serif;
        color: #001aff;
        text-decoration: none;
    }

    .text-black{

        font-size: 35px;
        font-family: "Poppins", sans-serif;
         color: rgb(0, 0, 77) !important;
    }

    .phrase{
        font-size: 20px;
        padding-bottom: 20px;
    }
</style>

<script>
    export default{
        name: "Profil",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong!',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-mail tidak boleh kosong!',
                ],
                name: '',
                nameRules: [
                    (v) => !!v || 'Nama tidak boleh kosong!',
                ]
            };
        },
        methods: {
            submit() {
                let newData = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };
                var url = this.$api + '/user/' + localStorage.getItem('id');
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    localStorage.setItem('username', this.name);
                    this.color = 'green';
                    this.snackbar = true;
                    this.load = false;
                    window.location.reload();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = 'red';
                    this.snackbar = true;
                    this.load = false;
                });
            },

            clear() {
                this.$refs.form.reset() //clear form login
            }
        },

        mounted() {
            var url = this.$api + '/user/' + localStorage.getItem('id');
            this.$http.get(url, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.name = response.data.data.name;
                this.email = response.data.data.email;
            })
        },
    };
</script>
