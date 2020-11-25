magneticMobile = {
    run: function() {
        const gameElement = document.querySelector(".game .holes");
        const holesElement = document.querySelector(".holes")
        
        console.log("mobile m")

        gameElement.addEventListener("mousedown", e => {
            this.isMallotDown = true;
            
            gameElement.classList.add("down-mallot")
            setTimeout(() => {
                this.isMallotDown = false
                gameElement.classList.remove("down-mallot")
            }, 300)

        })

        holesElement.addEventListener("click", e => {
            if(e.target.className.includes("image")) {
                e.target.classList.add("down")

                setTimeout(() => {
                    e.target.classList.remove("down")
                }, 1000)
            }
        })

    },
    isMallotDown: false
}