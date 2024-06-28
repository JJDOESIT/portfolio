import { useState, useEffect, useRef } from "react";
import TimelineCard from "./timelineCard";
import timelineJSON from "../json/timeline.json";
import "../styles/timeline.css";

export default function Timeline(props) {
  const [timelineDict, setTimelineDict] = useState({});
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const timelineBarRef = useRef(null);

  // Determine whether the image paths have been loaded into the image dict
  useEffect(() => {
    if (Object.keys(timelineDict).length > 0) {
      setTimelineLoaded(true);
    }
  }, [timelineDict]);

  // Load an image map from the JSON file
  useEffect(() => {
    setTimelineDict(timelineJSON);
  }, []);

  return (
    <div className="timeline-container">
      <div className="timeline-title">
        <p>Experience</p>
        {timelineLoaded ? (
          <div
            className="timeline-bar"
            ref={timelineBarRef}
            style={{ width: timelineDict.timelineBarWidth }}
          >
            {timelineDict.timeline.map((item) => {
              return (
                <TimelineCard
                  item={item}
                  key={item.id}
                  timelineBarWidth={timelineDict.timelineBarWidth}
                  scrollRef={props.scrollRef}
                  timelineBarRef={timelineBarRef}
                ></TimelineCard>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
