import React, { useState, useEffect } from "react";
import "./styles.css";

const BinarySearch = () => {
  const [cellArray, setCellArray] = useState([]);
  const [TargetSelected, setTargetSelected] = useState("");
  const [isFound, setIsFound] = useState(false);
  const [stack, setStack] = useState();
  const [displayStack, setDisplayStack] = useState([]);
  const [executionStack, setExecutionStack] = useState([]);

  // console.log(displayStack);

  const valueArray = [];

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const start = () => {
    setTargetSelected("");
    setStack();
    setIsFound(false);
    setExecutionStack([]);
    for (let i = 1; i < 16; i++) valueArray.push(i * i);
    let mid = Math.floor((valueArray.length - 1) / 2);
    setDisplayStack([{ low: 0, mid: mid, high: valueArray.length - 1 }]);
    const array = valueArray.map((item) => {
      return {
        id: Math.random().toString(),
        value: item,
        type: {
          low: valueArray.indexOf(item) === 0 ? true : false,
          mid: valueArray.indexOf(item) === mid ? true : false,
          high:
            valueArray.indexOf(item) === valueArray.length - 1 ? true : false,
          target: false,
          active: true,
        },
      };
    });
    setCellArray(array);
  };

  useEffect(() => {
    start();
  }, []);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const handleSetTarget = (id) => {
    if (!TargetSelected) {
      let element = cellArray.filter((i) => i.id === id);
      element = element[0];
      console.log(element);
      let index = cellArray.indexOf(element);
      // console.log(index);
      element.type.target = true;
      let updatedCellArray = [...cellArray];
      updatedCellArray[index] = element;
      setTargetSelected(element.value);
      setCellArray(updatedCellArray);
      // console.log(id);
    } else {
      handleReset();
      //   handleSetTarget(id);
    }
  };

  const handleReset = () => {
    if (TargetSelected) {
      let updatedCellArray = cellArray.map((i) => {
        return {
          ...i,
          type: {
            ...i.type,
            target: false,
          },
        };
      });
      setCellArray(updatedCellArray);
      setTargetSelected("");
    }
  };

  const handleCompute = () => {
    const stack = [];
    let low = 0;
    let high = cellArray.length - 1;
    let obj;

    let mid = Math.floor((low + high) / 2);

    // console.log(typeof cellArray[mid].value);
    // console.log(typeof TargetSelected);
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      if (cellArray[mid].value === TargetSelected) {
        obj = {
          low: low,
          mid: Math.floor((low + high) / 2),
          high: high,
          target: TargetSelected,
        };
        stack.push(obj);
        break;
      } else if (TargetSelected < cellArray[mid].value) {
        high = mid - 1;
        obj = {
          low: low,
          mid: Math.floor((low + high) / 2),
          high: high,
          target: TargetSelected,
        };
        stack.push(obj);
      } else if (TargetSelected > cellArray[mid].value) {
        low = mid + 1;
        obj = {
          low: low,
          mid: Math.floor((low + high) / 2),
          high: high,
          target: TargetSelected,
        };
        stack.push(obj);
      }
    }
    // console.log(stack);
    stack.pop();
    setStack(stack);
    setDisplayStack((prev) => [...prev, ...stack]);
  };

  const handleNext = () => {
    // console.log(stack);
    let oldCellArray = [...cellArray];
    oldCellArray.forEach((i) => {
      i.type = { ...i.type, low: false, mid: false, high: false };
    });
    let update = stack.shift();
    let element = displayStack.shift();
    if (element) setExecutionStack((prev) => [...prev, element]);

    if (!update) {
      setStack();
      setTargetSelected("");
      setIsFound(true);
    }
    if (update) {
      for (let i = 0; i < oldCellArray.length; i++) {
        if (i >= update.low && i <= update.high) {
          oldCellArray[i].type.active = true;
        } else {
          oldCellArray[i].type.active = false;
        }
      }
      oldCellArray[update.low].type.low = true;
      oldCellArray[update.high].type.high = true;
      oldCellArray[update.mid].type.mid = true;
      setCellArray(oldCellArray);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 text-center">
          {!TargetSelected && !isFound && (
            <h3 className="display-4 mb-4">Please Select target </h3>
          )}
          {TargetSelected && (
            <h3 className="display-4 mb-4">looking for {TargetSelected}</h3>
          )}
          {isFound && (
            <h3 className="display-4 mb-4">
              Found in {executionStack.length} steps!
            </h3>
          )}
        </div>
      </div>
      <ul>
        {cellArray.map((i) => {
          let style = "marker step-marker ";
          let cellStyle = "cell ";
          let value;

          if (i.type.active === false) cellStyle += "unactive";
          if (i.type.target === true) {
            cellStyle += "target ";
            style = "marker step-marker ";
          }
          if (i.type.low === true) cellStyle += "low ";
          if (i.type.mid === true) cellStyle += "mid ";
          if (i.type.high === true) cellStyle += "high ";

          if (i.type.target === true) value = "Target ";

          if (i.type.low === true) value = "Low ";
          if (i.type.mid === true) value = "mid ";
          if (i.type.high === true) value = "High ";
          return (
            <>
              {i.type.low || i.type.high || i.type.mid || i.type.target ? (
                <p className={style}>{value}</p>
              ) : (
                <p className="dummy"></p>
              )}
              <li
                onClick={() => handleSetTarget(i.id)}
                id={i}
                className={cellStyle}
              >
                {i.value}
              </li>
            </>
          );
        })}
      </ul>
      {executionStack.length > 0 && (
        <div className="wrapper">
          {executionStack.map((item) => {
            return (
              <ul className="stack-element">
                <li className="history__low ">{item.low}</li>
                <li className="history__mid ">{item.mid}</li>
                <li className="history__high ">{item.high}</li>
              </ul>
            );
          })}
        </div>
      )}
      <div>
        {TargetSelected ? (
          stack ? (
            <button
              onClick={handleNext}
              className="btn btn-primary controller-bs"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleCompute}
              className="btn btn-primary controller-bs"
            >
              Start
            </button>
          )
        ) : (
          <button onClick={start} className="btn btn-primary controller-bs">
            Full Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default BinarySearch;
