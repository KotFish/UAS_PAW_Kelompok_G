<template>
  <v-main class="list">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details>
        </v-text-field>

        <v-spacer></v-spacer>

        <v-btn color="success" dark @click="dialog = true"> Tambah Reservasi </v-btn>
      
      </v-card-title>
      <v-data-table :headers="headers" :items="reservation" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2 mt-2 mb-2 warning" @click="editHandler(item)">edit</v-btn>
          <v-btn small class="mt-2 mb-2 error" @click="deleteHandler(item.id)">delete</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Reservasi</span>      
        </v-card-title>
        <span class="brand-text-icon">Hotel</span><span class="text-black">yuk!</span>
        <div><span class="phrase">Plan Your Next Stay</span></div>
        <v-card-text>
          <v-container>
           <v-select
            v-model="form.jenis_kamar"
            :items="jenis_Kamar"
            :rules="[v => !!v || 'Jenis Kamar is required']"
            label="Jenis Kamar"
            required
            ></v-select>
            
            <v-select
            v-model="form.jenis_kasur"
            :items="jenis_Kasur"
            :rules="[v => !!v || 'Jenis Kasur is Required']"
            label="Jenis Kasur"
            required
            ></v-select>
            
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="form.tanggal_masuk"
                    label="Tanggal Masuk"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="form.tanggal_masuk"
                @input="menu2 = false"
                ></v-date-picker>
            </v-menu>

             <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="form.tanggal_keluar"
                    label="Tanggal Keluar"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="form.tanggal_keluar"
                @input="menu3 = false"
                ></v-date-picker>
            </v-menu>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Warning!</span>
        </v-card-title>
        <v-card-text>Anda Yakin ingin menghapus Reservasi ini?</v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
            <v-btn class="mb-3" color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
            <v-btn class="mb-3" color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "Reservation",
  data() {
    return {
      inputType: 'Tambah',
      load: false,
      menu2: false,
      menu3: false,
      snackbar: false,
      jenis_Kamar: [
          'Standard',
          'Deluxe',
          'Superior'
      ],
      jenis_Kasur: [
          'Single',
          'Double'
      ],
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Tanggal Booking", value: "booking_date" },
        { text: "Jenis Kamar", value: "room_type" },
        { text: "Jenis Kasur", value: "bed_type" },
        { text: "Tanggal Masuk", value: "check_in" },
        { text: "Tanggal Keluar", value: "check_out" },
        { text: "Biaya", value: "bill" },
        { text: "Nomor Kamar", value: "room_number"},
        { text: "Actions", value: "actions" },
      ],
      reservasi: new FormData,
      reservation: [],
      form: {
        jenis_kamar: "",
        jenis_kasur: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
      },
      deleteId: '',
      editId: ''
    };
  },
  methods: {
    setForm(){
      if(this.inputType !== 'Tambah'){
        this.update();
      }else{
        this.save();
      }
    },

    //Read Data Reservasi
    readData(){
      var url = this.$api + '/reservations/' + localStorage.getItem('id');
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.reservation = response.data.data;
      })
    },

    //Simpan data reservasi
    save() {
      this.reservasi.append('room_type', this.form.jenis_kamar);
      this.reservasi.append('bed_type', this.form.jenis_kasur);
      this.reservasi.append('check_in', this.form.tanggal_masuk);
      this.reservasi.append('check_out', this.form.tanggal_keluar);

      var url = this.$api + '/reservations/' + localStorage.getItem('id');
      this.load = true;
      this.$http.post(url, this.reservasi, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = true;
        this.close();
        this.readData(); //baca data
        this.resetForm();
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },
    
    // Ubah data reservasi
    update() {
      let newData = {
        room_type: this.form.jenis_kamar,
        bed_type: this.form.jenis_kasur,
        check_in: this.form.tanggal_masuk,
        check_out: this.form.tanggal_keluar
      };
      var url = this.$api + '/reservations/' + this.editId;
      this.load = true;
      this.$http.put(url, newData, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = 'green';
        this.snackbar = true;
        this.load = false;
        this.close();
        this.readData(); //baca data
        this.resetForm();
        this.inputType = 'Tambah';
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = 'red';
        this.snackbar = true;
        this.load = false;
      });
    },

    //Hapus data reservasi
    deleteData() {
      var url = this.$api + '/reservations/' + this.deleteId;
      this.load = true;
      this.$http.delete(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.error_message = response.data.message;
        this.color = "green";
        this.snackbar = true;
        this.load = false;
        this.close();
        this.readData(); //baca data
        this.resetForm();
        this.inputType = "Tambah";
      }).catch(error => {
        this.error_message = error.response.data.message;
        this.color = "red";
        this.snackbar = true;
        this.load = false;
      });
    },

    editHandler(item) {
      this.inputType = 'Ubah';
      this.editId = item.id;

      this.form.jenis_kamar = item.room_type;
      this.form.jenis_kasur = item.bed_type;
      this.form.tanggal_masuk = item.check_in;
      this.form.tanggal_keluar = item.check_out;

      this.dialog = true;
    },

    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },

    close() {
      this.dialog = false;
      this.inputType = 'Tambah';
      this.dialogConfirm = false;
      this.readData();
    },

    cancel() {
      this.resetForm();
      this.readData();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = 'Tambah';
    },

    resetForm() {
      this.form = {
        jenis_kamar: "",
        jenis_kasur: "",
        tanggal_masuk: "",
        tanggal_keluar: ""
      };
    },
  },

  computed: {
    formTitle() {
      return this.inputType;
    },
  },

  mounted() {
    this.readData();
  },
};
</script>

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