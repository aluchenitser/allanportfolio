magneticMobile = {
    isMallotDown: false,
    isStarted: false,
    gameInterval: null,
    timer: 0,

    scores: {
        friend: 0,
        foe: 0
    },

    rodArray: ['trump', 'peterson', 'allan', 'shapiro'],

    load() {
        this.loadElements()
        this.animateCursor()
        this.bonkMechanics()

        this.startButtonElement.addEventListener("click", el => {
            this.start(); 
        })
    },
    start() {

        // ready and clear the game
        this.isStarted = true
        clearInterval(this.gameInterval)

        // dim start button and lower all the heads
        this.startButtonElement.classList.add("started")
        this.imageElements.forEach(el => el.classList.add("down"))

        // game loop
        this.timer = 45
        this.timerElement.innerHTML = this.timer

        this.gameInterval = setInterval(() => {
            this.timerElement.innerHTML = --this.timer

            if(this.timer === 0) {
                clearInterval(this.gameInterval)
                this.end();
            }
        }, 1000)

        let level = 1                       // higher level means faster pop-ups and more simultaneous heads


        console.log("pre - loop")

        let self = this

        setTimeout(function loop() {
            console.log("loop")

            if(self.isStarted === false) return;

            self.getRandom(self.rodElements, Math.ceil(Math.random() * level)).forEach(el => {
                el.classList.remove("down")
            })

            setTimeout(loop, Math.ceil(Math.random() * (4 - level) * 1000))

        }, Math.ceil(Math.random() * (4 - level) * 1000))
        
    },
    end() {

    },
    popRods(num) {
        this.rodElements.forEach((el, idx) => {
            el.className = el.classList.contains("down")
                ? "image down" + this.rodArray[idx]
                : "image " + this.rodArray[idx]
        })
    },

    addPointFoe() {
        this.scores.friend++

    },
    addPointFriend() {

    },
    animateCursor() {
        // stylized, animated mouse pointer
        this.holesElement.addEventListener("mousedown", e => {
            this.isMallotDown = true;
            
            this.holesElement.classList.add("down-mallot")
            setTimeout(() => {
                this.isMallotDown = false
                this.holesElement.classList.remove("down-mallot")
            }, 300)
        })
    },

    // consequences of bonks
    bonkMechanics() {
        this.holesElement.addEventListener("click", e => {
            let classList = e.target.classList

            // register if the element is an image and is upright
            if(classList.contains("image") === false || classList.contains("down") === true) return;
            
            
            // hit a dimwit
            if(this.isStarted && classList.contains("allan") === false) {
                console.log("bonked dimwit")
                this.addPointFriend()
                classList.add("down")
            }
            
            // hit Allan
            else if(this.isStarted) {
                console.log("bonked Allan")
                this.addPointFoe()
            }

            // pre-game bonk for funsies
            else {
                setTimeout(() => {
                    classList.remove("down")
                }, 1000)
            }
        })
    },
    shuffleRods() {
        // shuffle the image array with Fisher-Yates
        const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
        this.rodArray.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] );

        this.rodElements.forEach((el, idx) => {
            el.className = el.classList.contains("down")
                ? "image down" + this.rodArray[idx]
                : "image " + this.rodArray[idx]
        })

    },
    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    },
    loadElements() {
        this.gameElement            = document.getElementById("magnetic_mobile_11_24_20")
        
        this.holesElement           = this.gameElement.querySelector(".holes")
        this.rodElements            = this.holesElement.querySelectorAll(".image")
        this.imageElements          = this.gameElement.querySelectorAll(".rod .image")

        this.startButtonElement     = this.gameElement.querySelector(".start-stop button")
       
        this.friendlyElement        = this.gameElement.querySelector("#friendly_score")
        this.foeElement             = this.gameElement.querySelector("#foe_score")
        this.timerElement           = this.gameElement.querySelector("#timer_value")
    },    
}