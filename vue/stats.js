const{ createApp } = Vue

createApp({
    data(){
        return {
            eventos: [],
            granCapacidad: {},
            bajaAsistencia: {},
            altaAsistencia: {},
            tablaFuturos: [],
            tablaPasados : [],
        }
    },
    created(){
        fetch('https://api-amazingevents.onrender.com/api/amazing-events')
        .then(response => response.json())
        .then(events => {
            this.eventos = events.events
            this.tabla1()
            this.categoriasStats(this.eventos.filter(evento => evento.estimate), this.tablaFuturos)
            this.categoriasStats(this.eventos.filter(evento => evento.assistance), this.tablaPasados)
        })
        .catch(error => console.log(error))
    },
    methods: {
        acumulador(eventList){
            let acumulado = {'revenues': 0, 'arrayPorcentaje': [], 'porcentaje': 0}
            let porcentajeTotal = 0
            let contador = 0;

            eventList.forEach(evento => {
                acumulado.revenues += (evento.estimate ? evento.estimate : evento.assistance) * evento.price;
                acumulado.arrayPorcentaje.push(((evento.estimate ? evento.estimate : evento.assistance) * 100 / evento.capacity));

                porcentajeTotal += acumulado.arrayPorcentaje[contador];
                contador ++;
            });
            acumulado.porcentaje = Number(porcentajeTotal / acumulado.arrayPorcentaje.length).toFixed(1);
            return acumulado;
        },
        categoriasStats: function (eventos, lista){
            let categorias = Array.from(new Set (eventos.map(evento => evento.category).sort()))
            categorias.forEach(category => {
                let categoriasTablas = this.acumulador(eventos.filter(evento => evento.category === category))
                categoriasTablas.name = category
                lista.push(categoriasTablas)
            } )
        },
        tabla1: function(){
            this.granCapacidad = this.eventos.sort((evento,evento2) => evento2.capacity - evento.capacity)[0]
            this.eventos.forEach(evento => evento.percent = Number(evento.assistance * 100 / evento.capacity).toFixed(1))
            let asistenciaEvento = this.eventos.filter(evento => evento.assistance).sort((evento,evento2) => evento.percent - evento2.percent)
            this.bajaAsistencia = asistenciaEvento[0]
            this.altaAsistencia = asistenciaEvento[asistenciaEvento.length - 1]
        }
    }
})
.mount('#main')