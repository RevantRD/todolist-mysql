import React, { useEffect, useState } from "react";
import AddList from "./AddList";

const GetList = () => {
  const [list, setList] = useState([]);
  const getData = async () => {
    try {
      const resp = await fetch("http://localhost:5000/get");
      const data = await resp.json();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">
            <AddList displayTasks={getData} />
          </div>
          <div className="row mt-5 glass-effect">
            <div className="col mt-3 mb-2">
              {list.map((item) => (
                <div className="d-flex mb-3 justify-content-between tasks">
                  <p className=" mt-2 " key={item.id}>
                    {item.task}
                  </p>
                  <button
                    className="btn fw-bolder del-btn"
                    onClick={(e) => handleDelete(item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetList;
