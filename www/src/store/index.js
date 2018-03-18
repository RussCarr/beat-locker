// Vuex 'store': Sets and maintains front-end application 'state'

import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import router from "../router";

var production = !window.location.host.includes("localhost");
var baseUrl = "//localhost:3000/";

var api = axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
});

var auth = axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
});

vue.use(vuex);

export default new vuex.Store({
  state: {
    user: {},
    authError: {
      error: false,
      message: ""
    },
    activeProject: {},
    activeTracks: [],
    userProjects: [],
    community: []
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
      this.state.activeProject = project;
    },
    setActiveTracks(state, tracks) {
      this.state.activeTracks = tracks;
    },
    addActiveTrack(state, track) {
      this.state.activeTracks.push(track);
    },
    removeActiveTrack(state, track) {
      this.state.activeTracks.splice(this.state.activeTracks.indexOf(track), 1);
    },
    updateActiveTracks(state, data) {
      this.state.activeTracks.find(
        track => track._id === data.trackId
      ).stepSequence =
        data.stepSequence;
    },
    setUserProjects(state, userCreatedProject) {
      this.state.userProjects = userCreatedProject;
    },
    setAllUserProjects(state, allUserProjects) {
      console.log("state", allUserProjects);
      this.state.community = allUserProjects;
    }
  },

  actions: {
    // Auth
    registerUser({ commit, dispatch }, user) {
      auth
        .post("register", user)
        .then(res => {
          var newUser = res.data;
          commit("setUser", newUser);
          commit("setAuthError", { error: false, message: "" });

          dispatch("createProject", newUser._id);

          router.push({
            name: "Home"
          });
        })
        .catch(err => {
          console.log(err);
          commit("setAuthError", {
            error: true,
            message:
              "Register failed: Invalid username, email, or password given"
          });
        });
    },

    editUser({ commit, dispatch }, user) {
      console.log(user, "looking for user from edit user form");
      api
        .put("users/" + user._id, user)
        .then(res => {
          var updatedUser = res.data;
          commit("setUser", updatedUser);
        })
        .catch(err => {
          console.log(err);
        });
    },

    loginUser({ commit, dispatch }, user) {
      auth
        .post("login", user)
        .then(res => {
          var newUser = res.data;
          console.log("logged-in user:", newUser);
          commit("setUser", newUser);
          commit("setAuthError", { error: false, message: "" });

          dispatch("getLatestProject", newUser._id);

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

          dispatch("getLatestProject", sessionUser._id);

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
          commit("setActiveProject", {});
          commit("setActiveTracks", []);
          router.push({
            name: "Welcome"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // ToneJS
    updateActiveTracks({ commit, dispatch }, data) {
      commit("updateActiveTracks", data);
    },

    // API
    getUserProjects({ commit, dispatch }, user) {
      api
        .get(`users/${user._id}/projects`)
        .then(res => {
          var userCreatedProjects = res.data;

          commit("setUserProjects", userCreatedProjects);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllUserProjects({ commit, dispatch }) {
      api
        .get(`projects`)
        .then(res => {
          commit("setAllUserProjects", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProject({ commit, dispatch }, project) {
      var project_Id = project._id;
      commit("setActiveProject", []);
      commit("setActiveTracks", []);
      api
        .delete(`projects/${project_Id}`)
        .then(res => {
          dispatch("getLatestProject", project.userId);
          dispatch("getUserProjects", project.userId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProjectShared({ commit, dispatch }, payload) {
      var setting = {
        shared: payload[1]
      };
      console.log("setting", setting, payload);
      api
        .put(`projects/${payload[0]._id}`, setting)
        .then(res => {
          dispatch("getUserProjects", payload[0].userId);
        })
        .catch(err => {
          console.log(err);
        });
    },

    createTrack({ commit, dispatch }, project) {
      var defaultTrack = {
        createdAt: Date.now(),
        instrumentName: "clap-808",
        instrumentSamplePath: "./../../assets/audio/clap-808.wav",
        projectId: project._id,
        userId: project.userId,
        barCount: project.barCount,
        stepsPerBar: project.stepsPerBar,
        stepSequence: new Array(project.barCount * project.stepsPerBar).fill(
          false
        )
      };

      api
        .post("tracks", defaultTrack)
        .then(res => {
          var track = res.data;
          project.trackIds.push(track._id);
          commit("addActiveTrack", track);

          api
            .put(`projects/${project._id}`, project)
            .then(res => {
              var updatedProject = res.data.data;
              commit("setActiveProject", updatedProject);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteTrack({ commit, dispatch }, data) {
      api
        .delete(`tracks/${data.deleting._id}`)
        .then(() => {
          commit("removeActiveTrack", data.deleting);
          api
            .get(`projects/${data.project._id}`)
            .then(res => {
              var project = res.data;
              var trackIds = project.trackIds;
              trackIds.splice(project.trackIds.indexOf(data.deleting._id), 1);
              api
                .put(`projects/${data.project._id}`, {
                  trackIds: trackIds
                })
                .then(res => {
                  var updatedProject = res.data.data;
                  commit("setActiveProject", updatedProject);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    createProject({ commit, dispatch }, userId) {
      api
        .post("projects", {
          createdAt: Date.now(),
          userId: userId,
          trackIds: [] // Initially create the Project with empty trackIds array
        })
        .then(res => {
          var defaultProject = res.data;

          var defaultTrack = {
            createdAt: Date.now(),
            instrumentName: "clap-808",
            instrumentSamplePath: "./../../assets/audio/clap-808.wav",
            projectId: defaultProject._id,
            userId: defaultProject.userId
          };

          api
            .post("tracks", defaultTrack)
            .then(res => {
              var track0 = res.data;
              defaultProject.trackIds.push(track0._id);
              commit("setActiveTracks", []);
              commit("addActiveTrack", track0);

              defaultTrack.instrumentName = "hihat-808";
              defaultTrack.instrumentSamplePath =
                "./../../assets/audio/hihat-808.wav";
              api
                .post("tracks", defaultTrack)
                .then(res => {
                  var track1 = res.data;
                  defaultProject.trackIds.push(track1._id);
                  commit("addActiveTrack", track1);

                  defaultTrack.instrumentName = "snare-big";
                  defaultTrack.instrumentSamplePath =
                    "./../../assets/audio/snare-big.wav";
                  api
                    .post("tracks", defaultTrack)
                    .then(res => {
                      var track2 = res.data;
                      defaultProject.trackIds.push(track2._id);
                      commit("addActiveTrack", track2);

                      defaultTrack.instrumentName = "kick-heavy";
                      defaultTrack.instrumentSamplePath =
                        "./../../assets/audio/kick-heavy.wav";
                      api
                        .post("tracks", defaultTrack)
                        .then(res => {
                          var track3 = res.data;
                          defaultProject.trackIds.push(track3._id);
                          commit("addActiveTrack", track3);

                          api
                            .put(
                              `projects/${defaultProject._id}`,
                              defaultProject
                            )
                            .then(res => {
                              var updatedProject = res.data.data;
                              commit("setActiveProject", updatedProject);
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadProjectFromSidebar({ commit, dispatch }, project) {
      commit("setActiveProject", []);
      commit("setActiveTracks", []);
      api
        .get(`/projects/${project._id}`)
        .then(res => {
          // var allUserProjects = res.data;
          // console.log("UserProject", res.data);
          // console.log('STATE',this.state.activeProject,this.state.activeTracks)
          // allUserProjects.sort((projA, projB) => {
          //   return projB.createdAt - projA.createdAt;
          // });
          // var lastCreatedProject = allUserProjects[0];
          var project = res.data;
          // console.log("Project ID", res.data);
          commit("setActiveProject", project);
          api(`projects/${project._id}/tracks`)
            .then(res => {
              var projectTracks = res.data;
              // console.log("projectTracks", projectTracks);
              commit("setActiveTracks", projectTracks);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    cloneProject({ commit, dispatch }, payload) {
      console.log(payload)
           var clonedProject = payload
        console.log('clonedProject',clonedProject)
        clonedProject.title = clonedProject.title + " Cloned"
        clonedProject.forkCount = clonedProject.forkCount + 1
        clonedProject.originalProjectId = clonedProject._id
        clonedProject.originalProjectCreatorId = clonedProject.userId
        clonedProject.originalCreatedAt = clonedProject.createdAt
        clonedProject.userId = ""
        clonedProject._id = ""
        clonedProject.createdAt = ""
        clonedProject.shared = false
      api
        .post(`/projects/`)
        .then(res => {
          console.log("Cloned DATA", res);
          // var cloned = res.data;
          ;

          // dispatch("getLatestProject", newUser._id);
        })
        .catch(err => {
          console.log(err);
        });
    },

    getLatestProject({ commit, dispatch }, userId) {
      api
        .get(`users/${userId}/projects`)
        .then(res => {
          var allUserProjects = res.data;
          console.log("allUserProjects", allUserProjects);

          allUserProjects.sort((projA, projB) => {
            return projB.createdAt - projA.createdAt;
          });
          var lastCreatedProject = allUserProjects[0];
          commit("setActiveProject", lastCreatedProject);

          api(`projects/${lastCreatedProject._id}/tracks`)
            .then(res => {
              var projectTracks = res.data;
              console.log("projectTracks", projectTracks);
              commit("setActiveTracks", projectTracks);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveProject({ commit, dispatch }, data) {
      api
        .put(`projects/${data.project._id}`, data.project)
        .then(res => {
          var savedProject = res.data.data;
          console.log("saved project", savedProject);
          commit("setActiveProject", savedProject);

          api
            .put(`tracks/${data.tracks[0]._id}`, data.tracks[0])
            .then(res => {
              var updatedTrack = res.data.data;
              console.log("updatedTrack", updatedTrack);
              commit("setActiveTracks", []);
              commit("addActiveTrack", updatedTrack);

              api
                .put(`tracks/${data.tracks[1]._id}`, data.tracks[1])
                .then(res => {
                  var updatedTrack = res.data.data;
                  console.log("updatedTrack", updatedTrack);
                  commit("addActiveTrack", updatedTrack);

                  api
                    .put(`tracks/${data.tracks[2]._id}`, data.tracks[2])
                    .then(res => {
                      var updatedTrack = res.data.data;
                      console.log("updatedTrack", updatedTrack);
                      commit("addActiveTrack", updatedTrack);

                      api
                        .put(`tracks/${data.tracks[3]._id}`, data.tracks[3])
                        .then(res => {
                          var updatedTrack = res.data.data;
                          console.log("updatedTrack", updatedTrack);
                          commit("addActiveTrack", updatedTrack);
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateProject({ commit, dispatch }, updatedProject) {
      api
        .put(`projects/${updatedProject._id}`, updatedProject)
        .then(res => {
          var updatedProject = res.data.data;
          console.log(updatedProject);
          commit("setActiveProject", updatedProject);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTrack({ commit, dispatch }, updatedTrack) {
      // console.log('updatedTrack', updatedTrack)
      api.put(`tracks/${updatedTrack._id}`, updatedTrack).then(res => {
        var updatedTrack = res.data.data;
        console.log("updatedTrack", updatedTrack);

        api
          .get(`projects/${updatedTrack.projectId}/tracks`)
          .then(res => {
            var projectTracks = res.data;
            commit("setActiveTracks", projectTracks);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
});
