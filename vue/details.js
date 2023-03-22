const { createApp } = Vue
const app = createApp({
    data() {
        return {
            params: '',
            idEvento: '',
            id: '',
        };
    },
    created() {
        fetch('https://api-amazingevents.onrender.com/api/amazing-events')
            .then(response => response.json())
            .then(events => {
                this.params = new URLSearchParams(location.search);
                this.id = this.params.get('id');
                this.idEvento = events.events.find(evento => evento.id == this.id);
            })
            .catch(error => console.log(error))
    },
})

app.mount('#main')