import React, { useState, useEffect, useCallback, useRef } from "react";
/*
For those who are maintaining state with the React Hook useState, I adapted the above suggestions to make a demo slider App below. In the demo app, the child slider component maintains the parent's state.

The demo also uses useEffect hook. (and less importantly, useRef hook) 
*/
//the parent react component
function Parent() {

  // the parentState will be set by its child slider component
  const [parentState, setParentState] = useState(0);

  // make wrapper function to give child
  const wrapperSetParentState = useCallback(val => {
    setParentState(val);
  }, [setParentState]);

  return (
    <div style={{ margin: 30 }}>
      <Child
        parentState={parentState}
        parentStateSetter={wrapperSetParentState}
      />
      <div>Parent State: {parentState}</div>
    </div>
  );
};

//the child react component
function Child({parentStateSetter}) {
  const childRef = useRef();
  const [childState, setChildState] = useState(0);

  useEffect(() => {
    parentStateSetter(childState);
  }, [parentStateSetter, childState]);

  const onSliderChangeHandler = e => {
  //pass slider's event value to child's state
    setChildState(e.target.value);
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="255"
        value={childState}
        ref={childRef}
        onChange={onSliderChangeHandler}
      ></input>
    </div>
  );
};


export default Parent;