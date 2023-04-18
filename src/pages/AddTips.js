// import { async } from '@firebase/util'
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-Config";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTips({ isAuth }) {
  const [title, setTitle] = useState("");
  const [addTip, setAddTip] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const tipsCollectionRef = collection(db, "tips");
  let navigate = useNavigate();
  const addNewTip = async () => {
    await addDoc(tipsCollectionRef, {
      selectedDate,
      title,
      addTip,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h1>Add tip</h1>
        <div className="input-create">
        <label>Date</label>
          <DatePicker
            placeholderText="Click here"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <label>Add note</label>
          <input
            placeholder="Add note if needed..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="input-create">
          <label>Tip Amount</label>
          <input
            type="number"
            placeholder="$..."
            onChange={(event) => {
              setAddTip(event.target.value);
            }}
          />
        </div>
        <button onClick={addNewTip}>Submit tip</button>
      </div>
    </div>
  );
}

export default AddTips;
