const baseurl = "https://api.chucknorris.io"

const jokesRandom = `${baseurl}/jokes/random`;
const jokesRandomCategory = `${baseurl}/jokes/random?category`;
const categories = `${baseurl}/jokes/categories`;
const jokesSearch = `${baseurl}/jokes/search?query={query}`;

const header = document.getElementById("allCategories");
const h1 = document.getElementById("h1");
const btn = document.getElementById("btn");

const container = document.getElementById("container")

// ================ main jokes

const getApi = async () => {
  await axios
  .get(`${jokesRandom}`)
  .then((res) => {
    const getData = res.data;

       if (getData && getData.value) {
         h1.textContent = getData.value;
      } else {
        h1.innerHTML = `<h1>${getData.value}</h1>`;
      };
  }
  )
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
};

const showJokes = (data) => {
  h1.innerHTML = data((gio) => {
    return `<h1> ${gio.value} </h1>`
  })
}

getApi();
 btn.addEventListener(`click`, getApi);

// ============= joke categories to main text

const getCategories = async () => {
  await axios
    .get(`${categories}`)
    .then((res) => {
      const categoriesData = res.data;

      categoriesData.map((category) => {
        const categoryName = document.createElement("button");
        categoryName.textContent = category.toUpperCase();
        categoryName.classList.add("btn");
        categoryName.classList.add("btn-success");

        categoryName.addEventListener("click", async () => {
          const response = await axios.get(`${jokesRandomCategory}=${category}`);
          const jokeData = response.data;

          if (jokeData && jokeData.value) {
            h1.textContent = jokeData.value;
          }
        });

        header.appendChild(categoryName);
      });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
};


getCategories();

// ============= search joke

let search = document.getElementById("search");
let btnSearch = document.getElementById("btnSearch");

const searchJoke = async () => {
  let searchValue = search.value;
    if (searchValue.trim() === "") {
    h1.textContent = "Please enter a search query";
    return;
  }
 try {
    const response = await axios.get(`${baseurl}/jokes/search?query=${searchValue}`);
    const searchResult = response.data.result;

    if (searchResult && searchResult.length > 0) {
      if (searchResult[0].value.length > 10) {
        h1.textContent = searchResult[0].value; 
      } else {
        h1.textContent = "No jokes found for your query";
      }
    } else {
      h1.textContent = "No jokes found for your query"; 
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    h1.textContent = "Type more please";
  }
};

btnSearch.addEventListener("click", searchJoke);
