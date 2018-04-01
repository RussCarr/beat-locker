<template>
    <div class="container-fluid">
        <div class="row">
            <navbar></navbar>
            <div class="container search-results">
                <!-- <div class="col-sm-12 mt-3">
                    Search tracks...
                    <input type="text" v-model="search" placeholder="Search..." name="search">
                    <button type="button" @click="getSearchResults">Submit</button>
                </div> -->
                <div class="col-sm-12 mt-3" v-for="searchResult in searchResults">
                    <div class="row">
                        <div class="col-6">
                            <player :project="sharedProject" :largeButtons="false"></player>
                            {{searchResult.title}}
                            <p class="createdBy">created by:</p>
                            <!-- <button @click="showProfile" class="createdUser">{{user.name}}</button> -->
                            <a href="#" class="text-light mr-5" @click.prevent="showProfile">
                                {{user.name}}
                            </a>
                        </div>
                        <div class="col-1">
                            <p>{{searchResult.forkCount}}</p>
                            <a href="#" class="text-light mr-5" @click.prevent="forkProject">
                                <i class="fas fa-code-branch"></i>
                            </a>
                        </div>
                        <div class="col-1">
                            <p>{{searchResult.shareCount}}</p>
                            <a href="#" class="text-light" @click.prevent="shareBox= shareBox ? false : true">
                                <i class="fas fa-share"></i>
                            </a>
                        </div>
                        <div v-if="shareBox" class="shareButton">
                            <p>
                                <a class="share-icon" @click='updateShareCount' href="https://www.facebook.com/sharer/sharer.php?u=https://beatlocker.herokuapp.com"
                                    target="https://beatlocker.herokuapp.com/">
                                    <i class="fab fa-facebook"></i>
                                </a>
                            </p>
                            <p>
                                <a class="share-icon" @click='updateShareCount' href="https://twitter.com/intent/tweet?url=https://beatlocker.herokuapp.com/&text=TEXT&via=YOURTWITTERACCOUNTNAME"
                                    target="https://beatlocker.herokuapp.com/">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </p>
                            <p>
                                <a class="share-icon" @click='updateShareCount' href="https://nodemailer.com/about/" target="https://beatlocker.herokuapp.com/">
                                    <i class="fas fa-envelope"></i>
                                </a>
                            </p>
                            <p>
                                <a class="share-icon" @click='updateShareCount' href="https://www.twilio.com/" target="https://beatlocker.herokuapp.com/">
                                    <i class="fas fa-mobile"></i>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Navbar from '../Navbar'
    import SharedProject from './SharedProject'
    import ViewUserProfile from './ViewUserProfile'
    export default {
      name: 'SearchResults',
      components: {
        navbar: Navbar,
        sharedProject: SharedProject,
        viewUserProfile: ViewUserProfile,
      },
      data() {
        return {

          showProfile: false,
          sharedProjects: [],
          sharedProjectUsers: [],
          search: ''
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
        // applyFilter(category) {
        //   var allProjects = this.$store.state.allProjects;
        //   var allSharedProjects = allProjects.filter(project => {
        //     return project.shared === true
        //   })
  
        //   if (category == "Top 10 Newly Shared") {
        //     allSharedProjects.sort(function (a, b) { return b.createAt - a.createAt })
  
        //   } else if (category == "Top 10 Forked") {
        //     allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount })
  
        //   } else if (category == "Top 10 of 2018") {
        //     allSharedProjects.sort(function (a, b) { return b.forkCount - a.forkCount || b.shareCount - a.shareCount })
  
        //     //  console.log('sort method', allSharedProjects.sort(function (a, b) { return b[forkCount] - a[forkCount] || b[shareCount] - a[shareCount] }))
        //   } else if (category == "Top 10 Shared") {
        //     allSharedProjects.sort(function (a, b) { return b.shareCount - a.shareCount })
        //   }
        //   this.sharedProjects = allSharedProjects
        //   var userIds = allSharedProjects.map(project => project.userId)
        //   this.$store.dispatch('getUsersById', userIds).then(() => {
        //     this.sharedProjectUsers = this.$store.state.activeProjectUsers
        //   })
        // },
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
        showProfile() {
          this.$emit('showProfile')
          this.$store.dispatch('setPreviewProject', this.sharedProject)
        }
      }
    }
  </script>
  
  <style scoped>
    .search-results {
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