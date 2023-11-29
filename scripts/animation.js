// Observing Elements Position
const Observer = new IntersectionObserver(
	(objects) => {
		objects.forEach((object) => {
			if (object.isIntersecting) {
				object.target.classList.add("showElement");
			} else {
				object.target.classList.remove("showElement");
			}
		});
	},
	{
		threshold: 0,
	}
);

// Animaiting Elements based on Position
const animatingElements = document.querySelectorAll(".hideElement");
console.log(animatingElements);
animatingElements.forEach((animatingElement) => {
	Observer.observe(animatingElement);
});
