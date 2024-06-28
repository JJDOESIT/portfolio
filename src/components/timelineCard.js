import { useEffect, useState } from "react";
import "../styles/timelineCard.css";

export default function TimelineCard(props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [sizes, setSizes] = useState(null);
  const [seen, setSeen] = useState(false);
  const cardSlideInDelay = 100; // in ms
  const cardSeenOffset = 0; // in px
  const gapBetweenCards = 10; // row gap between each card
  const timelineBarOffset = 50; // this number means each end of the bar will have 50 extra pixels

  // Once the cards have been rendered offscreen, add a smooth transition element
  useEffect(() => {}, []);

  // Re-calcuate the card sizes
  function calculateCardSize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 700) {
      setSizes({
        imageWidth: 175,
        imageHeight: 175,
        textWidth: 200,
        textHeight: 125,
      });
    } else {
      setSizes({
        imageWidth: 300,
        imageHeight: 300,
        textWidth: 300,
        textHeight: 150,
      });
    }
  }

  // Detect if the card has been seen
  function detectIfSeen() {
    // Scroll height (ie. How far we've scrolled down pixel wise)
    const scrollHeight = props.scrollRef.current.scrollTop + window.innerHeight;

    // Fetch the element
    const element = document.getElementById(
      "timeline-" + props.item.id + "-" + props.item.alignment
    );
    // The top position of the element relative to the passed in container in terms of pixel count
    const elementTop =
      element.getBoundingClientRect().top + props.scrollRef.current.scrollTop;
    // If we've reached the point on the page where the element is located
    if (scrollHeight >= elementTop + cardSeenOffset) {
      setSeen(true);
    }
  }

  // On render, calculate the card size and add resize event listener
  useEffect(() => {
    calculateCardSize(); // set the initial card sizes
    window.addEventListener("resize", calculateCardSize);
    // Remove event listener
    return () => {
      window.removeEventListener("resize", calculateCardSize);
    };
  }, []);

  // Once the sizes are set, if the page hasn't loaded, load the page
  useEffect(() => {
    if (sizes) {
      if (!pageLoaded) {
        setPageLoaded(true);
      }
      // On resize, reset the height of the timeline bar
      props.timelineBarRef.current.style.height = `${
        (props.item.id + 1) * sizes.imageHeight +
        (timelineBarOffset * 2 + gapBetweenCards * (props.item.id + 1))
      }px`;
    }
  }, [sizes]);

  // When the page has loaded
  useEffect(() => {
    if (pageLoaded) {
      detectIfSeen();
      // Add an event listener to the passed in element
      props.scrollRef.current.addEventListener("scroll", detectIfSeen);

      // Now that the cards have been rendered offscreen,
      // add a transition animation and delay
      const element = document.getElementById(
        "timeline-" + props.item.id + "-" + props.item.alignment
      );
      element.style.transition = "all 1s cubic-bezier(0.25, 0.1, 0.25, 1)";
      element.style.transitionDelay = `${
        props.item.id * cardSlideInDelay + cardSlideInDelay
      }ms`;
    }
    // Remove event listener
    return () => {
      window.removeEventListener("scroll", detectIfSeen);
    };
  }, [pageLoaded]);

  if (props.item.alignment === "right") {
    return (
      <>
        {pageLoaded ? (
          <div
            key={props.item.id}
            id={"timeline-" + props.item.id + "-right"}
            className="timeline-card-container timeline-card-image-right"
            style={{
              width: `${sizes.imageWidth}px`,
              height: `${sizes.imageHeight}px`,
              transform: seen
                ? `translate(${props.timelineBarWidth}px,${
                    props.item.id * sizes.imageHeight +
                    gapBetweenCards * props.item.id +
                    timelineBarOffset
                  }px)`
                : `translate(2000px,${
                    props.item.id * sizes.imageWidth +
                    gapBetweenCards * props.item.id +
                    timelineBarOffset
                  }px)`,
              justifyContent: "start",
            }}
          >
            <img
              src={props.item.imagePath}
              className="timeline-card-image"
            ></img>
            <div
              className="timeline-card-image-background-right"
              style={{
                width: `${sizes.imageWidth}px`,
                height: `${sizes.imageHeight}px`,
              }}
            ></div>
            <div
              className="timeline-card-text-container timeline-card-text-container-right"
              style={{
                minWidth: `${sizes.textWidth}px`,
                minHeight: `${sizes.textHeight}px`,
                transform: `translateX(-${sizes.textWidth / 1.5}px)`,
              }}
            >
              <p className="timeline-card-title">{props.item.date}</p>
              <p className="timeline-card-text">{props.item.text}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  } else if (props.item.alignment === "left") {
    return (
      <>
        {pageLoaded ? (
          <div
            key={props.item.id}
            id={"timeline-" + props.item.id + "-left"}
            className="timeline-card-container timeline-card-image-left"
            style={{
              width: `${sizes.imageWidth}px`,
              height: `${sizes.imageHeight}px`,
              transform: seen
                ? `translate(-${sizes.imageWidth}px,${
                    props.item.id * sizes.imageHeight +
                    gapBetweenCards * props.item.id +
                    timelineBarOffset
                  }px)`
                : `translate(-2000px,${
                    props.item.id * sizes.imageWidth +
                    gapBetweenCards * props.item.id +
                    timelineBarOffset
                  }px)`,
              justifyContent: "start",
              justifyContent: "end",
            }}
          >
            <img
              src={props.item.imagePath}
              className="timeline-card-image"
            ></img>
            <div
              className="timeline-card-image-background-left"
              style={{
                width: `${sizes.imageWidth}px`,
                height: `${sizes.imageHeight}px`,
              }}
            ></div>
            <div
              className="timeline-card-text-container timeline-card-text-container-left"
              style={{
                minWidth: `${sizes.textWidth}px`,
                minHeight: `${sizes.textHeight}px`,
                transform: `translateX(${sizes.textWidth / 1.5}px)`,
              }}
            >
              <p className="timeline-card-title">{props.item.date}</p>
              <p className="timeline-card-text">{props.item.text}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
