magneticMobile = {
    bonkIncrementor: 1,
    isMallotDown: false,

    load() {
        this.loadElements()
        this.animateCursor()
        this.bonkMechanics()
    },
    
    // stylized, animated mouse pointer
    animateCursor() {
        this.holesElement.addEventListener("mousedown", e => {
            this.isMallotDown = true;
            
            this.holesElement.classList.add("down-mallot")
            setTimeout(() => {
                this.isMallotDown = false
                this.holesElement.classList.remove("down-mallot")
            }, 300)
        })
    },

    // to bonk or not to bonk
    bonkMechanics() {
        this.holesElement.addEventListener("click", e => {
            let classList = e.target.classList

            // the clicked element must be an .image element and the dimwit shouldn't already be stuffed
            if(classList.contains("image") === false || classList.contains("down") === true) return;
        
            this.bonkAnimate(e)

            // stuff the bonked dimwint into the hole, temporarily
            classList.add("down")

            setTimeout(() => {
                classList.remove("down")
            }, 500)
        })
    },

    // bonk explosion graphic. up to 3 simultaneous bonks.
    bonkAnimate(event) {
        let e = event

        let element = this.bonkArray[this.bonkIncrementor++]
        if(this.bonkIncrementor == 3) this.bonkIncrementor = 0

        element.style.left = e.pageX + "px"
        element.style.top = e.pageY + 30 + "px"
        element.style.display = "block"

        setTimeout(() => {
            element.style.display = "none"
        }, 300)
        
    },
    loadElements() {
        this.gameElement            = document.getElementById("magnetic_mobile_11_24_20")
        
        this.holesElement           = this.gameElement.querySelector(".holes")
        this.rodElements            = this.holesElement.querySelectorAll(".image")
        this.imageElements          = this.gameElement.querySelectorAll(".rod .image")

        this.startButtonElement     = this.gameElement.querySelector(".start-stop button")
       
        this.friendElement          = this.gameElement.querySelector("#friendly_score")
        this.foeElement             = this.gameElement.querySelector("#foe_score")
        this.timerElement           = this.gameElement.querySelector("#timer_value")

        this.bonkArray              = document.querySelectorAll("[id^=bonk]")
    }
}