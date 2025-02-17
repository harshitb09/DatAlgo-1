import React, { useState } from "react";
import SLinkedList from "./singleLinkedListClass";
import Tree from "react-tree-graph";
import "./llstyle.css";

const SingleLinkedList = () => {
  const [sll, setSll] = useState(new SLinkedList(""));
  const [data, setData] = useState(sll.display());
  const [toInsert, setToInsert] = useState("");
  const [isStart, setIsStart] = useState(false);

  const [idx, setIdx] = useState("");

  const createHandler = () => {
    let head = parseInt(prompt("Enter Head Value"));
    const temp = new SLinkedList(head);
    setSll(temp);
    setIsStart(true);
  };

  const insertChangeHandler = (e) => {
    let data = parseInt(e.target.value);
    setToInsert(data);
  };
  const insertSubmitHandler = (e) => {
    e.preventDefault();
    console.log(toInsert);
    sll.insertBack(toInsert);
    updateData();
  };
  const updateData = () => {
    setToInsert("");
    setIdx("");
    setData(sll.display());
  };

  const insertFrontSubmitHandler = (e) => {
    e.preventDefault();
    sll.insertFront(toInsert);
    updateData();
  };

  const insertAfterSubmitHandler = (e) => {
    e.preventDefault();
    sll.insertAfter(idx, toInsert);
    updateData();
  };

  const idxChangeHandler = (e) => {
    let data = parseInt(e.target.value);
    setIdx(data);
  };

  const clearHandler = () => {
    setData(new SLinkedList("").display());
    setIsStart(false);
  };
  return (
    <div>
      <Tree
        data={data}
        height={200}
        width={1200}
        animated={true}
        nodeShape="rect"
        nodeProps={{ rx: 2 }}
        duration={1000}
        svgProps={{
          transform: "rotate(0)",
          className: "joins",
        }}
        textProps={{
          transform: "rotate(10)",
        }}
      />
      <div className="controller-sll">
        <div className="row">
          {!isStart && (
            <div className="col-1">
              <button onClick={createHandler} className="btn btn-primary">
                Create
              </button>
            </div>
          )}
          {isStart && (
            <div className="col-1">
              <button onClick={clearHandler} className="btn btn-danger">
                Clear
              </button>
            </div>
          )}

          {isStart && (
            <div className="col-3">
              <form onSubmit={insertSubmitHandler}>
                <div className="row">
                  <div className="col-8">
                    <input
                      onChange={insertChangeHandler}
                      value={toInsert}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary" type="submit">
                      Insert Back
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {isStart && (
            <div className="col-3">
              <form onSubmit={insertFrontSubmitHandler}>
                <div className="row">
                  <div className="col-8">
                    <input
                      onChange={insertChangeHandler}
                      value={toInsert}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary" type="submit">
                      Insert Front
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {isStart && (
            <div className="col">
              <form onSubmit={insertAfterSubmitHandler}>
                <div className="row">
                  <div className="col">
                    <input
                      onChange={idxChangeHandler}
                      value={idx}
                      className="form-control"
                      placeholder="Index"
                    ></input>
                  </div>
                  <div className="col">
                    <input
                      onChange={insertChangeHandler}
                      value={toInsert}
                      className="form-control"
                      placeholder="Value"
                    ></input>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary" type="submit">
                      Insert After
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleLinkedList;
