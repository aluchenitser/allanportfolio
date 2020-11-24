magneticMobile = {
    run: function() {
        const gameElement = document.querySelector(".game .holes");
        
        gameElement.addEventListener("mousedown", e => {
            this.isMallotDown = true;
            
            gameElement.classList.add("down-mallot")
            setTimeout(() => {
                this.isMallotDown = false
                gameElement.classList.remove("down-mallot")
            }, 300)

        })
    },
    isMallotDown: false
}