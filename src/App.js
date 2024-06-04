import { useEffect, useState } from "react";
import supabase from "./supabase.js";
import "./styles.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "life", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let query = supabase.from("Facts_Data").select("*").limit(1000);
      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }
      const { data: Facts_Data, error } = await query;
      if (error) alert("Sorry, there was an error.");
      else setFacts(Facts_Data);
      setLoading(false);
    }

    getData();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <Forms setFacts={setFacts} /> : null}
      <main className="main">
        <CategoryFiltering setCurrentCategory={setCurrentCategory} />
        {loading ? <Loader /> : <FactsList facts={facts} setFacts={setFacts} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message-loader">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const AppTitle = "Today I Learned";

  return (
    <header className="header-format">
      <div className="logo">
        <img src="logo.png" height="70px" width="70px" />
        <h1>{AppTitle}</h1>
      </div>
      <button
        className="butt butt-share-a-fact"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close" : "Share a Fact"}
      </button>
    </header>
  );
}

function CategoryFiltering({ setCurrentCategory }) {
  return (
    <aside className="side-buttons">
      <ul>
        <li>
          <button
            className="butt all-butt"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((itr) => (
          <li key={itr.name}>
            <button
              className="butt category-butt"
              style={{ backgroundColor: itr.color }}
              onClick={() => setCurrentCategory(itr.name)}
            >
              {itr.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function Forms({ setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("https://example.com");
  const [category, setCategory] = useState("");
  const [upload, setUpload] = useState(false);
  const length = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      text &&
      isValidHttpUrl(source) &&
      category &&
      length > 0 &&
      length <= 200
    ) {
      setUpload(true);
      const { data: newFact, error } = await supabase
        .from("Facts_Data")
        .insert([{ text, source, category }])
        .select();
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      else alert("Sorry! Error. Please Try Again");
      setUpload(false);
      setText("");
      setSource("");
      setCategory("");
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={setUpload}
      />
      <span>{200 - length}</span>
      <input
        type="text"
        placeholder="Trustworthy source.."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={setUpload}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose a category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="butt" disabled={setUpload}>
        Post
      </button>
    </form>
  );
}

function FactsList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message-loader">
        No facts for this category! Let's create one
      </p>
    );
  }
  return (
    <section className="section-part">
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  async function handleVotes(buttonChoice) {
    const { data: InterestingVotes, err1 } = await supabase
      .from("Facts_Data")
      .update({ [buttonChoice]: fact[buttonChoice] + 1 })
      .eq("id", fact.id)
      .select();
    if (!err1) {
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? InterestingVotes[0] : f))
      );
    }
  }
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️DISPUTED]</span> : null}
        {fact.text}
      </p>

      <a href={fact.source}>Source</a>

      <span
        className="hash-values"
        style={{
          backgroundColor:
            CATEGORIES.find((x) => x.name === fact.category)?.color || "#000",
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVotes("votesInteresting")}>
          <strong>{fact.votesInteresting}</strong>👍
        </button>
        <button onClick={() => handleVotes("votesMindblowing")}>
          <strong>{fact.votesMindblowing}</strong>🤯
        </button>
        <button onClick={() => handleVotes("votesFalse")}>
          <strong>{fact.votesFalse}</strong>⛔️
        </button>
      </div>
    </li>
  );
}

export default App;
