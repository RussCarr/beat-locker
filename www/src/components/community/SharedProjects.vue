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
            {{allSharedProject.title}}
            <p class="createdBy">created by:</p>
            <p class="createdUser">{{allSharedProject.userName}}</p>
          </div>
          <div class="col-3">
            <a href="#" class="text-light mr-5" @click.prevent="forkProject(allSharedProject,user)">
              <i class="fas fa-code-branch"></i> {{allSharedProject.forkCount}}

            </a>
            <a href="#" class="text-light" @click.prevent="">
              <i class="fas fa-share"></i>

              <!-- <select>
                <option>Facebook</option>
                <option>SMS:Twilio</option>
                <option>Twitter</option>
                <option>Email:mailgun</option>
              </select> -->

            </a>
          </div>
        </div>
      </div>
    </div>
  
  <!-- <div class="col-1">


    </div>
    <div class="col-1">


    </div>
 -->

  </div>
</template>

<script>

  export default {
    name: 'SharedTracks',
    components: {
    },
    data() {
      return {

      }
    },
    props: [
      'allSharedProject',
      'user'
    ],
    methods: {
      forkProject(allSharedProject,user) {
        console.log('fork project',allSharedProject,user)
        // var payload = []
        // payload.push(allSharedProject)
        // payload.push(user._id)
        this.$store.dispatch('cloneProject',allSharedProject)
      }
    }
  }

</script>

<style scoped>
  .sharedTracks {
    color: white;
  }
  .createdBy{
    font-size: 10px;
    color: white;
  }
  .createdUser{
    font-size: 10px;
    color: white;
  }
</style>