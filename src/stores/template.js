import axios from "axios";

export default {
    namespaced: true,
    state: {
        dark: false,
        isMenuVisible: false,
        showMenu: false,
        miniMenu: false,
        user: null,
        pageTitle: ""
    },
    mutations: {
        setIsMenuVisible(state, isVisible) {
            state.isMenuVisible = isVisible
        },
        setShowMenu(state, show) {
            state.showMenu = show
        },
        setMiniMenu(state, mini) {
            state.miniMenu = mini
        },
        setUser(state, user) {
            state.user = user
        },
        setPageTitle(state, title) {
            state.pageTitle = title
        },
        setDark(state, dark) {
            state.dark = dark
        }
    },
    actions: {
        setIsMenuVisible(context, isVisible) {
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
        setMiniMenu(context, mini) {
            if (!context.getters.hasUser)
                context.commit("setMiniMenu", false)
            else
                context.commit("setMiniMenu", (mini === undefined) ? !context.getters.miniMenu : mini)
        },
        setUser(context, user) {
            context.commit("setUser", user)
            if (user){
                axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
                context.dispatch("setIsMenuVisible", true)
                context.dispatch("setShowMenu", true)
            } else {
                delete axios.defaults.headers.common["Authorization"]
                context.dispatch("setIsMenuVisible", false)
                context.dispatch("setShowMenu", false)
            }
        },
        setPageTitle(context, title) {
            if (!context.getters.hasUser)
                context.commit("setPageTitle", false)
            else
                context.commit("setPageTitle", (title === undefined) ? "" : title)
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
        miniMenu(state) {
            return state.miniMenu;
        },
        dark(state) {
            return state.dark;
        },
        hasUser(state) {
            return state.user != null
        },
        pageTitle(state) {
            return (state.pageTitle) ? state.pageTitle : ""
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