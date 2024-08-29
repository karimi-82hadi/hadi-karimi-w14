const data = localStorage.getItem("contactsList");
const contactsList = JSON.parse(data) || [];

export default contactsList;
