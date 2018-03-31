<template>
  <div class="drop-panel container-fluid justify-content-center">

    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search Beats" aria-label="Search" v-model="search">
      <button class="btn btn-primary search-button my-2 my-sm-0"  @click.prevent="getSearchResults">Submit</button>
    </form>





  </div>
</template>

<script>
  export default {
    name: "",
    components: {
    },
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      close() {
        this.$emit('closeSearchField')
      },
      getSearchResults() {
        this.$router.push({ path: '/SearchResults' })
        this.$emit('closeSearchField')
      }
    },

  }
</script>

<style scoped>
  /* div {
    outline-color: gold;
    outline-style: solid;
    outline-width: 1px;
  } */


  body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  .drop-panel {
    padding: 1rem;
    color: white;
    background-color:#372529;
    display: inline-flex;
  }

  .search-button {
    background-color: rgba(57, 123, 172, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
    transition: all;
    transition-duration: 400ms;
  }

  .search-button:hover {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }

  .search-button:active,
  .search-button:visited,
  .search-button:focus {
    background-color: rgba(33, 92, 136, 1.0);
    border-color: rgba(33, 92, 136, 1.0);
  }
</style>