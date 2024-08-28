import ContactItem from "../components/ContactItem";
import contactsList from "../constants/contactsList";

function ContactsPage() {
  const contactsData = contactsList;

  if (!contactsData.length) {
    return <div>هیچ مخاطبی یافت نشد</div>;
  }

  return (
    <div>
      {contactsData.map((contact) => (
        <ContactItem key={contact.id} data={contact} />
      ))}
    </div>
  );
}

export default ContactsPage;
