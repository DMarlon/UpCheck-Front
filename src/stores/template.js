import axios from "axios";
import { userKey } from "@/constants.js"

export default {
    namespaced: true,
    state: {
        dark: true,
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
                context.commit("setIsMenuVisible", false)
            else
                context.commit("setShowMenu", (show === undefined) ? !state.showMenu : show)
        },
        setUser(context, user) {
            context.commit("setUser", user)
            if (user){
                console.log("ver isto com paulo")
                axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
                context.dispatch("setIsMenuVisible", true)
            } else {
                delete axios.defaults.headers.common["X-Authorization"]
                context.dispatch("setIsMenuVisible", false)
            }
        }
    },
    getters: {
        isMenuVisible(state) {
            return state.isMenuVisible
        },
        showMenu(state) {
            return state.showMenu;
        },
        hasUser(state) {
            return state.user != null
        },
        userFirstName(state) {
            return (state.user.name) ? state.user.name.split(" ")[0] : ""
        }
    }
}