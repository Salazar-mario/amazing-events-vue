const { createApp } = Vue
const app = createApp({
    data() {
        return {
            eventosPasados: [],
            fecha: undefined,
            categorias: [],
            checked: [],
            eventosFiltrados: [],
            valueBusqueda: '',
            filtradasPasado: []
        }
    },
    created() {
        fetch('https://api-amazingevents.onrender.com/api/amazing-events')
            .then(Response => Response.json())
            .then(({ events, currentDate }) => {
                this.fecha = currentDate
                this.eventosPasados = events.filter(evento => evento.date < this.fecha)
                this.categorias = [...new Set(events.map(event => event.category))]
                this.filtradasPasado = events.filter(evento => evento.date < this.fecha)
            })
    },
    methods: {
        filtro() {
            this.filtradasPasado = this.eventosPasados.filter(evento => {
                return evento.name.toLowerCase().includes(this.valueBusqueda.toLowerCase())
                    && (this.checked.includes(evento.category) || this.checked.length == 0)
            })
        },
    },
})

app.mount('#main')