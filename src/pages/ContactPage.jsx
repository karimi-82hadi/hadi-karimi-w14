import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineEdit,
  MdOutlineMail,
} from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import ContactForm from "../components/ContactForm";

import contactsList from "../constants/contactsList";
import { saveToLocalStorage } from "../helpers/helper";

import styles from "./ContactPage.module.css";

function ContactPage() {
  const { id } = useParams();
  const [contacts, setContacts] = useState(contactsList);
  const contact = contacts.find((contact) => contact.id === id);
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const navigate = useNavigate();

  const favoriteHandler = () => {
    const targetContact = contacts.find((contact) => contact.id === id);
    targetContact.favorite = !targetContact.favorite;
    setContacts((contacts) => [...contacts]);
    saveToLocalStorage(contacts);
    targetContact.favorite
      ? toast.success("مخاطب به لیست علاقه مندی اضافه شد.")
      : toast.success("مخاطب از لیست علاقه مندی حذف شد.");
  };

  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    toast.success("مخاطب با موفقیت حذف شد.");
    setTimeout(() => {
      setContacts(newContacts);
      saveToLocalStorage(newContacts);
      navigate("/contacts");
    }, 3000);
  };

  useEffect(() => {
    const newContacts = JSON.parse(localStorage.getItem("contactsList")) || [];
    setContacts(newContacts);
  }, [searchParams]);

  if (!contact)
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <h1 style={{ fontSize: "24px" }}>در حال بارگذاری...</h1>
      </div>
    );

  return (
    <>
      {+isEdit === 1 ? (
        <ContactForm isEdit={true} data={contact} />
      ) : (
        <div className={styles.contactContainer}>
          <div className={styles.contactAction}>
            <button onClick={deleteHandler}>
              <RiDeleteBin6Line />
            </button>
            <button onClick={() => setSearchParams("edit=1")}>
              <MdOutlineEdit />
            </button>
            <button onClick={favoriteHandler}>
              {contact.favorite ? (
                <MdFavorite fill="var(--color-error)" />
              ) : (
                <MdFavoriteBorder />
              )}
            </button>
          </div>
          <div className={styles.contactHeader}>
            <div className={styles.contactAvatar}>
              <img src={contact.avatar} />
            </div>
            <div>
              <h1>{contact.fullName}</h1>
            </div>
          </div>
          <div className={styles.contactDetails}>
            <h2>اطلاعات مخاطب</h2>
            <ul>
              <li>
                <span>
                  <MdOutlineMail />
                </span>
                <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
              </li>
              <li>
                <span>
                  <FaPhoneAlt />
                </span>
                <Link to={`tel:${contact.phoneNumber}`}>
                  {contact.phoneNumber}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <ToastContainer rtl={true} autoClose={2000} pauseOnFocusLoss={false} />
    </>
  );
}

export default ContactPage;
