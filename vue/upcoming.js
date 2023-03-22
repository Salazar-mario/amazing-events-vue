const {createApp} = Vue
const app = createApp({
    data(){
        return{
            eventosFuturos : [],
            fecha:  undefined,
            categorias : [],
            checked : [],
            valueBusqueda: '',
            filtradasFuturo: []
        }
    },
    created(){
        fetch('https://api-amazingevents.onrender.com/api/amazing-events')
        .then(Response => Response.json())
        .then(({ events , currentDate })  => {
            this.fecha = currentDate
            this.eventosFuturos = events.filter(evento => evento.date > this.fecha)
            this.categorias = [...new Set(events.map(event => event.category))]
            this.filtradasFuturo = events.filter(evento => evento.date > this.fecha)
        })
    },
    methods: {
        filtro(){
            this.filtradasFuturo = this.eventosFuturos.filter( evento => {
                return evento.name.toLowerCase().includes(this.valueBusqueda.toLowerCase())
                && (this.checked.includes(evento.category) || this.checked.length === 0)
            })
        },
    },
})
        
app.mount('#main')