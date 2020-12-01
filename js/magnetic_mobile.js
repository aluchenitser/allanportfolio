magneticMobile = {
    level: 0,
    foe: 0,
    friend: 0,
    gameInterval: null,
    isMallotDown: false,
    isStarted: false,
    rodArray: ['trump', 'peterson', 'allan', 'shapiro'],
    timer: 0,
    bonkIncrementor: 1,

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
        this.level = 1                       // higher lever speeds the rods
        this.isStarted = true
        clearInterval(this.gameInterval)

        // visually dim the start button and lower all the heads
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

        // randomly pop heads
        let self = this
        setTimeout(function loop() {
            if(self.isStarted === false) return;
            if(self.timer < 15) { self.level = 2 }

            self.getRandom(self.rodElements, Math.ceil(Math.random() * self.level)).forEach(el => {
                if(el.classList.contains("down")) {
                    el.classList.remove("down")

                    setTimeout(() => { 
                        console.log("inner", el)
                        el.classList.add("down") 
                    }, randomTime())
                }
            })

            setTimeout(loop, randomTime())

        }, randomTime())
        
        function randomTime() {
            return Math.ceil(Math.random() * (4 - self.level) * 1000)
        }
    },
    end() {
        this.isStarted = false
    },
    addPointFoe() {
        this.foeElement.innerHTML = ++this.foe
    },
    addPointFriend() {
        this.friendElement.innerHTML = ++this.friend
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
                this.addPointFoe()
                this.bonk(e)
                classList.add("down")
            }
            
            // hit Allan
            else if(this.isStarted) {
                console.log("bonked Allan")
                this.addPointFriend()
            }

            // pre-game bonk for funsies
            else {
                this.bonk(e)

                classList.add("down")

                setTimeout(() => {
                    classList.remove("down")
                }, 500)
            }
        })
    },
    bonk(event) {
        let e = event
        
        let element = this.bonkArray[this.bonkIncrementor++]
        if(this.bonkIncrementor == 3) this.bonkIncrementor = 0

        console.log(element)

        element.style.left = e.pageX + "px"
        element.style.top = e.pageY + "px"
        element.style.display = "block"

        setTimeout(() => {
            element.style.display = "none"
        }, 300)
        
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
       
        this.friendElement          = this.gameElement.querySelector("#friendly_score")
        this.foeElement             = this.gameElement.querySelector("#foe_score")
        this.timerElement           = this.gameElement.querySelector("#timer_value")

        this.bonkArray = document.querySelectorAll("[id^=bonk]")
    }, 
}