Vue.component('article-entry', {
    /*
        head:           header text
        date:           date as plain text
    */

    props: ['head', 'date'],
    template: `
<div class='entry'>
    <h1><a href="#">{{ head }}</a></h1>
    <slot></slot>
    <div class="meta">{{ date }}</div>
    <hr>    
</div>
`
})

Vue.component('about_me_10_23_20', {
    template: '#about_me_10_23_20'
})

Vue.component('css_variables_10_23_20', {
    template: '#css_variables_10_23_20'
})