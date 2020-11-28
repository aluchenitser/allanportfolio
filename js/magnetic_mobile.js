magneticMobile = {
    isMallotDown: false,
    gameInterval: null,

    startButtonElement: null,
    
    rodElements: null,
    rodArray: ['trump', 'peterson', 'allan', 'shapiro'],

    load: function() {
        /* --- elements --- */
        const holesElement          = document.querySelector("#magnetic_mobile_11_24_20 .holes")
        this.rodElements         = holesElement.querySelectorAll(".image")

        this.startButtonElement     = document.querySelector("#magnetic_mobile_11_24_20 .start-stop button")
        
        /* --- logic --- */

        // stylized, animated mouse pointer
        holesElement.addEventListener("mousedown", e => {
            this.isMallotDown = true;
            
            holesElement.classList.add("down-mallot")
            setTimeout(() => {
                this.isMallotDown = false
                holesElement.classList.remove("down-mallot")
            }, 300)

        })

        // bonk when clicking on image surface
        holesElement.addEventListener("click", e => {
            if(e.target.className.includes("image")) {
                e.target.classList.add("down")

                setTimeout(() => {
                    e.target.classList.remove("down")
                }, 1000)
            }
        })

        // start game
        this.startButtonElement.addEventListener("click", el => {
            this.start(); 
        })

    },
    start: function() {
        clearInterval(this.gameInterval)
        this.startButtonElement.classList.add("started")

        /* --- elements --- */
        const gameElement       = document.getElementById("magnetic_mobile_11_24_20")
        
        const friendlyElement   = gameElement.querySelector("#friendly_score")
        const foeElement        = gameElement.querySelector("#foe_score")
        const timerElement      = gameElement.querySelector("#timer_value")
        const heads_elements    = gameElement.querySelectorAll(".rod .image")


        /* --- logic --- */
        heads_elements.forEach(el => el.classList.add("down"))

        let timer = 45
        timerElement.innerHTML = timer

        this.gameInterval = setInterval(() => {
            timerElement.innerHTML = --timer

            if(timer === 0) {
                clearInterval(this.gameInterval)
                this.end();
            }

            this.shuffle()
        }, 1000)
        
    },
    end() {

    },
    shuffle: function() {

        // shuffle the image array with Fisher-Yates
        const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
        this.rodArray.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

        this.rodElements.forEach((el, idx) => {
            el.className = el.classList.contains("down")
                ? "image " + this.rodArray[idx]
                : "image " + this.rodArray[idx]
        })

    }
}