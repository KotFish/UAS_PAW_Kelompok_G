<template>
  <v-main>
    <v-app-bar-title>Hotels with Nice View</v-app-bar-title>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="card in cards"
              :key="card.title"
              :cols="card.flex"
            >
              <v-card>
                <v-img
                  :src="card.src"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title v-text="card.title"> </v-card-title>
                </v-img>

                <v-card-actions>
                  <p v-text="card.price"></p>
                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-bookmark</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

      <v-app-bar-title class="mt-12">Hotels with Amazing Room</v-app-bar-title>
      
      <v-container  fluid>
        <v-row dense>
          <v-col
            v-for="card2 in cards2"
            :key="card2.title"
            :cols="card2.flex"
          >
            <v-card>
              <v-img
                :src="card2.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card2.title"> </v-card-title>
              </v-img>

              <v-card-actions>
                <p v-text="card2.price"></p>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    <v-app-bar-title class="mt-12">Our Best Seller</v-app-bar-title>

    <v-container fluid>
      <v-row dense>
        <v-col
            v-for="card3 in cards3"
            :key="card3.title"
            :cols="card3.flex"
          >
          <v-card>
      <v-img
        :src="card3.src"
        height="200px"
      ></v-img>

      <v-card-title v-text="card3.title"></v-card-title>

      <v-card-subtitle class="text-left" v-text="card3.subtitle"></v-card-subtitle>

      <v-card-actions>
        <v-btn
          color="orange lighten-2"
          text
        >
          <v-card-text v-text="card3.price"> </v-card-text>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="card3.show = !card3.show"
        >
          <v-icon>{{ card3.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="card3.show">
          <v-divider></v-divider>
          <v-card-text v-text="card3.text">
          </v-card-text>
        </div>
      </v-expand-transition>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: "Home",
    data: () => ({
      cards: [
        { title: 'Pre-fab homes, Amerika',price:"Rp 350.000", src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 4 },
        { title: 'Zemi Beach, Anguila',price:"Rp 350.000", src: 'https://i.insider.com/5b86e7453cccd11b008b45ac?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Rocky Hill Retreat, Australia',price:"Rp 750.000", src: 'https://i.insider.com/5b86ff5d3cccd124008b45ce?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Sheldon Chalet, Alaska',price:"Rp 750.000", src: 'https://i.insider.com/5b86f2f33cccd11a008b45ca?width=2000&format=jpeg&auto=webp', flex: 6 },
        { title: 'Capella Ubud, Bali',price:"Rp 750.000", src: 'https://i.insider.com/5b87e3433cccd159008b457e?width=800&format=jpeg&auto=webp', flex: 6 },
      ],

      cards2: [
        { title: 'Belize Property, San Ignacio',price:"Rp 950.000", src: 'https://i.insider.com/5b86fffd3cccd123008b45c9?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Cayo Espanto, Belize',price:"Rp 850.000", src: 'https://i.insider.com/5b86e7973cccd11a008b459d?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'The Loren, Bermuda',price:"Rp 850.000", src: 'https://i.insider.com/5b86e7fa3cccd128008b45a0?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Kabru Forest, Brazil',price:"Rp 950.000", src: 'https://i.insider.com/5b8700563cccd125008b45d8?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Pogo Island Inn, Canada',price:"Rp 950.000", src: 'https://i.insider.com/5b86fbfd3cccd151008b45cf?width=800&format=jpeg&auto=webp', flex: 4 },
        { title: 'Capella Ubud, Bali',price:"Rp 750.000", src: 'https://i.insider.com/5b87e3433cccd159008b457e?width=800&format=jpeg&auto=webp', flex: 4 },
      ],


      cards3: [
        { title: 'Pre-fab homes',subtitle:'South Dakota, America',price:"Rp 500.000", src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3, text:"Pre-fab home is one of the most beautiful hotel that you can book in the United States",show: false },
        { title: 'Zemi Beach',subtitle:' Anguila',price:"Rp 350.000", src: 'https://i.insider.com/5b86e7453cccd11b008b45ac?width=800&format=jpeg&auto=webp', text:"Hotel near Beach, so beautiful and refreshing", flex: 3, show: false},
        { title: 'Rocky Hill Retreat',subtitle:'Australia',price:"Rp 750.000", src: 'https://i.insider.com/5b86ff5d3cccd124008b45ce?width=800&format=jpeg&auto=webp',text:"With mountain view, your adventure will be more challenging", flex:3,show: false, },
        { title: 'Sheldon Chalet',subtitle:'Alaska',price:"Rp 750.000", src: 'https://i.insider.com/5b86f2f33cccd11a008b45ca?width=2000&format=jpeg&auto=webp',text:"a hotel in alaska? what more can you ask?", flex: 3,show: false, },
      ],
    }),
  }
</script>