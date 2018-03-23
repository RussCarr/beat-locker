<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-6">
              <player :project="sharedProject" :largeButtons="false"></player>
            {{sharedProject.title}}
            <p class="createdBy">created by:</p>
            <!-- <button @click="showProfile" class="createdUser">{{user.name}}</button> -->
            <a href="#" class="text-light mr-5" @click.prevent="showProfile">
              {{user.name}}
            </a>
          </div>
          <div class="col-1">
              <p>{{sharedProject.forkCount}}</p>
            <a href="#" class="text-light mr-5" @click.prevent="forkProject">
              <i class="fas fa-code-branch"></i> 
            </a>
          </div>
          <div class="col-1">
              <p>{{sharedProject.shareCount}}</p>
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
    import Tone from 'tone'
    import Player from './../Player'
    export default {
      name: 'SharedProject',
      components: {
        player: Player
    },
    data() {
      return {
        loop: {},
        isPlaying: false,
        shareBox: false
      }
    },
    props: [
      'sharedProject',
      'playingProjectId',

    ],
    computed: {
      beatTracks() {
        return this.$store.state.previewTracks
      },
      user() {
        var projectUsers = this.$store.state.activeProjectUsers
        return projectUsers.find(user => user._id === this.sharedProject.userId)
      }
    },
    methods: {
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
  
    p {
      margin: -1px;
  
    }
  </style>