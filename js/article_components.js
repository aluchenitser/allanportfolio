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
        'index': String,
        'child': Boolean,
        'offset': String
    },
    computed: {
        childClass() {
            return this.child == true ? "child" : null
        }
    },
    template: `
<div class='z-box' :class="childClass" :style="{ 'z-index': index, position: position, 'left': offset }">
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
            slider: this.sliderStart || 0,
            z_parent_1: null,
            z_child_1: null,
            z_parent_2: null,
            z_child_2: null,
        }
    },
    template: `
<div class='z-box-display'>
    <span class="uber-parent">&lt;body&gt;</span>
    <div class="centering-wrap">
        <div class="top">
            <div class="z-controls">
                <div class="box-1-child-z">z-index <div class="wrap"><input type="number" v-model="z_child_1" /> <button @click="z_child_1 = null">⦰</button></div></div>
                <div class="box-1-parent-z mb-20">z-index <div class="wrap"><input type="number" v-model="z_parent_1" /> <button @click="z_parent_1 = null">⦰</button></div></div>
                <div class="box-2-child-z">z-index <div class="wrap"><input type="number" v-model="z_child_2" /> <button @click="z_child_2 = null">⦰</button></div></div>                
                <div class="box-2-parent-z">z-index <div class="wrap"><input type="number" v-model="z_parent_2" /> <button @click="z_parent_2 = null">⦰</button></div></div>
            </div>
            
            <div class="figure">
                <div class="boxes">
                    <z-box class="box-1" position="relative" :index="z_parent_1" >
                        <z-box class="box-1-child" :child="true" position="relative" :index="z_child_1" ></z-box>
                    </z-box>
                    <z-box
                    class="box-2"
                    position="relative"
                    :index="z_parent_2"
                    :offset="slider + 'px'"
                    >
                        <z-box class="box-2-child" :child="true" position="relative" :index="z_child_2" ></z-box>
                    </z-box>
                </div>
                <div class="slider">
                        <input type="range" min="-150" max="50" v-model="slider">
                </div>
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