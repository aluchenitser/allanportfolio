
	function scrambleHeader() {
		baffle('.derdo').start().set({
			characters: "█▓▒░█▓▒░█▓▒░<>/"
		}).reveal(1000)
	}



	function popup() {
			var moveForce = 30; // max popup movement in pixels
		var rotateForce = 20; // max popup rotation in deg

		var aboutEl = document.querySelector(".about-image")
		var popupEl = document.querySelector(".popup")


		aboutEl.addEventListener("mousemove", e => {
			var aboutWidth = aboutEl.offsetWidth
			var aboutHeight = aboutEl.offsetHeight

		    rect = aboutEl.getBoundingClientRect();
		    var x = e.clientX - rect.left; 
		    var y = e.clientY - rect.top;

		    var moveX = (x - aboutWidth/2) / (aboutWidth/2) * -moveForce;
		    var moveY = (y - aboutHeight/2) / (aboutHeight/2) * -moveForce;

	   		 var rotateY = (x / aboutWidth * rotateForce*2) - rotateForce;
		    var rotateX = -((y / aboutHeight * rotateForce*2) - rotateForce);

		    console.log(aboutWidth, aboutHeight)

			popupEl.style.left = moveX + 'px'
			popupEl.style.top = moveY + 'px'
			popupEl.style.transform = 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)'
		})

		aboutEl.addEventListener("mouseout", e => {
			popupEl.style.left = '0'
			popupEl.style.top = '0'
			popupEl.style.transform = 'none'
		})
	}

	popup();

