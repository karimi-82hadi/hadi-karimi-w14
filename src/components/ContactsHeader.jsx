import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";

import ContactsSearch from "./ContactsSearch";

import { saveToLocalStorage } from "../helpers/helper";

import styles from "./ContactsHeader.module.css";

function ContactsHeader({ contacts, setContacts }) {
  const checkedContacts = contacts.filter(
    (contact) => contact.checked === true
  );

  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.checked === false);
    setContacts(newContacts);
    saveToLocalStorage(newContacts);
    toast.success(`${checkedContacts.length} مخاطب با موفقیت حذف شد.`);
  };

  return (
    <>
      <div className={styles.contactsHeader}>
        <ContactsSearch contacts={contacts} />
        <div className={styles.contactsHeaderRow}>
          {checkedContacts.length ? (
            <div className={styles.contactsHeaderAction}>
              <span>{checkedContacts.length} انتخاب شده</span>
              <div>
                <button onClick={deleteHandler}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.contactsHeaderLabel}>
              <span>نام و نام خانوادگی</span>
              <span>ایمیل</span>
              <span>شماره تلفن</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactsHeader;
