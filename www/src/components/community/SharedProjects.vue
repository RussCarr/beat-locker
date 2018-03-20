<template>
  <div class="sharedTracks">
    <div class="row">
      <div class="col-2">

      </div>
      <div class="col-10">
        <div class="row">

          <div class="col-6">
            <a href="#" class="text-light" @click.prevent="">
              <i class="far fa-play-circle m-l-5"></i>
            </a>
            {{sharedProject.title}}
            <p class="createdBy">created by:</p>
            <button @click="showProfile" class="createdUser">{{sharedProject.userName}} Name</button>

          </div>
          <div class="col-1">
            <a href="#" class="text-light mr-5"  @click.prevent="forkProject(sharedProject)">
              <i class="fas fa-code-branch"></i> {{sharedProject.forkCount}}
            </a>
          </div>
          <div class="col-1">
            <a href="#" class="text-light"  @click.prevent="shareBox= shareBox ? false : true">
              <i class="fas fa-share"></i>
            </a>
          </div>
          <div v-if="shareBox" class="shareButton">
            <p>Facebook</p>
            <p>SMS:Twilio</p>
            <p>Twitter</p>
            <p>Email:mailgun</p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SharedProjects',
    components: {
    },
    data() {
      return {
        shareBox: false
      }
    },
    computed: {
      
      
    },
    props: [
      'sharedProject'

    ],
    methods: {
      forkProject(sharedProject) {
        console.log('fork project', sharedProject)
        this.$store.dispatch('cloneProject', sharedProject)
      },
      showProfile() {
        this.$emit('showProfile')
      },
  }
  }

</script>

<style scoped>
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

  .shareButton {
    border: 2px solid white;
    width: 100px;
    /* height: 80px; */
  }

  p {
    margin: -1px;

  }
</style>