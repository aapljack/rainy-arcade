import React, { useState, useEffect } from 'react';

function Label({text}) {
  const [backgroundColor, setBackgroundColor] = React.useState("inherit");
  const updateTimer = React.useRef(null);

  function setUpdate() {
    setBackgroundColor("#9b34ee");
    updateTimer.current = setTimeout(() => {
      setBackgroundColor("inherit");
      updateTimer.current = null;
    }, 1000);
  }

  useEffect(() => {
    if(!updateTimer.current) {
      setUpdate();
    }
  }, [text]);

  useEffect(() => {
    return () => {
      if(updateTimer.current) {
        clearTimeout(updateTimer.current);
      }
    };
  }, []);

  return (
	<span className="label-text" style={{ backgroundColor: backgroundColor }}>
	  {text}
	</span>
  );
}

export default Label;