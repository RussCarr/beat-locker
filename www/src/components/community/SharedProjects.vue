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
          </div>
          <div class="col-3">

            <a href="#" class="text-light mr-5" @click.prevent="">
              <i class="fas fa-code-branch"></i>

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
      'allSharedProject'
    ],
    methods: {
      instSelect() {
        //
      }
    }
  }

</script>

<style scoped>
  .sharedTracks {
    color: white;
  }
</style>