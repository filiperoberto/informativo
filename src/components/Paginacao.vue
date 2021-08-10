<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: page === 0 }">
        <a
          class="page-link"
          v-if="page !== 0"
          href="#"
          aria-label="Previous"
          @click.prevent.stop="prev()"
          ><span aria-hidden="true">&laquo;</span></a
        >
        <span class="page-link" v-if="page === 0"
          ><span aria-hidden="true">&laquo;</span></span
        >
      </li>
      <li
        class="page-item"
        v-for="(pageItem, index) in pages"
        :key="`page-${index}`"
        :class="{ active: pageItem - 1 === page }"
      >
        <a class="page-link" href="#" @click.prevent.stop="goTo(pageItem)">{{
          pageItem
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: lastPage }">
        <a
          class="page-link"
          v-if="!lastPage"
          href="#"
          aria-label="Next"
          @click.prevent.stop="next()"
          ><span aria-hidden="true">&raquo;</span></a
        >
        <span class="page-link" v-if="lastPage"
          ><span aria-hidden="true">&raquo;</span></span
        >
      </li>
    </ul>
  </nav>
</template>
<script>
function getPages(numberOfPages, current) {
    const pages = []
    const range = 7

    if (numberOfPages <= range) {
        for (let i = 0; i < numberOfPages; i++) {
            pages.push(i + 1)
        }
        return pages
    }

    const halfRange = Math.floor(range / 2)
    let firstPage = current - halfRange

    while (firstPage < 1) {
        firstPage++
    }
    while ((firstPage + (range - 1)) > numberOfPages) {
        firstPage--
    }

    for (let i = 0; i < range; i++) {
        pages.push(firstPage++)
    }

    return pages
}

export default {
  props: {
    count: Number,
    limit: Number,
    page: Number,
  },

  computed: {
    lastPage() {
      const numberOfPages = this.getNumberOfPages();
      return numberOfPages === this.page + 1 || numberOfPages === 0;
    },
    pages() {
      const numberOfPages = this.getNumberOfPages();
      return getPages(numberOfPages, this.page + 1);
    },
  },

  methods: {
    getNumberOfPages() {
      return Math.ceil(this.count / this.limit);
    },

    goTo(page) {
      if (this.page === page - 1) {
        return false;
      }
      this.$emit("changepage", page - 1);
      return false;
    },

    next() {
      return this.goTo(this.page + 2);
    },

    prev() {
      return this.goTo(this.page);
    },
  },
};
</script>