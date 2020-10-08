<template>
  <div id="app" class="page-container">
    <Header />
    <Card v-bind:cardData="cardData" />
    <md-progress-spinner
      v-if="loader"
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
    <md-snackbar
      :md-duration="duration"
      :md-active.sync="notification.showSnackbar"
      md-persistent
    >
      <span>{{ notification.message }}</span>
      <md-button class="md-primary" @click="closeSnackBar()">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import Header from "./components/Header.vue";
import { FetchAllCardImagesQuery, FetchCardDataQuery } from "./store/query";
import { mapState } from "vuex";
import { FETCH_MESSAGE } from "./utils/constant";
import { SET_CARD_DATA, SET_LOADING, SET_MESSAGE } from "@/store/mutation";
import { mergeData } from "@/utils/util";

export default {
  name: "App",
  components: {
    Card,
    Header,
  },
  computed: mapState({
    cardData: (state) => state.cardData,
    loader: (state) => state.loading,
    duration: (state) => state.duration,
    notification: (state) => state.notification,
  }),
  async beforeMount() {
    try {
      const cardDataResponse = await this.$apollo.query(FetchCardDataQuery);
      const imageResponse = await this.$apollo.query(FetchAllCardImagesQuery);

      let cardData = cardDataResponse.data.comments.data;
      let imageData = imageResponse.data.photos.data;
      cardData = mergeData(cardData, imageData);

      let notification = {
        showSnackbar: true,
        message: FETCH_MESSAGE,
      };
      this.$store.commit(SET_CARD_DATA, cardData);
      this.$store.commit(SET_LOADING, false);
      this.$store.commit(SET_MESSAGE, notification);
    } catch (error) {
      console.log("Error, ", error);
    }
  },
  methods: {
    closeSnackBar() {
      let notification = {
        showSnackbar: false,
        message: "",
      };
      this.$store.commit(SET_MESSAGE, notification);
    },
  },
};
</script>