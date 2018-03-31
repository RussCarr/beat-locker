// Vuex 'store': Sets and maintains front-end application 'state'

import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import router from "../router";

var production = !window.location.host.includes("localhost");
var baseUrl = production ? "//beatlocker.herokuapp.com/" : "//localhost:3000/";

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
    previewTracks: [],
    userProjects: [],
    allProjects: [],
    activeProjectUsers: [],
    searchResults: [],
    projectPreview: [],
    playingProjectId: ""
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
      state.activeProject = project;
    },
    setActiveTracks(state, tracks) {
      state.activeTracks = tracks;
    },
    setPreviewTracks(state, tracks) {
      state.previewTracks = tracks;
    },
    unshiftActiveTrack(state, track) {
      state.activeTracks.unshift(track);
    },
    pushActiveTrack(state, track) {
      state.activeTracks.push(track);
    },
    pushPreviewTrack(state, track) {
      state.previewTracks.push(track);
    },
    removeActiveTrack(state, trackId) {
      var removed = state.activeTracks.find(track => track._id === trackId);
      state.activeTracks.splice(state.activeTracks.indexOf(removed), 1);
    },
    updateActiveTrack(state, newVersion) {
      var oldVersion = state.activeTracks.find(
        track => track._id === newVersion._id
      );
      state.activeTracks.splice(
        state.activeTracks.indexOf(oldVersion),
        1,
        newVersion
      );
    },
    updateActiveTracks(state, data) {
      state.activeTracks.find(
        track => track._id === data.trackId
      ).stepSequence =
        data.stepSequence;
    },
    setUserProjects(state, userCreatedProject) {
      state.userProjects = userCreatedProject;
    },
    setAllUserProjects(state, allUserProjects) {
      state.allProjects = allUserProjects;
    },
    addUserProject(state, userProject) {
      state.userProjects.push(userProject);
    },
    activeProjectUsers(state, users) {
      state.activeProjectUsers = users;
    },
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults;
    },
    addSearchResults(state, searchResults) {
      state.searchResults = state.searchResults.concat(searchResults);
    },
    setPreviewProject(state, sharedProject) {
      state.projectPreview = sharedProject;
    },
    setPlayingProjectId(state, projectId) {
      state.playingProjectId = projectId;
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
        .get(`users/${user}/projects`)
        .then(res => {
          var userCreatedProjects = res.data;

          commit("setUserProjects", userCreatedProjects);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllProjects({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        api
          .get(`projects`)
          .then(res => {
            commit("setAllUserProjects", res.data);
            resolve();
          })
          // .then(() =>{
          // 	resolve()
          // })
          .catch(err => {
            console.log(err);
          });
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

    createBeatTrack({ commit, dispatch }, project) {
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
          commit("pushActiveTrack", track);

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

    createNoteTrack({ commit, dispatch }, project) {
      var defaultTrack = {
        createdAt: Date.now(),
        instrumentName: "C4", // The default note is middle C
        isNote: true,
        instrumentSamplePath: "", // No sample path for a generated-sound note
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
          project.trackIds.unshift(track._id);
          commit("unshiftActiveTrack", track);

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
          commit("removeActiveTrack", data.deleting._id);
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
            createdAt: Date.now() - 400,
            instrumentName: "clap-808",
            isNote: false,
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
              commit("pushActiveTrack", track0);

              defaultTrack.instrumentName = "hihat-808";
              defaultTrack.createdAt = Date.now() - 300;
              defaultTrack.instrumentSamplePath =
                "./../../assets/audio/hihat-808.wav";
              api
                .post("tracks", defaultTrack)
                .then(res => {
                  var track1 = res.data;
                  defaultProject.trackIds.push(track1._id);
                  commit("pushActiveTrack", track1);

                  defaultTrack.instrumentName = "snare-big";
                  defaultTrack.createdAt = Date.now() - 200;
                  defaultTrack.instrumentSamplePath =
                    "./../../assets/audio/snare-big.wav";
                  api
                    .post("tracks", defaultTrack)
                    .then(res => {
                      var track2 = res.data;
                      defaultProject.trackIds.push(track2._id);
                      commit("pushActiveTrack", track2);

                      defaultTrack.instrumentName = "kick-heavy";
                      defaultTrack.createdAt = Date.now() - 100;
                      defaultTrack.instrumentSamplePath =
                        "./../../assets/audio/kick-heavy.wav";
                      api
                        .post("tracks", defaultTrack)
                        .then(res => {
                          var track3 = res.data;
                          defaultProject.trackIds.push(track3._id);
                          commit("pushActiveTrack", track3);

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
    loadProject({ commit, dispatch }, project) {
      commit("setActiveProject", {});
      commit("setActiveTracks", []);
      api
        .get(`/projects/${project._id}`)
        .then(res => {
          var project = res.data;
          commit("setActiveProject", project);
          api
            .get(`projects/${project._id}/tracks`)
            .then(res => {
              var projectTracks = res.data;
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
    updatePlayCount({ commit, dispatch }, payload) {
      // console.log('Shared Project Shared',payload)
      payload.playCount = payload.playCount + 1;
      // console.log('Shared Project Shared2',payload)
      api
        .put(`projects/${payload._id}`, payload)
        .then(() => {
          dispatch("getAllProjects");
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateShareCount({ commit, dispatch }, payload) {
      // console.log('Shared Project Shared',payload)
      payload.shareCount = payload.shareCount + 1;
      // console.log('Shared Project Shared2',payload)
      api
        .put(`projects/${payload._id}`, payload)
        .then(() => {
          dispatch("getAllProjects");
        })
        .catch(err => {
          console.log(err);
        });
    },
    cloneProject({ commit, dispatch }, payload) {
      console.log("Hello Before", payload);
      payload.forkCount = payload.forkCount + 1;
      api.put(`projects/${payload._id}`, payload).catch(err => {
        console.log(err);
      });
      var clonedProject = JSON.parse(JSON.stringify(payload));
      clonedProject.originalProjectId = clonedProject._id;
      clonedProject.originalCreatedAt = clonedProject.createdAt;
      clonedProject.originalProjectCreatorId = clonedProject.userId;
      clonedProject.title = clonedProject.title + " Forked";
      clonedProject.forkCount = 0;
      clonedProject.shared = false;
      clonedProject.shareCount = 0;
      clonedProject.createdAt = Date.now();
      delete clonedProject._id;
      delete clonedProject.userId;
      console.log("hello after", clonedProject);
      var updatedProject = {};
      var newTrackIds = [];
      var newTracks = [];
      api
        .post("projects", clonedProject)
        .then(res => {
          var updatedProject = res.data;
          var tracks = updatedProject.trackIds;
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            api
              .get(`/tracks/${track}`)
              .then(res => {
                var clonedTrack = res.data;
                delete clonedTrack._id;
                clonedTrack.userId = updatedProject.userId;
                clonedTrack.projectId = updatedProject._id;
                api
                  .post("tracks", clonedTrack)
                  .then(res => {
                    delete clonedProject.trackIds;
                    newTrackIds.push(res.data._id);
                    newTracks.push(res.data);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          }
          clonedProject.tracksIds = newTrackIds;
          commit("setActiveProject", clonedProject);
          commit("setActiveTracks", newTracks);
          commit("addUserProject", clonedProject);
          router.push({
            name: "Home"
          });
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
          // console.log("allUserProjects", allUserProjects);

          allUserProjects.sort((projA, projB) => {
            return projB.createdAt - projA.createdAt;
          });
          var lastCreatedProject = allUserProjects[0];
          commit("setActiveProject", lastCreatedProject);

          api(`projects/${lastCreatedProject._id}/tracks`)
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

    saveProject({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        api
          .put(`projects/${data.project._id}`, data.project)
          .then(res => {
            var savedProject = res.data.data;
            console.log("saved project", savedProject);
            commit("setActiveProject", savedProject);
            commit("setActiveTracks", []);

            var tracks = data.tracks;
            var updatePromises = [];
            tracks.forEach((track, i) => {
              updatePromises[i] = api
                .put(`tracks/${track._id}`, track)
                .then(res => {
                  var updatedTrack = res.data.data;
                  commit("pushActiveTrack", updatedTrack);
                });
            });

            Promise.all(updatePromises)
              .then(() => {
                resolve();
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },

    updateProject({ commit, dispatch }, updatedProject) {
      api
        .put(`projects/${updatedProject._id}`, updatedProject)
        .then(res => {
          var updatedProject = res.data.data;
          commit("setActiveProject", updatedProject);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTrack({ commit, dispatch }, updatedTrack) {
      api.put(`tracks/${updatedTrack._id}`, updatedTrack).then(res => {
        var updatedTrack = res.data.data;
        commit("updateActiveTrack", updatedTrack);
      });
    },

    setPreviewTracks({ commit, dispatch }, trackIds) {
      return new Promise((resolve, reject) => {
        commit("setPreviewTracks", []);

        var fetchPromises = [];
        trackIds.forEach((trackId, i) => {
          fetchPromises[i] = api.get(`tracks/${trackId}`).then(res => {
            var fetchedTrack = res.data;
            commit("pushPreviewTrack", fetchedTrack);
          });
        });

        Promise.all(fetchPromises)
          .then(() => {
            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    getUsersById({ commit, dispatch }, userIds) {
      return new Promise((resolve, reject) => {
        var activeProjectUsers = [];

        var fetchPromises = [];
        userIds.forEach((userId, i) => {
          fetchPromises[i] = api.get(`users/${userId}`).then(res => {
            var fetchedUser = res.data;
            // console.log("fetchedUsers", fetchedUser);
            activeProjectUsers.push(fetchedUser);
          });
        });

        Promise.all(fetchPromises)
          .then(() => {
            commit("activeProjectUsers", activeProjectUsers);
            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },

    searchProjects({ commit, dispatch }, query) {
      // Clear previous search results, if any
      commit("setSearchResults", []);
      var newResults = [];

      // Search by project title. (Can be a fragment)
      api
        .get(`projects/search/title/${query}`)
        .then(res => {
          var searchResults = res.data;
          newResults = newResults.concat(searchResults);

          // Search by project description. (Can be a fragment)
          api
            .get(`projects/search/description/${query}`)
            .then(res => {
              var searchResults = res.data;
              newResults = newResults.concat(searchResults);

              // Search by project owner's username. (Can be a fragment)
              api
                .get(`projects/search/username/${query}`)
                .then(res => {
                  var searchResults = res.data;
                  newResults = newResults.concat(searchResults);

                  // Remove any duplicates from the results
                  newResults = newResults.reduce((resultA, resultB) => {
                    var resultIds = resultA.map(each => each._id);
                    if (!resultIds.includes(resultB._id)) {
                      return resultA.concat(resultB);
                    }
                    return resultA;
                  }, []);

                  commit("setSearchResults", newResults);
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
    setPreviewProject({ commit, dispatch }, sharedProject) {
      commit("setPreviewProject", sharedProject);
    },
    setPlayingProjectId({ commit, dispatch }, projectId) {
      commit("setPlayingProjectId", projectId);
    }
  }
});
