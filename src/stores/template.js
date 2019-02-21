import axios from "axios";

export default {
    namespaced: true,
    state: {
        dark: false,
        isMenuVisible: false,
        showMenu: false,
        user: null
    },
    mutations: {
        setIsMenuVisible(state, isVisible) {
            state.isMenuVisible = isVisible
        },
        setShowMenu(state, show) {
            state.showMenu = show
        },
        setUser(state, user) {
            state.user = user
        },
        setDark(state, dark) {
            state.dark = dark
        }
    },
    actions: {
        setIsMenuVisible(context, isVisible) {
            context.commit("setShowMenu", false)

            if (!context.getters.hasUser)
                context.commit("setIsMenuVisible", false)
            else
                context.commit("setIsMenuVisible", (isVisible === undefined) ? !context.getters.isMenuVisible : isVisible)

        },
        setShowMenu(context, show) {
            if (!context.getters.hasUser)
                context.commit("setShowMenu", false)
            else
                context.commit("setShowMenu", (show === undefined) ? !context.getters.showMenu : show)
        },
        setUser(context, user) {
            context.commit("setUser", user)
            if (user){
                axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
                context.dispatch("setIsMenuVisible", true)
            } else {
                delete axios.defaults.headers.common["Authorization"]
                context.dispatch("setIsMenuVisible", false)
            }
        },
        setDark(context, dark) {
            if (!context.getters.hasUser)
                context.commit("setDark", false)
            else
                context.commit("setDark", (dark === undefined) ? !context.getters.dark : dark)
        },
    },
    getters: {
        isMenuVisible(state) {
            return state.isMenuVisible
        },
        showMenu(state) {
            return state.showMenu;
        },
        dark(state) {
            return state.dark;
        },
        hasUser(state) {
            return state.user != null
        },
        userEmail(state) {
            return (state.user && state.user.email) ? state.user.email : ""
        },
        userFirstName(state) {
            return (state.user && state.user.name) ? state.user.name.split(" ")[0] : ""
        },
        userLastName(state) {
            return (state.user && state.user.name) ? state.user.name.split(" ").splice(1, 1).join(" ") : ""
        }
    }
}