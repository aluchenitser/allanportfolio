/* ------ article names ------ */
let articleNames = [
    "css_variables_10_23_20",
    "about_me_10_23_20",
    "magnetic_mobile_11_24_20"
]

/* ------ create article components ------ */
articleNames.forEach(name => {
    Vue.component(name, 
    { 
        name, 
        template: `#${name}`
    })
})

/* ------ major page components ------ */
let articleNamesObj = {}
articleNames.forEach(name => {
    articleNamesObj[name] = name
})

Vue.component('article-entry', {
    /*
        head:           header text
        date:           date as plain text
    */
    props: ['head', 'date'],
    components: articleNamesObj,
    template: `
<div class='entry' :id="$parent.$options.name">
    <h1 @click="$parent.$emit('chosen', $parent.$options.name)">{{ head }}</h1>
    <slot></slot>
    <div class="meta">{{ date }}</div>
    <hr>    
</div>
`
})

/* ------ vuejs application ------ */
var app = new Vue({
    el: "#container",
    data() {
        return {
            selectedArticle: false,
            articleNames: articleNames, 
            currentRoute: window.location.href
        }
    },
    methods: {
        selectArticle(articleName, option) {

            this.selectedArticle = articleNames.includes(articleName)
                ? articleName
                : false

            let route = [false, undefined].includes(this.selectedArticle)
                ? ''
                : '#' + this.selectedArticle

            switch(option) {
                case "pageload": 
                case "popstate":
                    history.replaceState("", "", `${location.origin}${location.pathname}${route}`)
                    break;
                default: 
                    history.pushState("", "", `${location.origin}${location.pathname}${route}`)
            }

            scrollTo(0,0)

            // updates syntax highlighting upon component / route change (Prism seems to require this)
            Vue.nextTick(() => {
                Prism.highlightAll();
            })
        },
        goHome() {
            this.selectArticle(false)
        }
    },
    mounted() {

        /* --- front end router --- */
        let loadRoute = option => {
            let route = location.hash.substring(1)
            this.selectArticle(route, option)
        }

        loadRoute("pageload");
        
        window.addEventListener('popstate', e => {

            // setTimout is deliberate, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
            setTimeout(() => {
                loadRoute("popstate");
            }, 0)
        })
    }
})