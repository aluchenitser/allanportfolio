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
        template: `#${name}`,
        methods: {
            squeak() {
                console.log("squeak!")
            }
        }
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
    <h1 @click="$emit('chosen')">{{ head }}</h1>
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
            singleArticle: false,
            articleNames: articleNames, 
            stuff: "stuff stuff stuff stuff stuff"
        }
    },
    methods: {
        squeak(e) {
            console.log("chosen!")
            console.log(e)
        }
    }
})