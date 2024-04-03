import React, { useContext, useState } from "react";
import { deleteContact } from "../utils/api";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { getContacts } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";
import { useEffect } from "react";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState([]);

  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const onDeleteHandler = async (id) => {
    await deleteContact(id);

    const { data } = await getContacts;
    setContacts(data);
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredContacts =
    contacts.length > 0
      ? contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(keyword.toLowerCase());
        })
      : [];

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === "id" ? "Daftar Kontak" : "Contacts List"}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
};

export default HomePage;
