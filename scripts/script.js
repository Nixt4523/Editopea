// Getting the image to be Edited
let image = document.getElementById("sourceImage");

// Getting the canvas for the Image to be Edited
let canvas = document.getElementById("canvas");

// Getting 2D Context of the Image
let context = canvas.getContext("2d");

// Getting all the Sliders
let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider = document.getElementById("contrastSlider");
let saturationSlider = document.getElementById("saturationSlider");
let hueSlider = document.getElementById("hueSlider");
let grayscaleSlider = document.getElementById("grayscaleSlider");
let sepiaSlider = document.getElementById("sepiaSlider");
let blurSlider = document.getElementById("blurSlider");

// Getting Rotate and Flip Buttons
let rotateClockwisButtone = document.getElementById("rotate-clockwise");
let rotateAnticlockwiseButton = document.getElementById("rotate-anticlockwise");
let flipRightButton = document.getElementById("flip-right");
let flipLeftButton = document.getElementById("flip-right");
let flipDownButton = document.getElementById("flip-down");
let flipUpButton = document.getElementById("flip-up");

// Getting all the Sliders Values
let brightnessSliderValue = document.getElementById("brightnessSliderValue");
let contrastSliderValue = document.getElementById("contrastSliderValue");
let saturationSliderValue = document.getElementById("saturationSliderValue");
let hueSliderValue = document.getElementById("hueSliderValue");
let grayscaleSliderValue = document.getElementById("grayscaleSliderValue");
let sepiaSliderValue = document.getElementById("sepiaSliderValue");
let blurSliderValue = document.getElementById("blurSliderValue");

// Drawing Image Elements
let drawingBoard = document.getElementById("drawingBoard");
let drawButton = document.getElementById("drawButton");
let drawingCanvas = new fabric.Canvas("drawingCanvas", { isDrawing: false });

// Cropping Image Elements
let croppingBoard = document.getElementById("croppingBoard");
let croppingImage = document.getElementById("croppingImage");
let cropButton = document.getElementById("cropButton");

// Drawing Canvas Settgins
drawingCanvas.freeDrawingBrush.color = "white";
drawingCanvas.freeDrawingBrush.width = 10;

// Default Rotation and Flip Settings
let ROTATE = 0;
let FLIPHORIZONTAL = "right";
let FLIPVERTICAL = "top";
let aspect = 1;

// Function to Import Image and set it's Canvas
function importImage(event) {
	image.src = URL.createObjectURL(event.target.files[0]);
	image.onload = function () {
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.crossOrigin = "anonymous";
		applyImageFilter();
	};

	let startingContent = document.getElementById("startingContent");
	startingContent.style.display = "none";
}

// Function to Apply selected Image Filters to the Canvas
function applyImageFilter() {
	brightnessSliderValue.innerText = brightnessSlider.value;
	contrastSliderValue.innerText = contrastSlider.value;
	saturationSliderValue.innerText = saturationSlider.value;
	hueSliderValue.innerText = hueSlider.value;
	grayscaleSliderValue.innerText = grayscaleSlider.value;
	sepiaSliderValue.innerText = sepiaSlider.value;
	blurSliderValue.innerText = blurSlider.value;

	let filters = `blur(${blurSlider.value}px) brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) grayscale(${grayscaleSlider.value}%) saturate(${saturationSlider.value}%) sepia(${sepiaSlider.value}%) hue-rotate(${hueSlider.value}deg)`;

	context.filter = filters;
	context.imageSmoothingQuality = "high";
	context.drawImage(image, 0, 0);
}

// Function to reset all filters to default values of the Canvas
function resetImage() {
	brightnessSlider.value = 100;
	contrastSlider.value = 100;
	grayscaleSlider.value = 0;
	hueSlider.value = 0;
	saturationSlider.value = 100;
	sepiaSlider.value = 0;
	blurSlider.value = 0;

	applyImageFilter();
}

// Function to Rotate Image Anitoclockwise
function rotateAnticlockwise() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();

	context.translate(canvas.width / 2, canvas.height / 2);

	context.rotate((90 * Math.PI) / 180);

	context.drawImage(image, -image.width / 2, -image.height / 2);
	context.restore();
}

// Function to Rotate Image Clockwise
function rotateClockwise() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.save();

	context.translate(canvas.width / 2, canvas.height / 2);

	context.rotate((90 * -Math.PI) / 180);

	context.drawImage(image, -image.width / 2, -image.height / 2);
	context.restore();
}

// Function to Flip Image to the Right Side
function flipRight() {
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.scale(-1, 1);
	context.drawImage(image, image.width * -1, 0, image.width, image.height);

	context.restore();
}

// Function to Filp Image to the Left Side
function flipLeft() {
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.scale(1, 1);
	context.drawImage(image, 1, 0, image.width, image.height);

	context.restore();
}

// Fucntion to Filp Image to the Down Side
function flipDown() {
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.scale(1, -1);
	context.drawImage(image, 0, image.height * -1, image.width, image.height);

	context.restore();
}

// Function to Flip Image to the Up Side
function flipUp() {
	context.save();
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.scale(1, 1);
	context.drawImage(image, 0, 1, image.width, image.height);

	context.restore();
}

// Function to Open a Drawing Board
function openDrawingBoard() {
	drawingBoard.classList.remove("hidden");
	drawingBoard.classList.add("block");

	drawingCanvas.remove();

	drawingCanvas.setDimensions({
		width: canvas.width / 2,
		height: canvas.height / 2,
	});

	fabric.Image.fromURL(canvas.toDataURL(), (img) => {
		img.set({
			left: 0,
			top: 0,
		});

		img.scaleToHeight(canvas.height / 2);
		img.scaleToWidth(canvas.width / 2);

		drawingCanvas.add(img);
	});
}

// Function to Draw on Image
function draw() {
	drawingCanvas.isDrawingMode = !drawingCanvas.isDrawingMode;
}

// Function to Delete Drawn Elements from the Drawing board
function remove() {
	drawingCanvas.isDrawingMode = false;
	drawingCanvas.remove(drawingCanvas.getActiveObject());
}

// Function to Draw Rectangle on the Drawing Board
function drawRectangle() {
	drawingCanvas.isDrawingMode = false;
	const rectangle = new fabric.Rect({
		left: 500,
		top: 500,
		width: 400,
		height: 300,
		fill: "transparent",
		stroke: "white",
		strokeWidth: 4,
	});
	drawingCanvas.add(rectangle);
}

// Function to Draw Cricle on the Drawing Board
function drawCircle() {
	drawingCanvas.isDrawingMode = false;
	const circle = new fabric.Circle({
		left: 500,
		top: 500,
		radius: 100,
		fill: "transparent",
		stroke: "white",
		strokeWidth: 4,
	});
	drawingCanvas.add(circle);
}

// Function to Draw text on the Drawing Board
function drawText() {
	drawingCanvas.isDrawingMode = false;
	const text = new fabric.IText("Text", {
		left: 500,
		top: 500,
		objecttype: "text",
		fontFamily: "arial black",
		fill: "white",
	});
	drawingCanvas.add(text);
}

// Function to Donwload the Image after Drawing
function downloadDrawing() {
	const link = document.createElement("a");
	link.download = "Editopea.png";
	link.href = drawingCanvas.toDataURL();
	link.click();
}

// Function to Close the Drawing Board
function closeDrawingBoard() {
	drawingBoard.classList.remove("block");
	drawingBoard.classList.add("hidden");
}

// Initializing the Cropper JS
let cropper;

// Function to Open Cropping Board
function openCroppingBoard() {
	croppingImage.src = canvas.toDataURL();
	croppingBoard.classList.remove("hidden");
	croppingBoard.classList.add("block");

	cropper = new Cropper(croppingImage, {
		aspectRatio: 1, // Set the aspect ratio for cropping
		autoCropArea: 0.8, // Set the initial cropping area as a percentage of the image
	});
}

// Function to Set the Aspect Ratio for Cropping the Image
function aspectRatio(ratio) {
	cropper.setAspectRatio(ratio);
}

// Function to Download the Cropped Image
function downloadCroppedImage() {
	const croppedCanvas = cropper.getCroppedCanvas();

	const link = document.createElement("a");
	link.download = "Editopea.jpg";
	link.href = croppedCanvas.toDataURL();
	link.click();
}

// Function to Close the Cropping Board
function closeCroppingBoard() {
	croppingBoard.classList.remove("block");
	croppingBoard.classList.add("hidden");
}

// Pre-defined Filters
function brightenFilter() {
	resetImage();

	brightnessSlider.value = 130;
	contrastSlider.value = 120;
	saturationSlider.value = 120;
	applyImageFilter();
}

function blackAndWhiteFliter() {
	resetImage();

	grayscaleSlider.value = 100;
	brightnessSlider.value = 120;
	contrastSlider.value = 120;
	applyImageFilter();
}

function blackAndWhiteFliterDark() {
	resetImage();

	grayscaleSlider.value = 100;
	brightnessSlider.value = 80;
	contrastSlider.value = 120;
	applyImageFilter();
}

function blackAndWhiteFliterLight() {
	resetImage();

	grayscaleSlider.value = 100;
	brightnessSlider.value = 160;
	contrastSlider.value = 120;
	applyImageFilter();
}

function funkyFilter() {
	resetImage();

	hueSlider.value = Math.floor(Math.random() * 360) + 1;
	contrastSlider.value = 120;
	applyImageFilter();
}

function vintageFilter() {
	resetImage();

	brightnessSlider.value = 120;
	saturationSlider.value = 120;
	sepiaSlider.value = 150;
	applyImageFilter();
}

function inversionFilter() {
	resetImage();

	brightnessSlider.value = 100;
	saturationSlider.value = 100;

	context.filter = "invert(1)";
	context.drawImage(image, 0, 0);
}

// Function to Download Edited Image
function exportImage() {
	const link = document.createElement("a");
	link.download = "Editopea.jpg";
	link.href = canvas.toDataURL();
	link.click();
}
