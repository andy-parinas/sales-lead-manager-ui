<template>
    <v-icon :color="icon.color">
        {{ icon.icon }}
    </v-icon>
</template>

<script>
    export default {
        name: "DocumentIcon",
        props: {
            documentType: {required: true, type: String}
        },
        computed: {
            icon(){
                switch (this.documentType) {
                    case 'docx':
                        return {icon: 'mdi-microsoft-word', color: 'blue'};
                    case 'doc':
                        return {icon: 'mdi-microsoft-word', color: 'blue'};
                    case 'xlsx':
                        return {icon: 'mdi-microsoft-excel', color: 'green'};
                    case 'xls':
                        return {icon: 'mdi-microsoft-excel', color: 'green'};
                    case 'pdf':
                        return {icon: 'mdi-file-pdf-box', color: 'red'};
                    case 'txt':
                        return {icon: 'mdi-note-text-outline', color: 'grey'};
                    case 'pptx':
                        return {icon: 'mdi-microsoft-powerpoint', color: 'orange darken-4'};
                    case 'ppt':
                        return {icon: 'mdi-microsoft-powerpoint', color: 'orange darken-4'};
                    case 'one':
                        return {icon: 'mdi-microsoft-onenote', color: 'red'};
                    default:
                        return {icon: 'mdi-file-outline', color: 'grey'};
                }
            }
        }
    }
</script>

<style scoped>

</style>