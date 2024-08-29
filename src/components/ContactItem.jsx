import { useNavigate } from "react-router-dom";

import { MdFavorite, MdFavoriteBorder, MdOutlineEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import avatarImg from "../assets/img/contact.png";

import styles from "./ContactItem.module.css";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function ContactItem({ data, favoriteHandler, deleteHandler }) {
  const { id, name, lastName, email, phoneNumber, avatar, favorite } = data;
  const navigate = useNavigate();
  const [showOption, setShowOption] = useState(false);

  const openPageContact = () => {
    navigate(`/contacts/${id}`);
  };

  const showOptionHandler = () => {
    setShowOption((option) => (option = !option));
  };

  return (
    <div className={styles.ContactItem} onClick={openPageContact}>
      <div className={styles.ContactAvatar}>
        <img src={avatar ? avatar : avatarImg} />
      </div>
      <div className={styles.ContactInfo}>
        <div>
          <span>
            {name} {lastName}
          </span>
        </div>
        <div>
          <span>{email}</span>
        </div>
        <div>
          <span>{phoneNumber}</span>
        </div>
      </div>
      <div className={styles.ContactAction}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            favoriteHandler(id);
          }}
        >
          {favorite ? (
            <MdFavorite fill="var(--color-error)" />
          ) : (
            <MdFavoriteBorder />
          )}
        </button>
        <button>
          <MdOutlineEdit />
        </button>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showOptionHandler();
            }}
          >
            <HiDotsVertical />
          </button>
          {showOption && (
            <span className={styles.contactOption}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler(id);
                }}
              >
                <RiDeleteBin6Line />
                <span>حذف کردن</span>
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
