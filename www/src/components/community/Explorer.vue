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

            <select>
              <option>Top 10 Forked</option>
              <option>Top 10 Shared</option>
              <option>Top 10 Newly Created</option>
              <option>Top 10 of 2017</option>
            </select>

          </div>
        </div>
      </div>
      <div class="col-7 text-center">
         
                <p class="text-center">Sorted by {Catagory}</p>
             
    
        <sharedProjects :allSharedProject='allSharedProject' class="mt-4" v-for="allSharedProject in allSharedProjects" :key='allSharedProject._id'></sharedProjects>

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
      sharedProjects: SharedProjects,
      

    },
    data() {
      return {

      }
    },
    computed: {
      allSharedProjects() {
        var communityData = this.$store.state.community;
        // getPrivacy(communityData)
        // return communityData.privacy
        // getPrivacy()
         var test = communityData.filter(project => {
          return project.shared===true
        }) 
        console.log('communityData1', test)
        // Object.keys(communityData).forEach(privacy => {
        //  for(var privacy in communityData)
        return test
       
        // })

      }
    },
    methods: {
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