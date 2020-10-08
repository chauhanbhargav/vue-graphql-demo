<template>
  <div class="header page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="nav-title">
          <span class="md-title">{{ title }}</span>
        </div>
        <div class="nav-search">
          <input
            type="text"
            placeholder="Search.."
            :value="search"
            name="search"
            v-on:keyup="searchData"
          />
        </div>
        <div class="nav-sort">
          <button type="submit" @click="sortData(order)">Title Sort</button>
        </div>
      </md-app-toolbar>
    </md-app>
  </div>
</template>

<script>
import { FetchAllCardImagesQuery, FetchCardDataQuery } from "@/store/query";
import { mapState } from "vuex";
import {
  FILTER_MESSAGE,
  SORTING_MESSAGE,
  FETCH_MESSAGE,
  DATA_NOT_FOUND,
} from "@/utils/constant";
import { SET_CARD_DATA, SET_LOADING, SET_MESSAGE } from "@/store/mutation";
import { mergeData, searchString, sorting } from "@/utils/util";

export default {
  name: "Header",
  data() {
    return {
      title: "Vue Demo App",
      search: "",
      order: "ASC",
    };
  },
  computed: mapState({
    cardData: (state) => state.cardData,
  }),
  methods: {
    // Search Data Locally
    searchData(event) {
      let value = event.target.value;
      let notification = {
        showSnackbar: true,
        message: FILTER_MESSAGE,
      };
      if (value.length >= 3) {
        let cardData = searchString(this.cardData, value);
        notification.message = cardData.length
          ? FILTER_MESSAGE
          : DATA_NOT_FOUND;
        this.commitData(cardData, notification);
      } else if (!value) {
        this.fetchData(value, notification);
      }
    },
    // Sorting Data Locally
    sortData() {
      let cardData;
      let notification = {
        showSnackbar: true,
        message: SORTING_MESSAGE,
      };
      cardData = this.cardData.sort(sorting("name"));
      if (this.order === "ASC") {
        this.order = "DESC";
        cardData = cardData.reverse();
      } else {
        this.order = "ASC";
      }

      this.$store.commit(SET_CARD_DATA, cardData);
      this.$store.commit(SET_MESSAGE, notification);
    },
    //  If search value null fetch data from server
    async fetchData(value, notification) {
      const cardDataResponse = await this.$apollo.query(FetchCardDataQuery);
      const imageResponse = await this.$apollo.query(FetchAllCardImagesQuery);

      let cardData = cardDataResponse.data.comments.data;
      let imageData = imageResponse.data.photos.data;
      cardData = mergeData(cardData, imageData);

      notification = {
        showSnackbar: true,
        message: FETCH_MESSAGE,
      };
      this.commitData(cardData, notification);
    },
    // Commiting data to Vuex Store
    commitData(cardData, notification) {
      this.$store.commit(SET_CARD_DATA, cardData);
      this.$store.commit(SET_LOADING, false);
      this.$store.commit(SET_MESSAGE, notification);
    },
  },
};
</script>
