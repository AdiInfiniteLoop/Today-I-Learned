const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

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

//Selecting DOM elements
const shareButton = document.querySelector(".butt-share-a-fact");

const fact_form = document.querySelector(".fact-form");

const factsList = document.querySelector(".facts-list");

try {
  factsList.innerHTML = `<div></div>`; /* If = "" doesn't works use empty div*/
} catch (error) {
  console.log("Error here");
}

//Creating DOM elements(DOM Manipulation)
function createList(dataArray) {
  const content = dataArray.map(
    (itr) => `<li class="fact">
  <p>
  ${itr.text}
  <a href=${itr.source} target ="__blank">Source</a>
  </p>
    <span
      class="hash-values"
      style="padding-bottom: 7px; background-color: ${
        CATEGORIES.find((x) => x.name == itr.category)?.color || "#000"
      }
      ">    
      ${itr.category}
  </span>
    <div class="vote-buttons">
      <button><strong>${itr.votesInteresting}</strong>👍</button>
      <button><strong>${itr.votesMindblowing}</strong>🤯</button>
      <button><strong>${itr.votesFalse}</strong>⛔️</button>
    </div>
  </li>`
  );
  const finalContent = content.join("");
  factsList.insertAdjacentHTML("afterbegin", finalContent);
}

//Fetch Data from SupaBase
async function loadfacts() {
  try {
    const res = await fetch(
      "https://vlpxkibxmcingforveej.supabase.co/rest/v1/Facts_Data",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscHhraWJ4bWNpbmdmb3J2ZWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMDI4NTMsImV4cCI6MjAzMjc3ODg1M30.IWGlofzqceU9Jw0KOXodFjRNbK7qvL6uhOXmtf0Vnmk",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscHhraWJ4bWNpbmdmb3J2ZWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMDI4NTMsImV4cCI6MjAzMjc3ODg1M30.IWGlofzqceU9Jw0KOXodFjRNbK7qvL6uhOXmtf0Vnmk",
        },
      }
    );

    const data = await res.json();
    console.log(res);
    // const data = res?.json();
    // const filteredData = data.filter((x) => x.category === "history");
    // console.log(filteredData);

    createList(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

loadfacts();

shareButton.addEventListener("click", function () {
  if (fact_form.classList.contains("hide")) {
    fact_form.classList.remove("hide");
    shareButton.textContent = "CLOSE";
  } else {
    fact_form.classList.add("hide");
    shareButton.textContent = "SHARE A FACT";
  }
});

// function solve(year) {
//   return new Date().getFullYear() - year;
// }

// let txt = "ffds xdxds dfdD";

// txt = txt.toUpperCase();
// console.log(txt);

// let x = 2003;

// const str = `The man is straight ${x}. Age is ${solve(x)}`;
// console.log(str);

//Array Functions

// const val = (parameter) =>
//   parameter <= new Date().getFullYear()
//     ? new Date().getFullYear() - parameter
//     : `Impossible for year ${new Date().getFullYear()}`;

// console.log(val(2003));

/* const fact = ["dada", 2];
console.log(fact);

//Spreading operator
const newfact = [...fact, 132];

//Multi-variable assignment
const [name, value] = fact;
 */

//Objects

// const obj1 = {
//   name: "Aditya",
//   age: 21,
//   summary: function () {
//     return `The name is ${this.name} with age ${this.age}`;
//   },
// };

// console.log(obj1.name);
// //Or
// console.log(obj1["age"]);

// console.log(obj1.summary());

/* forEach */
// let fact = [2, 3, 4, 5, 5, 3];

// fact.forEach(function (x) {
//   console.log(x);
// });

/* map() */
// fact = fact.map((x) => x * 11);

// fact.forEach(function (x) {
//   console.log(x);
// });

// const newArr = CATEGORIES.map(function (x) {
//   console.log(x.name);
// });

// const val = (parameter) =>
//   parameter <= new Date().getFullYear()
//     ? new Date().getFullYear() - parameter
//     : `Impossible for year ${new Date().getFullYear()}`;

// const newList = initialFacts.map((x) => val(x.createdIn));

// console.log(newList);

// const arr = [2, 33, 3, 2, 2, 21, 3].filter((itr) => itr & 1);
// console.log(arr);

// console.log([2, 3, 4, 5, 6, 7].find((itr) => itr & 1));
