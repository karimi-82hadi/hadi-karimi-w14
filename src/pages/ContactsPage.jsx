import { json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ContactItem from "../components/ContactItem";
import contactsList from "../constants/contactsList";

import { IoAddOutline } from "react-icons/io5";

import styles from "./ContactsPage.module.css";

function ContactsPage() {
  const [contacts, setContacts] = useState(contactsList);
  const navigate = useNavigate();

  const favoriteHandler = (id) => {
    const targetContact = contacts.find((contact) => contact.id === id);
    targetContact.favorite = !targetContact.favorite;
    setContacts((contact) => [...contact]);
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  useEffect(() => {
    localStorage.setItem("contactsList", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className={styles.contactContainer}>
        {!contacts.length ? (
          <div className={styles.noContact}>
            <span>هیچ مخاطبی یافت نشد</span>
          </div>
        ) : (
          <div>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                data={contact}
                favoriteHandler={favoriteHandler}
                deleteHandler={deleteHandler}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.addContactBtn}>
        <button
          onClick={() => {
            navigate("/new");
          }}
        >
          <IoAddOutline />
          <span>ایجاد مخاطب جدید</span>
        </button>
      </div>
    </>
  );
}

export default ContactsPage;
