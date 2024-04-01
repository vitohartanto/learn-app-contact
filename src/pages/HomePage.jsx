import React from "react";
import { deleteContact } from "../utils/api";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { getContacts } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

const HomePageWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };
  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      keyword: props.defaultKeyword || "",
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onDeleteHandler = async (id) => {
    await deleteContact(id);

    const { data } = await getContacts();

    this.setState(() => {
      return {
        contacts: data,
      };
    });
  };

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  componentDidMount = async () => {
    const { data } = await getContacts();

    this.setState(() => {
      return {
        contacts: data,
      };
    });
  };

  render() {
    const contacts = this.state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section>
              <SearchBar
                keyword={this.state.keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              <h2>{locale === "id" ? "Daftar Kontak" : "Contacts List"}</h2>
              <ContactList
                contacts={contacts}
                onDelete={this.onDeleteHandler}
              />
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

export default HomePageWrapper;
