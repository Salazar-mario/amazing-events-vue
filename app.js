const { createApp } = Vue
const url = 'https://api-amazingevents.onrender.com/api/amazing-events'

const app = createApp({
    data() {
        return {
            eventos: [],
            fecha: undefined,
            categorias: [],
            checked: [],
            eventosFiltrados: [],
            valueBusqueda: '',
        }
    },
    created() {
        this.fetchApi(),
            this.filtro()

    },
    methods: {
        async fetchApi() {
            try {
                let response = await fetch(url)
                response = await response.json()
                this.eventos = response.events
                this.eventosFiltrados = response.events
                this.categorias = [...new Set(response.events.map(event => event.category))]
            } catch (error) {
                console.log(error)
            }
        },

        async filtro() {
            try {
                if (this.eventos.length == 0) {
                    this.eventosFiltrados = [{}, {}]
                }
                else {
                    let filtradoBusqueda = this.eventos.filter(evento => evento.name.toLowerCase().includes(this.valueBusqueda.toLowerCase()))
                    let filtrarChecks = filtradoBusqueda.filter(evento => this.checked.includes(evento.category) || this.checked.length == 0)
                    this.eventosFiltrados = filtrarChecks
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})

app.mount("#app")  