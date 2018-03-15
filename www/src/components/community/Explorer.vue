<template>
  <div class="container-fluid explorer">
    <navbar></navbar>
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
      <div class="col-8 text-center">
        Sorted by {Catagory}
        <sharedTracks class="mt-4"></sharedTracks>

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
  import SharedTracks from './SharedTracks'
   export default {
    name: 'Explorer',
    components: {
      navbar: Navbar,
           sidebar: SideBar,
           sharedTracks: SharedTracks,

    },
    data() {
      return {

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