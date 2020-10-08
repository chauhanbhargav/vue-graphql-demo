<template>
  <div class="card">
    <div class="md-toolbar-row">
      <div class="md-primary">
        <div class="md-layout md-gutter md-alignment-bottom-right">
          <div
            v-for="data in cardData"
            :key="data.id"
            class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
          >
            <md-card>
              <md-card-media>
                <a :href="data.thumbnailUrl" target="_blank">
                  <img :src="data.url" alt="People" width="40%" />
                </a>
              </md-card-media>
              <md-card-header>
                <div class="md-title">
                  {{ truncateWords(data.name, 20, "...") }}
                  <md-tooltip>{{ data.name }}</md-tooltip>
                </div>
                <div class="md-subhead">
                  {{ truncateWords(data.body, 100, "...") }}
                  <md-tooltip>{{ data.body }}</md-tooltip>
                </div>
              </md-card-header>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { truncateWords } from "@/utils/util";

export default {
  name: "Card",
  props: {
    cardData: Array,
  },
  methods: {
    truncateWords: truncateWords,
  },
};
</script>
