<template>
	<v-card hover v-bind:to="disabled ? '' : team.to" class="fill-height overflow-hidden">
		<v-card-text class="ml-1 headline font-weight-bold">
			<v-icon big left>settings_overscan</v-icon>
			{{ team.name }}
		</v-card-text>

		<v-card-actions>
			<v-list-tile class="grow">
				<v-list-tile-avatar>
					<Gravatar v-bind:email="team.user.email" alt="User"/>
				</v-list-tile-avatar>

				<v-list-tile-content>
					<v-list-tile-title>{{ team.user.name }}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-btn v-if="team.isOwner" v-bind:disabled="disabled" v-on:click.prevent="onSettingsClick()" flat class="mr-0">
				<v-icon>settings</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import Gravatar from 'vue-gravatar';

export default {
    components: {
		Gravatar,
    },
    props: {
		team: {type: Object, required: true},
		disabled: {type: Boolean, default: false}
	},
	methods:{
		onSettingsClick() {
			this.$emit("settingsClick", this.team);
		}
	}
}
</script>

<style>

</style>
