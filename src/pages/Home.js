import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-Config';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Home({ isAuth }) {
  const [tipsList, setTipsList] = useState([]);
  const [newTip, setNewTip] = useState('');
  const [events, setEvents] = useState('');

  const listCollectionRef = collection(db, 'tips');

  useEffect(() => {
    const getTips = async () => {
      const data = await getDocs(listCollectionRef);
      setTipsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTips();
  }, []);

  useEffect(() => {
    const events = tipsList.map((tip) => ({
      title: tip.title,
      start: tip.selectedDate?.toDate(),
      end: tip.selectedDate?.toDate(),
    }));
    setEvents(events);
  }, [tipsList]);

  const deleteTip = async (id) => {
    const listDoc = doc(db, 'tips', id);
    await deleteDoc(listDoc);
  };

  const handleUpdate = async (id, newTipValue) => {
    const postDoc = doc(db, 'tips', id);
    const newTipObject = { addTip: newTipValue };
    await updateDoc(postDoc, newTipObject);
    const data = await getDocs(listCollectionRef);
    setTipsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addNewTip = (index) => {
    if (newTip !== '' && tipsList[index].id) {
      const newTipObject = {
        addTip: newTip,
      };
      handleUpdate(tipsList[index].id, newTipObject);
      setNewTip('');
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />

      {tipsList.map((tip, index) => {
        return (
          <div className='tips' key={tip.id}>
            <div className='tips-header'></div>
            <div className='title'>
              <h1>{ tip.title }</h1>
              <p>{new Date(tip.selectedDate?.toDate()).toLocaleDateString()}</p>
            </div>
            <div className='update-tip'>
              <div className='list-tips-container'>${tip.addTip.addTip}.00</div>
              <input
                key={tip.id}
                type='number'
                value={newTip.id}
                onChange={(e) => setNewTip(e.target.value)}
              />
              <button onClick={() => addNewTip(index)}>
                <p>Update Tip</p>
              </button>
            </div>
            <div className='list-tips-author'>
              <h3>@{tip.author.name}</h3>
            </div>
            <div className='delete-tip'>
                  {isAuth && tip.author.id === auth.currentUser.uid && (
                    <button onClick={() => deleteTip(tip.id)}>&#128465;</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    export default Home;