import { useNavigate } from "react-router-dom";

import { MdFavorite, MdFavoriteBorder, MdOutlineEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import avatarImg from "../assets/img/contact.png";

import styles from "./ContactItem.module.css";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function ContactItem({ data, favoriteHandler, deleteHandler, checkedHandler }) {
  const { id, fullName, email, phoneNumber, avatar, favorite, checked } = data;
  const [showOption, setShowOption] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);
  const navigate = useNavigate();

  const openPageContact = () => {
    navigate(`/contacts/${id}`);
  };

  const showOptionHandler = () => {
    setShowOption((option) => (option = !option));
  };

  return (
    <div
      className={`${styles.ContactItem} ${isChecked ? styles.checked : ""}`}
      onClick={openPageContact}
    >
      <div className={styles.ContactAvatar}>
        <img src={avatar ? avatar : avatarImg} />
        <input
          type="checkbox"
          checked={isChecked}
          onClick={(e) => {
            e.stopPropagation();
            checkedHandler(id);
          }}
          onChange={() => setIsChecked((isChecked) => !isChecked)}
        />
      </div>
      <div className={styles.ContactInfo}>
        <div>
          <span>{fullName}</span>
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
