<template>
    <v-menu
            v-model="startDateMenu"
            ref="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    prepend-icon="event"
                    :value="startDateFormattedDatefns"
                    :rules="required ? [v => !!v || 'This field is required'] : []"
                    :label="label"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                v-model="formDate"
                @input="startDateMenu = false"
                @change="dateSelected"
        ></v-date-picker>
    </v-menu>
</template>

<script>
    import {format, parseISO} from "date-fns";

    export default {
        name: "DateSelectField",
        props: ['required', 'label'],
        data(){
            return {
                startDateMenu: false,
                formDate: ''
            }
        },
        computed: {
            startDateFormattedDatefns(){
                return this.formDate ? format(parseISO(this.formDate), 'dd/MM/yyyy') : ''
            }
        },
        methods: {
            dateSelected(){
                this.$emit('onDateSelected', this.formDate)
            }
        }
    }
</script>

<style scoped>

</style>