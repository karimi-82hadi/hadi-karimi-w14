import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";

import contactsList from "../constants/contactsList";

import avatarImg from "../assets/img/contact.png";

import { FaPhoneAlt, FaRegUser } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineEdit, MdOutlineMail } from "react-icons/md";

import styles from "./ContactForm.module.css";

function ContactForm() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(contactsList);
  const [contactAvatar, setContactAvatar] = useState(avatarImg);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: contactAvatar,
    favorite: false,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const fileHandler = (e) => {
    setContactAvatar(window.URL.createObjectURL(e.target.files[0]));
  };

  const addHandler = (e) => {
    e.preventDefault();

    if (!contact.name) {
      return toast.error("لطفا نام خود را وارد نمایید");
    }
    if (!contact.lastName) {
      return toast.error("لطفا نام خانوادگی خود را وارد نمایید");
    }
    if (!contact.email) {
      return toast.error("لطفا ایمیل خود را وارد نمایید");
    }
    if (!contact.phoneNumber || !/^09[0-9]{9}/.test(contact.phoneNumber)) {
      return toast.error("لطفا شماره تلفن همراه خود را به درستی وارد نمایید");
    }

    const newContact = { ...contact, id: v4(), avatar: contactAvatar };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      avatar: "",
    });
    toast.success("مخاطب با موفقیت ذخیره شد.");
    setTimeout(() => {
      navigate("/contacts");
    }, 5000);
  };

  useEffect(() => {
    localStorage.setItem("contactsList", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <form onSubmit={addHandler} className={styles.ContactForm}>
        <div className={styles.contactAvatar}>
          <label htmlFor="contact-image">
            <input
              id="contact-image"
              name="contact-image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/webp"
              onChange={fileHandler}
            />
            <img src={contactAvatar} />
            <button>
              {contactAvatar === avatarImg ? <IoAddOutline /> : <MdOutlineEdit />}
            </button>
          </label>
        </div>
        <div className={styles.contactFormInner}>
          <div className={styles.inputContainer}>
            <div>
              <FaRegUser />
            </div>
            <div>
              <div className={styles.inputFields}>
                <label htmlFor="name">نام</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={contact.name}
                  onChange={changeHandler}
                />
              </div>
              <div className={styles.inputFields}>
                <label htmlFor="lastName">نام خانوادگی</label>
                <input
                  type="text"
                  name="lastName"
                  autoComplete="off"
                  value={contact.lastName}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div>
              <MdOutlineMail />
            </div>
            <div>
              <div className={styles.inputFields}>
                <label htmlFor="email">آدرس ایمیل</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div>
              <FaPhoneAlt />
            </div>
            <div>
              <div className={styles.inputFields}>
                <label htmlFor="phoneNumber">شماره تلفن</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  autoComplete="off"
                  value={contact.phoneNumber}
                  onChange={changeHandler}
                  maxLength={11}
                />
              </div>
            </div>
          </div>
          <div className={styles.submitBtnContainer}>
            <button type="submit">ذخیره</button>
          </div>
        </div>
      </form>
      <ToastContainer rtl={true} />
    </>
  );
}

export default ContactForm;