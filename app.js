const { createApp } = Vue
const url = 'https://api-amazingevents.onrender.com/api/amazing-events'
const urlUpcoming = 'https://api-amazingevents.onrender.com/api/amazing-events?time=upcoming'

const app = createApp({
    data() {
        return {
            eventos: [],
            categories: [],
            eventosFuturos: []
        }
    },
    created() {
        this.fetchApi()

    },
    methods: {
        async fetchApi() {
            try {
                let response = await fetch(url)
                response = await response.json()
                this.eventos = response.events
                this.categories = [...new Set((response.events).map(each => each.category))].sort()
                let responseUpcoming = await fetch(urlUpcoming)
                responseUpcoming = responseUpcoming.json
                this.eventosFuturos = responseUpcoming.events
            } catch (error) {
                console.log(error)
            }
        }
    }
})

app.mount("#app")  