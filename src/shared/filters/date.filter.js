import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', dateValue => moment(dateValue).format('DD/MM/YYYY'))
