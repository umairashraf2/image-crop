const inputImage = document.getElementById("inputImage");
const image = document.getElementById("image");
const croppedImage = document.getElementById("croppedImage");
const crop = document.getElementById("crop");
const width = document.getElementById("width-input");
const height = document.getElementById("height-input");
const verticalCheckbox = document.getElementById("vericalCheckbox");
const horizontalCheckbox = document.getElementById("horizontalCheckbox");
const main_container = document.getElementById("main_container");
const preview = document.getElementById("preview");
const demo1 = document.getElementById("demo1");
const dwn = document.getElementById("dwn");
let cropper;
let w;
let h;

inputImage.addEventListener("change", (e) => {
	console.log("123");
	const file = e.target.files[0];
	if (file.size > 5 * 1024 * 1024) {
		// 5 MB in bytes
		alert("Please upload an image smaller than 5 MB.");
		return;
	}
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			image.src = e.target.result;
			if (cropper) cropper.destroy();
			cropper = new Cropper(image, {
				viewMode: 1,
				// autoCropArea: 1,
				// aspectRatio: NaN,
				crop: function (event) {
					demo1.innerHTML =
						"<strong>Width:</strong> " +
						Math.round(event.detail.width) +
						"px" +
						" <strong>Height:</strong> " +
						Math.round(event.detail.height) +
						"px";
				},
			});
		};
		reader.readAsDataURL(file);
	}
	main_container.style.display = "block";
});

function updateAspectRatio() {
	console.log(this.value, this.id);
	const cropBoxData = cropper.getCropBoxData();
	if (this.id === "width-input") {
		cropBoxData.width = parseInt(this.value) * 37.7952755906;
	} else if (this.id === "height-input") {
		cropBoxData.height = parseInt(this.value) * 37.7952755906;
	}
	console.log(cropBoxData);

	cropper.setCropBoxData(cropBoxData);
}

width.addEventListener("input", updateAspectRatio);
height.addEventListener("input", updateAspectRatio);

verticalCheckbox.addEventListener("change", () => {
	if (verticalCheckbox.checked) {
		cropper.rotate(180);
	} else {
		cropper.rotate(-180);
	}
});

horizontalCheckbox.addEventListener("change", () => {
	if (horizontalCheckbox.checked) {
		cropper.scaleX(-1);
	} else {
		cropper.scaleX(1);
	}
});

document.getElementById("customRange1").addEventListener("input", function () {
	// Get the zoom value from the input range
	const zoomValue = parseFloat(this.value) / 50;
	console.log(zoomValue);
	// Zoom in or out using Cropper.js's zoom method
	cropper.zoomTo(zoomValue);
});

document.getElementById("fit-button").addEventListener("click", function () {
	// Fit the image to the crop box
	cropper.reset();

	// Get the crop box data
	const cropBoxData = cropper.getCropBoxData();

	// Do something with the crop box data
	console.log(cropBoxData);
});

crop.addEventListener("click", () => {
	console.log("clicked crop");
	let canvas = cropper.getCroppedCanvas();
	croppedImage.src = canvas.toDataURL("image/png");
	dwn.href = canvas.toDataURL("image/png");
	preview.style.display = "block";
});
