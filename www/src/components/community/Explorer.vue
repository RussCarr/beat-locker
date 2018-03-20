<template>
  <div class="container-fluid explorer">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="row">
      <div class="col-3">
        <div class="col-12 mt-3">
          Search tracks...
          <form>
            <input type="text" placeholder="Search..." name="search">
            <button type="submit">Submit</button>
          </form>
        </div>
        <div class="col-12 mt-3">
          Sort by...

          <div class="col-12 mt-3">
            <!-- <select v-model="selected">
              <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select> -->
            <select v-model="catagory">
              <!-- <option disabled value="">Please select one</option> -->
              <option>Top 10 Forked</option>
              <option>Top 10 Shared</option>
              <option>Top 10 Newly shared</option>
              <option>Top 10 of 2017</option>
            </select>


          </div>
        </div>
      </div>
      <div class="col-7 text-center">
        <p class="text-center">Sorted by {{catagory}}</p>
        <sharedProjects :sharedProject='sharedProject' class="mt-4" v-for="sharedProject in allSharedProjects"
          :key='sharedProject._id' v-on:playing="setPlayingProject" :playingProjectId="playingProjectId"></sharedProjects>
      </div>
      <div class="col-0">

      </div>
      <div class="col-0">

      </div>
    </div>

  </div>
</template>

<script>
  import Navbar from '../Navbar'
  import SideBar from '../SideBar'
  import SharedProjects from './SharedProjects'
  export default {
    name: 'Explorer',
    components: {
      navbar: Navbar,
      sidebar: SideBar,
      sharedProjects: SharedProjects
    },
  data() {
    return {
      playingProjectId: "",
      catagory: "Top 10 Forked"
      // options: [
      //   { text: 'Top 10 Newly Created', value: 'Top 10 Newly Created' },
      //   { text: 'Top 10 Forked', value: 'Top 10 Forked' },
      //   { text: 'Top 10 Shared', value: 'Top 10 Shared' },
      //   { text: 'Top 10 of 2018', value: 'Top 10 of 2018' }
      // ]
    }
  },
  computed: {
    allSharedProjects() {
      var allProjects = this.$store.state.allProjects;
      var allSharedProjects = allProjects.filter(project => {
        return project.shared === true
      })
      allSharedProjects.sort(function(a, b){return b.forkCount - a.forkCount})
      
      // console.log('allSharedProjectsData1', test)
        return allSharedProjects
      
          // return test
      // if (catagory = "Top 10 Newly Created") {
      // } else if (catagory = "Top 10 Forked") {
      //   return test
      // } else if(catagory = "Top 10 of 2018") {
      //   return test
      // } else if(catagory = "Top 10 Shared") {
      //   return test
      // } else {
      //   return test
      // }
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    setPlayingProject(projectId) {
      this.playingProjectId = projectId
    },
    instSelect() {
      //
    }
  }
  }

</script>

<style scoped>
  .explorer {
    color: white;
  }
</style>