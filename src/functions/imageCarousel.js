// Image carousel function
export default function imageCarousel(
  imageClassNameOne,
  imageClassNameTwo,
  outClassName,
  inClassName,
  imageList,
  imageDisplayTime,
  imageSwapDelay
) {
  // Keep track of which images are fading in and fading out
  var fadingOutImage = 1;
  var fadingInImage = 0;
  var imageOne = document.querySelector(imageClassNameOne);
  var imageTwo = document.querySelector(imageClassNameTwo);
  var loadCount = 0;

  // When image one is done loading, and is invisible, swap its image
  var animationend = () => {
    imageOne.src = imageList[fadingInImage];
  };

  // When image one is done swapping its image, increament the counters,
  // and then set image one to visible, image two to hidden, and then swap
  // image two's image
  var load = () => {
    if (loadCount === 0) {
      loadCount += 1;
    } else if (imageList.length === 2) {
      console.log(
        "2",
        imageList.length,
        fadingInImage,
        fadingOutImage,
        imageList
      );
      fadingOutImage = (fadingOutImage + 1) % imageList.length;
      fadingInImage = (fadingInImage + 1) % imageList.length;
    } else {
      console.log("3 before", fadingInImage, fadingOutImage, imageList);
      fadingOutImage = fadingInImage;
      fadingInImage = (fadingInImage + 2) % imageList.length;
      console.log("3 after", fadingInImage, fadingOutImage, imageList);
    }

    imageOne.style.setProperty("opacity", "1", "important");
    setTimeout(() => {
      imageTwo.style.setProperty("opacity", "0", "important");
      imageTwo.src = imageList[fadingInImage];
    }, imageSwapDelay);
  };

  // Add event listeners to image one
  imageOne.addEventListener("animationend", animationend);
  imageOne.addEventListener("load", load);

  // Every interval, replay the animations on both images
  const intervalID = setInterval(() => {
    imageOne.classList.remove(outClassName);
    imageOne.style.removeProperty("opacity");
    imageOne.focus();
    imageOne.classList.add(outClassName);

    imageTwo.classList.remove(inClassName);
    imageTwo.style.removeProperty("opacity");
    imageOne.focus();
    imageTwo.classList.add(inClassName);
  }, imageDisplayTime);

  return intervalID;
}
