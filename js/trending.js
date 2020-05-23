const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.displayResultsForMain = async function (endpoint) {
    try {
      const reposData = await axios(`https://ghapi.huchen.dev/repositories`);
      const developersData = await axios(`https://ghapi.huchen.dev/developers`);
      this.repos = reposData.data;
      this.developers = developersData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.displayResultsForCategories = async function (endpoint) {
    try {
      const reposData = await axios(
        `https://ghapi.huchen.dev/repositorieslanguage=${language}&since=daily`
      );
      const developersData = await axios(
        `https://ghapi.huchen.dev/developers?language${language}=&since=daily`
      );
      this.repos = reposData.data;
      this.developers = developersData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  return {
    Search,
  };
})();
const viewController = (function () {
  function getValue(e) {
    return e.target.textContent;
  }

  return {
    getValue,
  };
})();

// main controller module
const controller = (function () {
  // state
  const state = {};
  // Event listeners

  document
    .querySelector(".categories")
    .addEventListener("click", (e) => handleMain(e));

  // To toggle select menu
  document.querySelector(".selected").addEventListener("click", () => {
    document.querySelector(".options-container").classList.toggle("active");
  });

  // To update select menu
  document.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML = item.querySelector(
        "label"
      ).innerHTML;
      document.querySelector(".options-container").classList.remove("active");

      handleCategories(item);
    });
  });

  async function handleMain(e) {
    // 1. get the query
    let query = viewController.getValue(e);

    // 2. create and object and save into state
    state.type = new searchController.Search(query);
  }

  async function handleCategories(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.trending = new searchController.Search(query);

    // 3. make the request(search)
    await state.trending.displayResults();

    // console.log(state);
  }
})();
