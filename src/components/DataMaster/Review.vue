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

        <v-btn color="success" dark @click="dialog = true"> Tambah Review </v-btn>
      
      </v-card-title>
      <v-data-table :headers="headers" :items="reviews" :search="search">
        <template v-slot:[`item.points`]="{ item }">
          <div v-if="item.points === 1">
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
          </div>
          <div v-else-if="item.points === 2">
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
          </div>
          <div v-else-if="item.points === 3">
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
          </div>
          <div v-else-if="item.points === 4">
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="grey">
              mdi-star
            </v-icon>
          </div>
          <div v-else-if="item.points === 5">
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
            <v-icon color="yellow darken-2">
              mdi-star
            </v-icon>
          </div>
          <div v-else>
            no rating..
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="mr-2 mt-2 mb-2 warning" @click="editHandler(item)">edit</v-btn>
          <v-btn small class="mt-2 mb-2 error" @click="deleteHandler(item.id)">hapus</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }} Review</span>      
        </v-card-title>
        <span class="brand-text-icon">Hotel</span><span class="text-black">yuk!</span>
        <div><span class="phrase">Plan Your Next Stay</span></div>
        <v-card-text>
          <v-container>
           <v-select
            v-model="form.points"
            :items="rating"
            :rules="[v => !!v || 'Rating is required']"
            label="Rating"
            required
            ></v-select>
            
            <v-textarea
              v-model="form.comments"
              label="Komentar"
            ></v-textarea>

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
        <v-card-text>Anda Yakin ingin menghapus Review ini?</v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogConfirm = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "Review",
  data() {
    return {
      inputType: 'Tambah',
      load: false,
      snackbar: false,
      rating: [
          '1',
          '2',
          '3',
          '4',
          '5'
      ],
      error_message: '',
      color: '',
      search: null,
      dialog: false,
      dialogConfirm: false,
      headers: [
        { text: "Rating", value: "points" },
        { text: "Komentar", value: "comments" },
        { text: "Action", value: "actions" }
      ],
      review: new FormData,
      reviews: [],
      form: {
        points: '',
        comments: ''
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

    //Read Data Review
    readData(){
      var url = this.$api + '/review/' + localStorage.getItem('id');
      this.$http.get(url, {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.reviews = response.data.data;
      })
    },

    //Simpan data review
    save() {
      this.review.append('points', this.form.points);
      this.review.append('comments', this.form.comments);

      var url = this.$api + '/review/' +localStorage.getItem('id');
      this.load = true;
      this.$http.post(url, this.review, {
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

    //Ubah data course
    update() {
      let newData = {
        points: this.form.points,
        comments: this.form.comments
      };
      var url = this.$api + '/review/' + this.editId;
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

    //Hapus data produk
    deleteData() {
      var url = this.$api + '/review/' + this.deleteId;
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

      this.form.points = item.points.toString();
      this.form.comments = item.comments;

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
        points: '',
        comments: ''
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