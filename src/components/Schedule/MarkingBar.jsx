import React from 'react';
import { useRef } from 'react';

function MarkingBar({ currentDateMarkingInfo, setCurrentHover, isHover }) {
  const { start, end, title, tripType, renderDates, fromPrevMonth, key } = currentDateMarkingInfo;
  const emoji = {
    couple: '💖',
    family: '💛',
    friends: '💚',
    alone: '💜',
  };

  const markingBarRef = useRef(null);

  return (
    <div
      ref={markingBarRef}
      className={`marKingBar ${tripType} ${start && 'start'} ${end && 'end'} ${fromPrevMonth && 'fromPrevMonth'} ${
        isHover && 'hover'
      }`}
      style={{ width: `${renderDates * 14.28}%` }}
      onMouseEnter={() => {
        setCurrentHover(key);
      }}
      onMouseOut={() => {
        setCurrentHover('');
      }}
    >
      {start && emoji[tripType]} {(start || fromPrevMonth) && title}
    </div>
  );
}

export default MarkingBar;
