import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		primary: colors.indigo.darken4,
		// secondary: colors.teal.lighten1,
		// accent: colors.green,
		// error: '#FF5252',
		// info: '#2196F3',
		// success: '#4CAF50',
		// warning: '#FFC107'
	}
})
