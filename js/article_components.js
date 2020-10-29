/* ------ article names ------ */
let articleNames = [
    "css_variables_10_23_20",
    "about_me_10_23_20",
    "z_indexing_10_25_20"
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


/* ------ autonomous components ------ */
Vue.component('z-box', {
    props: {
        'position': String, 
        'index': Number,
        'color': String,
        'child': Boolean,
        'offset': String
    },
    computed: {
        childClass() {
            return this.child == true ? "child" : null
        }
    },
    template: `
<div class='z-box' :class="childClass" :style="{ 'z-index': index, position: position, 'background-color': color, 'left': offset }">
    <div class="wrap">
        <span class="z-value">z-index: {{ index || "auto"}}</span><br />
        <span class="position"">pos: {{ position }}</span>
    </div>
    <slot></slot>
</div>
`
})

Vue.component('z-box-display', {
    props: {
        "sliderStart": Number
    },
    data() {
        return {
            slider: this.sliderStart || 0
        }
    },
    mounted() {
        this.$on("slider", emit => {
            console.log(emit)
        })
    },
    template: `
<div class='z-box-display'>
    <div class="centering-wrap">
        <div class="top">
            <div class="z-controls left-controls">
                <label class="box-1-parent-z">z-index<br /><input type="number" /> </label>
                <label class="box-1-child-z">z-index<br /><input type="number" /> </label>
            </div>
            
            <div class="center">
                <z-box class="box-1" position="relative" color="pink">
                    <z-box class="box-2-child" :child="true" position="relative" color="#C0FFF4"></z-box>
                </z-box>
                <z-box
                class="box-2"
                position="relative"
                color="lightgreen"
                :offset="slider + 'px'"
                style="margin-top: 25px;"
                >
                    <z-box class="box-2-child" :child="true" position="relative" color="#feffc6"></z-box>
                </z-box>
            </div>

            <div class="z-controls right-controls">
                <label class="box-2-parent-z">z-index<br /><input type="number" /> </label>
                <label class="box-2-child-z">z-index<br /><input type="number" /> </label>
            </div>
        </div>
        <div class="bottom">
            <div class="slider">
                    <input type="range" min="-150" max="50" v-model="slider">
            </div>
        </div>
    </div>
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

            // updates syntax highlighting for code shown in html
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