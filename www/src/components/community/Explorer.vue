<template>
  <div class="container-fluid explorer">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="row">
      <div class="col-2">
        <div class="col-12 mt-3">
          Search tracks...
          <form>
            <input action="#" type="text" v-model="search" placeholder="Search..." name="search" @submit.prevent="submit">
            <!-- RESETS THE PAGE SO COMMENTED OUT FOR NOW -->
            <!-- <button type="submit">Submit</button> --> 
          </form>
        </div>
        <div class="col-12 mt-3">
          Sort by...
          <div class="col-12 mt-3">
            <select v-model="category" @change="applyFilter">
              <option>Top 10 Forked</option>
              <option>Top 10 Shared</option>
              <option>Top 10 Newly shared</option>
              <option>Top 10 of 2018</option>
            </select>

          </div>
        </div>
        <!-- <div class="col-12 mt-3" v-for="sharedProject in filteredSharedProjects"> -->
        <!-- <div class="col-12 mt-3" v-for="sharedProject in sharedProjects">
          {{sharedProject.title}}
        </div> -->
      </div>
      <div class="col-4 mt-3 text-center">
        <p class="text-center">Sorted by {{category}}</p>
        <sharedProject class="mt-4" :sharedProject='sharedProject' v-on:showProfile="showProfile = showProfile ? false : true" v-for="sharedProject in sharedProjects"
          :key='sharedProject._id' v-on:playing="setPlayingProject" :playingProjectId="playingProjectId">
        </sharedProject>
      </div>

      <div class=" col-3">

        <div class="mt-4 row">

          <div v-if="showProfile" class="text-center viewProfile">
            <viewUserProfile :allSharedProjects='allSharedProjects'></viewUserProfile>

            <!-- <h3>User Profile</h3>
            <hr>
            <p>user Name</p>
            <p>User Bio</p>
            <hr>
            <p>Projects Shared</p>
            <p> Track</p>
            <p> Track</p>
            <p> Track</p>
            <p> Track</p>
          -->
          </div>
         </div>
      </div>
    </div>
</div>

</template>

<script>
  import Navbar from '../Navbar'
  import SideBar from '../SideBar'
  import SharedProject from './SharedProject'
  import ViewUserProfile from './ViewUserProfile'
  export default {
    name: 'Explorer',
    components: {
      navbar: Navbar,
      sidebar: SideBar,
      sharedProject: SharedProject,
      viewUserProfile: ViewUserProfile,



    },
    data() {
      return {
        playingProjectId: "",
        category: "Top 10 Forked",
        showProfile: false,
        sharedProjects: [],
        sharedProjectUsers: [],
        search: ''
        // options: [
        //   { text: 'Top 10 Newly Created', value: 'Top 10 Newly Created' },
        //   { text: 'Top 10 Forked', value: 'Top 10 Forked' },
        //   { text: 'Top 10 Shared', value: 'Top 10 Shared' },
        //   { text: 'Top 10 of 2018', value: 'Top 10 of 2018' }
        // ]
      }
    },
    computed: {
      // allSharedProjects(category) {
      //   var allProjects = this.$store.state.allProjects;
      //   var allSharedProjects = allProjects.filter(project => {
      //     return project.shared === true
      //   })
      //   // allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount })
      //   // console.log('allSharedProjectsData1', test)
      //   if (category = "Top 10 Newly Created") {
      //     allSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })
          
      //   } else if (category = "Top 10 Forked") {
      //     allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount })
          
      //   } else if (category = "Top 10 of 2018") {
      //     allSharedProjects.sort(function (a, b) { return b.forkCount && b.shareCount - a.forkCount && a.shareCount })
         
      //   } else if (category = "Top 10 Shared") {
      //     allSharedProjects.sort(function (a, b) { return b.shareCount - a.shareCount })
      //   }
      //   var userIds = allSharedProjects.map(project => project.userId)
      //   this.$store.dispatch('getUsersById',userIds).then(() => {
      //     return allSharedProjects
      //   })
      // },
      // filteredSharedProjects() {
      //   return this.allSharedProjects.filter((sharedProject) => {
      //     return sharedProject.title.match(this.search)
      //   })
      // },
      user() {
        return this.$store.state.user
      },
    },
    mounted() {
      this.$store.dispatch('getAllProjects').then(() => {
        var allProjects = this.$store.state.allProjects;
          var allSharedProjects = allProjects.filter(project => {
            return project.shared === true
          })
             
          this.sharedProjects = allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount }).slice(0,10)
          var userIds = allSharedProjects.map(project => project.userId)
          this.$store.dispatch('getUsersById',userIds).then(() => {
            this.sharedProjectUsers = this.$store.state.activeProjectUsers
          })
      })
    },
    methods: {
      setPlayingProject(projectId) {
        this.playingProjectId = projectId
      },
      applyFilter() {
        var allProjects = this.$store.state.allProjects;
        var allSharedProjects = allProjects.filter(project => {
          return project.shared === true
        })
        
        if (this.category = "Top 10 Newly Created") {
          allSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })
          
        } else if (this.category = "Top 10 Forked") {
          allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount })
          
        } else if (this.category = "Top 10 of 2018") {
          allSharedProjects.sort(function (a, b) { return b.forkCount && b.shareCount - a.forkCount && a.shareCount })
         
        } else if (this.category = "Top 10 Shared") {
          allSharedProjects.sort(function (a, b) { return b.shareCount - a.shareCount })
        }
        this.sharedProjects = allSharedProjects
        var userIds = allSharedProjects.map(project => project.userId)
        this.$store.dispatch('getUsersById',userIds).then(() => {
          this.sharedProjectUsers = this.$store.state.activeProjectUsers
        })
      },
      filteredSharedProjects() {
        return this.allSharedProjects.filter((sharedProject) => {
          return sharedProject.title.match(this.search)
        })
      },
      
    }
  }

</script>

<style scoped>
  .explorer {
    color: white;
  }

  .viewProfile {
    border: 3px solid white;
    width: 400px;
    height: 100%;
  }

  hr {
    border-color: white;
  }
</style>