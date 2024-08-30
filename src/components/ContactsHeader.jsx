import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

import styles from "./ContactsHeader.module.css";
import { FaSquareMinus } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";

function ContactsHeader({ contacts }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const allContacts = contacts;
  const checkedContacts = contacts.filter(
    (contact) => contact.checked === true
  );
  const navigate = useNavigate();

  const openPageContact = (id) => {
    navigate(`/contacts/${id}`);
  };

  const searchHandler = (text) => {
    text = text.toLowerCase().trim();
    const newContacts = allContacts.filter(
      (contact) =>
        contact.fullName.toLowerCase().trim().includes(text) ||
        contact.email.toLowerCase().trim().includes(text)
    );
    setSearchResult(newContacts);
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
    searchHandler(e.target.value);
  };

  return (
    <div className={styles.contactsHeader}>
      <div className={styles.contactsHeaderSearch}>
        <h2>جست و جو در مخاطبین</h2>
        <div>
          <input
            type="text"
            value={search}
            onChange={changeHandler}
            placeholder="جست و جو کنید"
          />
          <button>
            <IoSearch />
          </button>
          {!!searchResult.length && !!search.length && (
            <div className={styles.searchResult}>
              {searchResult.map((item) => (
                <SearchResultItem
                  key={item.id}
                  data={item}
                  openPageContact={openPageContact}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.contactsHeaderRow}>
        {checkedContacts.length ? (
          <div className={styles.contactsHeaderAction}>
            <span>{checkedContacts.length} انتخاب شده</span>
            <div>
              <button>
                <FaSquareMinus />
              </button>
              <button>
                <IoMdDoneAll />
              </button>
              <button>
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
  );
}

export default ContactsHeader;

const SearchResultItem = ({ data, openPageContact }) => {
  return (
    <div
      className={styles.searchResultItem}
      onClick={() => openPageContact(data.id)}
    >
      <div>
        <img src={data.avatar} />
      </div>
      <div>
        <span>{data.fullName}</span>
        <span>{data.email}</span>
      </div>
    </div>
  );
};
