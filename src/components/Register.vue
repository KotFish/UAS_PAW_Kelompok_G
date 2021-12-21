<template>
    <main>
        <v-app-bar app color="white">
            <v-toolbar-title><span class="brand-text-icon">Hotel</span><span class="text-black">yuk!</span></v-toolbar-title>
            <VSpacer />
            <v-btn plain color="primary">Register</v-btn>
            <v-btn @click.prevent="login" plain>
                Login
            </v-btn>
        </v-app-bar>

        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 elevation-6>
                    <span class="brand-text-icon">Hotel</span><span class="text-black">yuk!</span>
                    <div><span class="phrase">Plan Your Next Stay</span></div>
                    
                    <v-card style="margin-top:20px">
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field label="Password" v-model="password" type="password" min="8" :rules="passwordRules" counter required></v-text-field>
                                    <h3>Sudah Punya Akun? <v-btn plain @click.prevent="login">Login</v-btn></h3>
                                    
                                    <v-layout justify-end class="mt-5">
                                        <v-btn class="mr-2" @click="submit" :class=" { 'grey darken-1 white--text' : !valid, disabled: valid }">Go</v-btn>
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
        font-weight: bold;
        font-family: "Poppins", sans-serif;
        color: #001aff;
        text-decoration: none;
    }

    .text-black{
        font-weight: bold;
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
        name: "Register",
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
            login(){
                this.$router.push({
                    name: 'Login',
                });
            },
            submit() {
                if(this.$refs.form.validate()) {
                    //Cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        //Simpan data id user yang diinput
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.clear();
                        this.$router.push({
                            name: 'Login',
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
                }
            },

            clear() {
                this.$refs.form.reset() //clear form login
            }
        },
    };
</script>
