<template>
  <div class="theme-example">
    <div class="blog-list-wrapper">
      <Card class="blog-item" v-for="(blog, index) in currentPageData" :key="index">
        <template slot="front">
          <img class="thumbnail" :src="blog.thumbnail" alt="缩略图">
        </template>
        <template slot="back">
          <div class="info">
            <h4 class="title">{{ index }}</h4>
            <p class="desc">{{ blog.desc }}</p>
            <a class="btn" target="blank" :href="blog.link">直达</a>
          </div>
        </template>
      </Card>
    </div>

    <!-- 分页 -->
    <pagation
      class="pagation"
      :total="examplesData.length"
      :currentPage="currentPage"
      :perPage="9"
      @getCurrentPage="getCurrentPage"
    ></pagation>
  </div>
</template>

<script>
import examplesData from "../data/projectsData";
export default {
  data() {
    return {
      examplesData,
      currentPage: 1
    };
  },
  computed: {
    currentPageData() {
      const start = (this.currentPage - 1) * 9;
      const end = this.currentPage * 9;
      return this.examplesData.slice(start, end);
    }
  },
  methods: {
    getCurrentPage(currentPage) {
      this.currentPage = currentPage;
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }
};
</script>
