<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-sm-12">
        <div class="row track-row">
          <div class="col-sm-8 shared-view">
            <div class="shared-track-info">
              {{sharedProject.title}}
              <p class="createdBy">created by:</p>
              <a href="#" class="text-light" @click.prevent="showProfile">
                {{user.name}}
              </a>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="row share-icons-wrapper">
              <div class="col share-icons">
                <p class="createdBy">{{sharedProject.playCount}}</p>
                <player class="centerFlex" :project="sharedProject" :largeButtons="false" :allowPlayCountUpdate="true"></player>
              </div>
              <div class="col share-icons">
                <p class="createdBy">{{sharedProject.forkCount}}</p>
                <a href="#" class="text-light" @click.prevent="forkProject">
                  <i class="fas fa-code-branch"></i>
                </a>
              </div>
              <div class="col share-icons">
                <p class="createdBy">{{sharedProject.shareCount}}</p>
                <a href="#" class="text-light" @click.prevent="shareBox= shareBox ? false : true">
                  <i class="fas fa-share"></i>
                </a>
              </div>
              <div class="col-sm-12">
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
                    <a class="share-icon"  href="#" @click.prevent="mailBox= mailBox ? false : true">
                      <i class="fas fa-envelope"></i>
                    </a>
                  </p>
                  <p>
                    <a class="share-icon" @click='updateShareCount' href="https://www.twilio.com/" target="https://beatlocker.herokuapp.com/">
                      <i class="fas fa-mobile"></i>
                    </a>
                  </p>
                </div>
                <div v-if="mailBox" class="mail">
                  <mail v-on:mailBox="mailBox=false" :sharedProject="sharedProject"></mail>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-sm-12">
            <div v-if="showProfile" class="text-center viewProfile">
              <viewUserProfile></viewUserProfile>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Player from './../Player'
  import ViewUserProfile from './ViewUserProfile'
  import Mail from '../Mail'
  export default {
    name: 'SharedProject',
    components: {
      player: Player,
      viewUserProfile: ViewUserProfile,
      mail: Mail
    },
    data() {
      return {
        loop: {},
        isPlaying: false,
        shareBox: false,
        mailBox: false
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
      // updatePlayCount(playCount) {
      //   this.sharedProject.push(playCount++)
      //   this.$store.dispatch('updatePlayCount', this.sharedProject)
      // },
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
  /* div {
    outline-style: solid;
    outline-color: aqua;
    outline-width: 1px;

  } */

  .track-row {
    background-position: top;
    background-image: url('../../assets/images/beat-locker-splash-bg.jpg');
    background-repeat: no-repeat;
    background-color: rgba(150, 16, 33, 1.0);
  }

  .share-icons-wrapper {
    display: flex;
    margin: 1rem;
    border-radius: 4px;
    background-color: rgba(107, 32, 45, .8);

  }

  .viewProfile {
    border: 2px solid white;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .shared-track-info {
    padding: 1rem;
    border-radius: 4px;
    font-size: 1.2rem;
    background-color: rgba(150, 16, 33, .8);
  }

  .share-icons {
    padding: 1rem;
  }

  .shared-view {
    padding: 1rem;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .player-wrapper {
    display: flex;
    width: 25%;
    justify-content: center
  }

  .centerFlex {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  a.share-icon {
    color: white;
    margin: .6rem;
  }

  a.share-icon:hover {
    color: rgba(206, 33, 53, 1.0)
  }

  .sharedTracks {
    color: white;
  }

  .createdBy {
    font-size: .8rem;
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
    border: 1px solid rgba(255, 255, 255, 0.808);
    margin: .5rem;
    display: inline-flex;
  }

  p {
    margin: -1px;

  }
</style>