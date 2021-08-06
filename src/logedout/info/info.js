import "./info.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { doc, getDoc, setDoc, getFirestore  } from "firebase/firestore";
import { useState } from "react";
import { initializeApp } from "firebase/app";
const geofire = require('geofire-common');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHRkVZq1gWEQ4kWLsV--PjSdc2udL1kX4",
  authDomain: "firstmarketplace-d3d3b.firebaseapp.com",
  databaseURL: "https://firstmarketplace-d3d3b-default-rtdb.firebaseio.com",
  projectId: "firstmarketplace-d3d3b",
  storageBucket: "firstmarketplace-d3d3b.appspot.com",
  messagingSenderId: "506337230664",
  appId: "1:506337230664:web:7355588d6370176d6a3d7d",
  measurementId: "G-R8M8TSPN42"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();


function Info() {
  const [name, setName ] = useState("");
  const [num, setNum ] = useState("");
  const [year, setYear ] = useState("");
  const [numMem, setNumMem ] = useState("");
  const [comp, setComp ] = useState("FLL");
  const [position, setPosition ] = useState(null);

  const [locationAccess, setLocationAccess ] = useState("na");
  let history = useHistory();

  onAuthStateChanged(auth, async user => {
    if (user) {
      const docRef = doc(db, "user-info", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  });

  async function addTeam(form) {
    form.preventDefault();

    const user = auth.currentUser;
    const hash = geofire.geohashForLocation([position.coords.latitude, position.coords.longitude]);

    await setDoc(doc(db, "user-info", user.uid), {
      name: name,
      number: num,
      "num-mem": numMem,
      program: comp,
      "team-creation-year": year,
      geohash: hash,
      geopoint: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });

    history.push("/");
  }

  return (
    <div className="info">
      <article>
        <form onSubmit={addTeam}>
          <h1>Additional Team Information</h1>
            <section>
              <input type="text" required placeholder="Team Name" value={name}
                onChange={(val) => { setName(val.target.value); }}/>
              <input type="number" required placeholder="Team Number" value={num}
                onChange={(val) => { setNum(val.target.value); }}/>
              <input type="number" required placeholder="Team Founding Year" value={year}
                onChange={(val) => { setYear(val.target.value); }}/>
              <input type="number" required placeholder="Number of Team Members" value={numMem}
                onChange={(val) => { setNumMem(val.target.value); }}/>

              <select value={comp} onChange={(val) => { setComp(val.target.value); }}>
                <option value="FLL">FLL</option>
                <option value="FTC">FTC</option>
                <option value="FRC">FRC</option>
              </select>

              <button type="button" className="share-location"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((position) => { setLocationAccess("given");
                                                                           setPosition(position); },
                                                           () => { setLocationAccess("rejected"); });
                }}>Share Location</button>
            </section>
            {(locationAccess === "rejected") && <p>Please Allow Access To Your Location</p>}
          <button disabled={!(locationAccess === "given")}>Create Team</button>
        </form>
      </article>
    </div>
  );
}

export default Info;