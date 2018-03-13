<template>
    <div class="navbar bgcolor">
        <div class="container-fluid d-flex align-items-center justify-content-between pt-3 pb-2 px-4">
            <div class="col">
                <h1 class="h3 text-light font-weight-bold">beat-locker</h1>
            </div>
            <div class="col">
                <div class="h5 text-light">{{user.name}}</div>
                <button @click='userProfile'>
                    <img src="http://placehold.it/30x30">
                </button>
            </div>
        </div>
        <div class="subNavbar container-fluid row text-light">
            <div class="container-fluid py-3 px-5">

                <div class="homelink SubNavlink col-4 text-center py-3 rounded" @click="home">
                    New Project
                </div>
                <div class="homelink SubNavlink col-4 text-center py-3 rounded" @click="">
                    Explorer
                </div>
                <div class="homelink SubNavlink col-4 text-center py-3 rounded" @click="help">
                    Help
                </div>
                <div class="logout SubNavlink col-4 text-center py-3 rounded" @click="logout">
                    Logout
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logoutUser')
            },
            userProfile() {
                this.$router.push({ path: '/UserProfile' }, 'UserProfile')
            },
            help() {
                this.$router.push('Help')
            },
            home() {
                this.$router.push('Home')
            }
        }
    }
</script>

<style scoped>
    img {
        width: 25px;
        margin-bottom: 0.4rem;
        margin-right: 0.5rem;
        /* align-self: flex-end; */
        /* display: flex; */
    }

    .logout {
        flex-direction: row-reverse;
        align-self: center;
        display: flex
    }

    .menu {
        flex-direction: row;
        align-self: center;
        display: flex
    }

    .bgcolor {
        background-color: #5c5f5f;
    }

    .subNavbar {
        width: 100%;
        padding: 0;
        margin: 0;
        background-color: #717e00;
    }

    .SubNavlink:hover {
        cursor: pointer;
        background-color: #fad815;
    }

    img {

        border-radius: 250px;
        background: black;
        padding: 2px;
        width: 100px;
        height: 100px;
    }
</style>