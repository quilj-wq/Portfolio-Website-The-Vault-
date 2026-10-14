document.addEventListener("DOMContentLoaded", function () {

  /* --------------------
     CUSTOM SCROLLBAR
  -------------------- */

  const scrollTrack = document.getElementById("scrollTrack");
  const scrollThumb = document.getElementById("scrollThumb");

  function updateScrollBar() {

    if (!scrollTrack || !scrollThumb) {
      return;
    }

    const documentHeight =
      document.documentElement.scrollHeight;

    const windowHeight =
      window.innerHeight;

    const scrollableHeight =
      documentHeight - windowHeight;


    if (scrollableHeight <= 0) {

      scrollTrack.style.display = "none";
      return;
    }


    scrollTrack.style.display = "block";


    const visibleRatio =
      windowHeight / documentHeight;

    const thumbHeight =
      visibleRatio * windowHeight;

    scrollThumb.style.height =
      thumbHeight + "px";


    const scrollPercent =
      window.scrollY / scrollableHeight;

    const maxThumbTravel =
      windowHeight - thumbHeight;


    scrollThumb.style.top =
      scrollPercent * maxThumbTravel + "px";
  }


  window.addEventListener("scroll", updateScrollBar);
  window.addEventListener("resize", updateScrollBar);

  updateScrollBar();



  /* --------------------
     ART POPUP
  -------------------- */

  const artWindow =
    document.getElementById("artWindow");

  const artWindowBar =
    document.getElementById("artWindowBar");

  const popupImage =
    document.getElementById("popupImage");

  const windowTitle =
    document.getElementById("windowTitle");

  const closeButton =
    document.getElementById("closeButton");

  const fullscreenButton =
    document.getElementById("fullscreenButton");

  const restoreButton =
    document.getElementById("restoreButton");

  const artImages =
    document.querySelectorAll(".art-image");


  /* If this isn't the Art page, stop here */

  if (!artWindow) {
    return;
  }


  /* --------------------
     OPEN IMAGE
  -------------------- */

  artImages.forEach(function (image) {

    image.addEventListener("click", function () {

      popupImage.src = image.src;
      popupImage.alt = image.alt;

      windowTitle.textContent = image.alt;

      artWindow.style.display = "block";

    });

  });



  /* --------------------
     CLOSE
  -------------------- */

  closeButton.addEventListener("click", function () {

    artWindow.style.display = "none";

  });



  /* --------------------
     FULLSCREEN
  -------------------- */

  fullscreenButton.addEventListener("click", function () {

    artWindow.classList.add("fullscreen");

  });



  /* --------------------
     RESTORE
  -------------------- */

  restoreButton.addEventListener("click", function () {

    artWindow.classList.remove("fullscreen");

    artWindow.style.top = "100px";
    artWindow.style.left = "100px";

    artWindow.style.width = "500px";
    artWindow.style.height = "400px";

  });



  /* --------------------
     DRAG WINDOW
  -------------------- */

  let dragging = false;

  let startMouseX = 0;
  let startMouseY = 0;

  let startWindowX = 0;
  let startWindowY = 0;


  artWindowBar.addEventListener(
    "mousedown",
    function (event) {

      if (event.target.tagName === "BUTTON") {
        return;
      }

      if (
        artWindow.classList.contains("fullscreen")
      ) {
        return;
      }


      dragging = true;

      startMouseX = event.clientX;
      startMouseY = event.clientY;

      startWindowX = artWindow.offsetLeft;
      startWindowY = artWindow.offsetTop;

    }
  );


  document.addEventListener(
    "mousemove",
    function (event) {

      if (!dragging) {
        return;
      }


      const differenceX =
        event.clientX - startMouseX;

      const differenceY =
        event.clientY - startMouseY;


      artWindow.style.left =
        startWindowX + differenceX + "px";

      artWindow.style.top =
        startWindowY + differenceY + "px";

    }
  );


  document.addEventListener(
    "mouseup",
    function () {

      dragging = false;

    }
  );

});