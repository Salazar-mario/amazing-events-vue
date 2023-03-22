const { createApp } = Vue
const url = 'https://api-amazingevents.onrender.com/api/amazing-events'

const app = createApp({
    data(){         /* funcion que define los estados (propiedades reactivas) de la aplicación */
        return {
            name: "",
            email: "",
            message: "",
        }
    },
    methods: {      /* objeto con todos los métodos que necesita la app (fetch/filter/etc) */
        captureData() {
            console.log({
                name: this.name,
                email: this.email,
                message: this.message,
            })
            alert('Thank you for contacting us, we will contact you shortly '+this.name)
        }
    }
})

app.mount("#main")