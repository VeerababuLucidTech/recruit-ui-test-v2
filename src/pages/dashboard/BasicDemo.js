import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const search = (event) => {
    setItems([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  return (
    <div className="card flex justify-content-center">
      <div
        style={{ backgroundColor: "white" }}
        className="p-inputgroup"
      >
        <span style={{ backgroundColor: "white" }} className="p-inputgroup-addon">
          <i style={{ color: "#ccc" }} className="pi pi-search" />
        </span>
        <InputText
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          style={{ boxShadow: "none", width: "200px" }}
        />
      </div>
    </div>
  );
}
