<template>
  <div class="container-fluid explorer">
    <div class="row">
      <navbar></navbar>
      <sidebar></sidebar>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 mt-3 text-center">
            <!-- <div class="row">
              <div class="col-12 mt-3">
                Sort by...
                <div class="col-12 mt-3">
                  <select v-model="category">
                    <option>Top 10 Forked</option>
                    <option>Top 10 Shared</option>
                    <option>Top 10 Newly shared</option>
                    <option>Top 10 of 2018</option>
                  </select>
                </div>
              </div>
            </div>
            <p class="text-center mt-4">Sorted by {{category}}</p> -->
            <sharedProject class="mt-4" :sharedProject='searchResult' v-on:showProfile="showProfile = showProfile ? false : true" v-for="searchResult in searchResults"
        :key='searchResult._id'>
        </sharedProject>
          </div>

          <div class="col-sm-12">

            <div class="mt-4 row">
              <div v-if="showProfile" class="text-center viewProfile">
                <viewUserProfile v-on:closeProfile="showProfile = false"></viewUserProfile>
              </div>

            </div>
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
    name: 'SearchResults',
    components: {
      navbar: Navbar,
      sidebar: SideBar,
      sharedProject: SharedProject,
      viewUserProfile: ViewUserProfile,
    },
    data() {
      return {
        category: "Top 10 Forked",
        showProfile: false,
        sharedProjects: [],
        sharedProjectUsers: [],
        search: ''
      }
    },
    watch: {
      category: function (val) {
        this.applyFilter(val)
      }
    },
    computed: {
      searchResults() {
        return this.$store.state.searchResults
      },
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
        this.sharedProjects = allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount }).slice(0, 10)
        var userIds = allSharedProjects.map(project => project.userId)
        this.$store.dispatch('getUsersById', userIds).then(() => {
          this.sharedProjectUsers = this.$store.state.activeProjectUsers
        })
      })
    },
    methods: {
      setPlayingProject(projectId) {
        this.playingProjectId = projectId
      },
      applyFilter(category) {
        var allProjects = this.$store.state.allProjects;
        var allSharedProjects = allProjects.filter(project => {
          return project.shared === true
        })

        if (category == "Top 10 Newly Shared") {
          allSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })

        } else if (category == "Top 10 Forked") {
          allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount })

        } else if (category == "Top 10 of 2018") {
          allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount || b.shareCount - a.shareCount })

          //  console.log('sort method', allSharedProjects.sort(function (a, b) { return b[forkCount] - a[forkCount] || b[shareCount] - a[shareCount] }))
        } else if (category == "Top 10 Shared") {
          allSharedProjects.sort(function (a, b) { return b.shareCount - a.shareCount })
        }
        this.sharedProjects = allSharedProjects
        var userIds = allSharedProjects.map(project => project.userId)
        this.$store.dispatch('getUsersById', userIds).then(() => {
          this.sharedProjectUsers = this.$store.state.activeProjectUsers
        })
      },
      getSearchResults() {
        var query = this.search
        this.$store.dispatch('searchProjects', query)
      },
      updateShareCount() {
        this.$store.dispatch('updateShareCount', this.sharedProject)
      },
      forkProject() {
        this.$store.dispatch('cloneProject', this.sharedProject)
      },
      displayProfile() {
        this.$emit('showProfile')
        this.$store.dispatch('setPreviewProject', this.sharedProject)
      }
    }
  }
</script>

<style scoped>
  .explorer {
    color: white;
  }

  /* div {
      outline-color: blue;
      outline-style: solid;
      outline-width: 1px;
    } */

  .viewProfile {
    border: 3px solid white;
    width: 400px;
    height: 100%;
  }

  hr {
    border-color: white;
  }

  a.share-icon {
    color: white
  }

  a.share-icon:hover {
    color: rgba(206, 33, 53, 1.0)
  }

  .sharedTracks {
    color: white;
  }

  .createdBy {
    font-size: 10px;
    color: white;
  }

  .createdUser {
    font-size: 10px;
    color: white;
  }

  .play-button {
    color: white;
  }

  .play-button:hover {
    color: rgba(206, 33, 53, 1.0);
  }

  .shareButton {
    border: 2px solid white;
    width: 100px;
    /* height: 80px; */
  }
</style>