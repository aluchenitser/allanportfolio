/* ------ article names ------ */
let articleNames = [
    "about_me_10_23_20",
    "css_variables_10_23_20"
]

/* ------ create article components ------ */
articleNames.forEach(name => {
    Vue.component(name, 
    { 
        name, 
        template: `#${name}`
    })
})

/* ------ main article components ------ */

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
<div class='entry'>
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
        }
    },
    watch: {
        selectedArticle: function() {

            Vue.nextTick(() => {
                Prism.highlightAll();
            })
        }
    },
    methods: {
        selectArticle() {
            
        }
    }
})