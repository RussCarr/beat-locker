// Vuex 'store': Sets and maintains front-end application 'state'

import vue from "vue"
import vuex from "vuex"
import axios from "axios"
import router from "../router"

var production = !window.location.host.includes("localhost")
var baseUrl = "//localhost:3000/"

var api = axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

var auth = axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {},
    authError: {
      error: false,
      message: ""
    },
    activeProject: {
      _id: '001',
      title: 'Beat Project No. 1',
      barCount: 4,
      stepsPerBar: 4,
      trackIds: ['001', '002', '003', '004'],
      bpmSetting: 120
    },
    activeTracks: [
      {
        _id: '001',
        instrument: {name: 'kick-classic', samplePath: './../assets/drumSamples/kick-classic.wav'},
        barCount: 4,
        stepsPerBar: 4,
        stepSequence: new Array(16).fill(false)
      },
      {
        _id: '002',
        instrument: {name: 'openhat-acoustic01', samplePath: './../assets/drumSamples/openhat-acoustic01.wav'},
        barCount: 4,
        stepsPerBar: 4,
        stepSequence: new Array(16).fill(false)
      }
      ,{
        _id: '003',
        instrument: {name: 'snare-big', samplePath: './../assets/drumSamples/snare-big.wav'},
        barCount: 4,
        stepsPerBar: 4,
        stepSequence: new Array(16).fill(false)
      },
      {
        _id: '004',
        instrument: {name: 'tom-acoustic01', samplePath: './../assets/drumSamples/tom-acoustic01.wav'},
        barCount: 4,
        stepsPerBar: 4,
        stepSequence: new Array(16).fill(false)
      }
    ]
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthError(state, error) {
      state.authError = {
        error: error.error,
        message: error.message
      };
    },

    setActiveProject(state, project) {
      this.state.activeProject = project
    },
    setActiveTracks(state, tracks) {
      this.state.activeTracks = tracks
    },
    addActiveTrack(state, track) {
      this.state.activeTracks.push(track)
    },
    updateActiveTracks(state, data) {
      this.state.activeTracks.find(track => track._id === data.trackId).stepSequence = data.stepSequence
    }
  },

  actions: {
    // Auth
    registerUser({ commit, dispatch }, user) {
      auth
        .post("register", user)
        .then(res => {
          var newUser = res.data
          commit("setUser", newUser)
          commit("setAuthError", { error: false, message: "" })
          
          api.post('projects', {
            createdAt: Date.now(),
            userId: newUser._id,
            trackIds: [] // Initially create the Project with empty trackIds array
          }).then(res => {
            var defaultProject = res.data
            commit('setActiveProject', defaultProject)
            
            var defaultTrack = {
              instrumentName: 'clap-808',
              instrumentSamplePath: './../../assets/audio/clap-808.wav',
              projectId: defaultProject._id,
              userId: defaultProject.userId
            }

            api.post('tracks', defaultTrack).then(res => {
                var track0 = res.data 
                defaultProject.trackIds.push(track0._id)
                commit('setActiveTracks', [])
                commit('addActiveTrack', track0)

                defaultTrack.instrumentName = 'hihat-808'
                defaultTrack.instrumentSamplePath = './../../assets/audio/hihat-808.wav'
                api.post('tracks', defaultTrack).then(res => {
                  var track1 = res.data
                  defaultProject.trackIds.push(track1._id)
                  commit('addActiveTrack', track1) 

                  defaultTrack.instrumentName = 'snare-big'
                  defaultTrack.instrumentSamplePath = './../../assets/audio/snare-big.wav'
                  api.post('tracks', defaultTrack).then(res => {
                    var track2 = res.data
                    defaultProject.trackIds.push(track2._id)
                    commit('addActiveTrack', track2)

                    defaultTrack.instrumentName = 'kick-heavy'
                    defaultTrack.instrumentSamplePath = './../../assets/audio/kick-heavy.wav'
                    api.post('tracks', defaultTrack).then(res => {
                      var track3 = res.data
                      defaultProject.trackIds.push(track3._id)
                      commit('addActiveTrack', track3)
                    }).catch(err => { console.log(err) })
                  }).catch(err => { console.log(err) })
                }).catch(err => { console.log(err) })
              }).catch(err => { console.log(err) })
            }).catch(err => { console.log(err) })
          
          router.push({
            name: "Home"
          })
        })
        .catch(err => {
          console.log(err)
          commit("setAuthError", {
            error: true,
            message:
              "Register failed: Invalid username, email, or password given"
          })
        })
    },

    loginUser({ commit, dispatch }, user) {
      auth
        .post("login", user)
        .then(res => {
          var newUser = res.data;
          console.log("logged-in user:", newUser);
          commit("setUser", newUser);
          commit("setAuthError", { error: false, message: "" });
          dispatch("getUserProjects");
          router.push({
            name: "Home"
          });
        })
        .catch(err => {
          console.log(err);
          commit("setAuthError", {
            error: true,
            message: "Log-in failed: Invalid username or password"
          });
        });
    },

    authenticateUser({ commit, dispatch }) {
      auth
        .get("authenticate")
        .then(res => {
          var sessionUser = res.data;
          console.log("returning user:", sessionUser);
          commit("setUser", sessionUser);
          router.push({
            name: "Home"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    logoutUser({ commit, dispatch }) {
      auth
        .delete("logout")
        .then(() => {
          console.log("User logged out");
          commit("setUser", {});
          commit("setAuthError", { error: false, message: "" });
          router.push({
            name: "Welcome"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // ToneJS
    updateActiveTracks({commit, dispatch}, data) {
      commit('updateActiveTracks', data)
    }

    // API
  }
});
