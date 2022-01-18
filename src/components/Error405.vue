<template>
    <v-container>
        <h1>Error 405</h1>
        <v-alert
        prominent
        type="error"
        >
        <div style="float: left;">Vous n'avez pas les droits pour visiter cette page ! </div>
            
            <v-btn style="float: right;" @click="$router.push('/')">Se connecter</v-btn>
        
        </v-alert>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>