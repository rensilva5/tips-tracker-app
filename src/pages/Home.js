    import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
    import React, { useEffect, useState } from 'react';
    import { auth, db } from '../firebase-Config';

    function Home({ isAuth }) {
      const [tipsList, setTipsList] = useState([]);
      const [newTip, setNewTip] = useState('');
      const listCollectionRef = collection(db, 'tips');

      useEffect(() => {
        const getTips = async () => {
          const data = await getDocs(listCollectionRef);
          setTipsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTips();
      }, []);

      const deleteTip = async (id) => {
        const listDoc = doc(db, 'tips', id);
        await deleteDoc(listDoc);
      };

      const handleUpdate = async (id, newTip) => {
        const postDoc = doc(db, 'tips', id);
        await updateDoc(postDoc, newTip);
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
        <div className='homePage'>
          {tipsList.map((tip, index) => {
            return (
              <div className='tips' key={tip.id}>
                <div className='tipsHeader'></div>
                <div className='title'>
                  <h1> {tip.title}</h1>
                </div>
                <div className='updateTip'>
                </div>
                <div>
                  <input
                    // key={tip.id}
                    type='number'
                    value={newTip.id}
                    onChange={(e) => setNewTip(e.target.value)}
                  />
                <button onClick={() => addNewTip(index)}>
                    <p>UPDATE TIP</p>
                  </button>
                </div>
                <div className='listTipsContainer'>$ {tip.addTip}.00</div>
                <div className='listTipsAuthor'>
                  <h3>@{tip.author.name}</h3>
                </div>
                <div className='deleteTip'>
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