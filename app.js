const app = new Vue({
    el: '#app',
    data() {
        return {
            API_URL: 'https://api.openweathermap.org/data/2.5/weather',
            API_TZ_URL: 'https://api.timezonedb.com/v2.1/get-time-zone',
            API_TZ_KEY: '0WC8UY90VR2P',
            API_KEY: '2b0c1c873e8b7bb21e4332b8f0c8bd86',
            showWeatherInfo: false,
            showMainText: true,
            search: '',
            weatherData: null,
            lat: null,
            lon: null,
            date: null,
            timeInfo: null
        }
    },
    computed: {
        bgClass() {
            if (this.weatherData) {
                if (this.weatherData.weather[0].icon.endsWith('n')) {
                    return 'bg-night'
                } else {
                    return 'bg-day'
                }
            }
        },
        iconDay() {
            if (this.weatherData) {
                if (this.weatherData.weather[0].icon.endsWith('n')) {
                    return '/img/icon-moon.svg'
                } else {
                    return '/img/icon-sun.svg'
                }
            }
        }
    },
    methods: {
        getLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                console.log('position: ', position)
                this.lat = position.coords.latitude
                this.lon = position.coords.longitude
                this.getWeatherByCoords()
                this.getTimeZoneSearch()
            })
        },
        getTimeZoneSearch() {
            axios
                .get(`${this.API_TZ_URL}?key=${this.API_TZ_KEY}&format=json&by=position&lat=${this.lat}&lng=${this.lon}`)
                .then((response) => {
                    console.log(response.data.formatted)
                    this.timeInfo = response.data.formatted
                })
        },
        getTimeZone() {
            axios
                .get(`${this.API_TZ_URL}?key=${this.API_TZ_KEY}&format=json&by=position&lat=${this.weatherData.coord.lat}&lng=${this.weatherData.coord.lon}`)
                .then((response) => {
                    console.log(response.data.formatted)
                    this.timeInfo = response.data.formatted
                })
        },
        getWeatherByCoords() {
            axios
                .get(`${this.API_URL}?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}&lang=es&units=metric`)
                .then((response) => {
                    this.weatherData = response.data
                    console.log(this.weatherData)
                })
        },
        getWeatherBySearch() {
            axios
                .get(`${this.API_URL}?q=${this.search}&appid=${this.API_KEY}&lang=es&units=metric`)
                .then((response) => {
                    this.weatherData = response.data
                    console.log(this.weatherData)
                    this.getTimeZone()

                })
            this.search = ''
        },
    }
})
