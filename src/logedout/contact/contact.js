import "./contact.css";
import { useState } from "react";
import { collection, Timestamp, getFirestore, addDoc  } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import config from "../../extra/config";

initializeApp(config);
const db = getFirestore();
const formSubmissions = collection(db, "contact-form-submissions");

function Contact() {
  const [formValue, setFormValue] = useState({name: "", email: "", question: ""});
  const [disabled, setDisabled] = useState(false);

  async function addQuestion(form) {
    form.preventDefault();
    setDisabled(true);
    await addDoc(formSubmissions, {
      to: "contact.firstmarketplace@gmail.com",
      message: {
        subject: "Question from" + formValue.name,
        text: "Name: " + formValue.name + "\nEmail: " + formValue.email + "\nQuestion: " + formValue.question
      },
      time: Timestamp.now()
    });

    setFormValue({name: "", email: "", question: ""});
    setDisabled(false);
  }

  return (
    <div className="contact">
      <form onSubmit={addQuestion}>
        <article>
          <h1>Questions? Contact us Below</h1>
            <input value={formValue.name} type="text" placeholder="Team Name or First Name" required
             onChange={(value) => setFormValue({name: value.target.value,
                                                email: formValue.email,
                                                question: formValue.question})}/>

            <input value={formValue.email} type="text" placeholder="Email Address" required
              onChange={(value) => setFormValue({name: formValue.name,
                          email: value.target.value,
                          question: formValue.question})}/>
            <textarea value={formValue.question} placeholder="Type your message here" required
              onChange={(value) => setFormValue({name: formValue.name,
                            email: formValue.email,
                            question: value.target.value})} />
          <button disabled={disabled}>Submit</button>
        </article>
      </form>
    </div>
  );
}

export default Contact;