//
// //
// // //
// Global Variables:
// // //
// //
//

const rootElem = document.getElementById("root");
const showsDropdown = document.getElementById("showsDropdown");
const episodesDropdown = document.getElementById("episodes");
const mainHeader = document.createElement("h1");
rootElem.appendChild(mainHeader);

const mainHeaderLink = document.createElement("a");
mainHeaderLink.textContent = `Episodes Extracted from TVMaze.com`;
mainHeaderLink.href = "https://www.tvmaze.com/";
mainHeaderLink.target = "_blank";
mainHeader.appendChild(mainHeaderLink);

//
// //
// // //
// Async Functions:
// // //
// //
//

const selectedShowEpisodes = async function () {
  console.log(showsDropdown.value);
  if (showsDropdown.value === "") {
    rootElem.innerHTML = "";
    rootElem.appendChild(mainHeader);
    /*
      requires fixing, on change to default
    */
    episodesDropdown.innerHTML = "Select Episode";
  } else {
    let userShowChoiceValue = document.getElementById("showsDropdown").value;
    const response = await fetch(
      `https://api.tvmaze.com/shows/${userShowChoiceValue}/episodes`
    );

    const jsonObject = await response.json();

    makePageForEpisodes(jsonObject);
  }
};

//
// //
// // //
// Functions:
// // //
// //
//

// This function is called on page load
function setup() {
  //sorting in alphabetical order after getting the shows from shows.js
  const showsArr = getAllShows().sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  rootElem.innerHtml = "";
  rootElem.appendChild(mainHeader);

  for (let i = 0; i < showsArr.length; i++) {
    let newShowOption = document.createElement("option");
    newShowOption.value = showsArr[i].id;
    newShowOption.innerText = showsArr[i].name;
    showsDropdown.appendChild(newShowOption);
    rootElem.appendChild(createShowCard(showsArr[i]));
  }
}

// This function creates an episode card
function createEpisodeCard(episode) {
  let currEpisode = document.createElement("li");
  currEpisode.classList.add("episodes");
  let currEpisodeHeading = document.createElement("h2");
  currEpisodeHeading.classList.add("episodesHeadings");
  let episodeLink = document.createElement("A");
  episodeLink.classList.add("episodesLinks");
  episodeLink.href = episode._links.self.href.replace("api.", "");
  episodeLink.target = "_blank";

  episodeLink.textContent = `${episode.name} - S0${episode.season}E${
    episode.number < 10 ? "0" + episode.number : episode.number
  }`;

  currEpisodeHeading.appendChild(episodeLink);

  let episodeImg = document.createElement("img");
  episodeImg.classList.add("episodesImages");
  episodeImg.src = episode.image.medium;

  let episodeDescription = document.createElement("p");
  episodeDescription.classList.add("episodesDescriptions");

  episodeDescription.innerHTML = episode.summary;

  currEpisode.appendChild(currEpisodeHeading);
  currEpisode.appendChild(episodeImg);
  currEpisode.appendChild(episodeDescription);

  return currEpisode;
}

// this function renders the episodes on the page
function makePageForEpisodes(episodeList) {
  console.log(episodeList);
  rootElem.innerHTML = "";
  rootElem.appendChild(mainHeader);
  /*
      requires fixing, on change to default
  */
  episodesDropdown.innerHTML = "Select Episode";
  episodeList.forEach((episode) => {
    rootElem.appendChild(createEpisodeCard(episode));
    episodesDropdown.options[episodesDropdown.options.length] = new Option(
      `S0${episode.season}E${
        episode.number < 10 ? "0" + episode.number : episode.number
      } - ${episode.name}`
    );
  });
}

// Function called from the index.html onkeyup for the user input field with id="myInput"
// Offers live Search feature while as the user is typing text in the input field, episodes are filtered according to header (episode name and number) as well as episode description
function userSearchFunction() {
  //declare variables
  var input, filter, ul, li, a, description, i, txtValue, selectedSubject;
  input = document.getElementById("myInput");

  filter = input.value.toUpperCase();

  ul = document.getElementById("root");
  li = ul.getElementsByTagName("li");
  let userSearchReturnedEpisodes = 0;
  //loop through all list items, and hide those that do not match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    description = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    descValue = description.textContent || description.innerText;

    if (
      txtValue.toUpperCase().indexOf(filter) > -1 ||
      descValue.toUpperCase().indexOf(filter) > -1
    ) {
      li[i].style.display = "";
      userSearchReturnedEpisodes += 1;
    } else {
      li[i].style.display = "none";
    }
  }
  if (userSearchReturnedEpisodes > 0) {
    mainHeaderLink.textContent = `Your Search returned ${userSearchReturnedEpisodes} ${
      userSearchReturnedEpisodes === 1 ? "result" : "results"
    }`;
  } else {
    mainHeaderLink.textContent =
      "sorry, your search query returned no matches...";
  }
  if (filter.length == 0) {
    mainHeaderLink.textContent = "Show Episodes Extracted from TVMaze.com";
  }
}

// This function filters and shows only the user selected episode from the episodes dropdown
function displayOnlySelectedEpisode() {
  let userSelectedEpisode = episodesDropdown.value
    .substring(0, 6)
    .toUpperCase();
  console.log(userSelectedEpisode);

  let displayedEpisodes = rootElem.getElementsByTagName("li");
  let episodeNames = document.getElementsByClassName("episodesLinks");
  for (let i = 0; i < episodeNames.length; i++) {
    if (
      episodeNames[i].textContent.toUpperCase().includes(userSelectedEpisode)
    ) {
      displayedEpisodes[i].style.display = "";
    } else {
      displayedEpisodes[i].style.display = "none";
    }
  }
}

//Creating a show card:
function createShowCard(show) {
  let currShow = document.createElement("li");
  currShow.classList.add("shows");
  let currShowHeading = document.createElement("h2");
  currShowHeading.classList.add("showsHeadings");
  let showLink = document.createElement("A");
  showLink.classList.add("showsLinks");

  showLink.target = "_blank";

  showLink.textContent = show.name;

  const renderShowEpisodes = async function () {
    let showId = show.id;
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );

    const jsonObject = await response.json();

    makePageForEpisodes(jsonObject);
  };

  showLink.addEventListener("click", renderShowEpisodes);

  let showImg = document.createElement("img");
  showImg.classList.add("showsImages");
  showImg.src = show.image.medium;

  let showDescription = document.createElement("p");
  showDescription.classList.add("showsDescriptions");

  showDescription.innerHTML = show.summary;

  let showDetailsDiv = document.createElement("div");
  showDetailsDiv.classList.add("showDetails");

  let showRating = document.createElement("p");
  showRating.classList.add("showRatings");
  showRating.innerHTML = show.rating.average;

  let showGenres = document.createElement("p");
  showGenres.classList.add("showGenres");
  showGenres.innerHTML = show.genres;

  let showStatus = document.createElement("p");
  showStatus.classList.add("showStatus");
  showStatus.innerHTML = show.status;

  let showRuntime = document.createElement("p");
  showRuntime.classList.add("showRuntime");
  showRuntime.innerHTML = show.runtime;

  showDetailsDiv.append(showRating, showGenres, showStatus, showRuntime);

  currShowHeading.appendChild(showLink);

  currShow.append(currShowHeading, showImg, showDescription, showDetailsDiv);

  return currShow;
}

//
// //
// // //
// Listeners and Friends:
// // //
// //
//

episodesDropdown.onchange = displayOnlySelectedEpisode;
showsDropdown.onchange = selectedShowEpisodes;
document.getElementById("showsHome").addEventListener("click", setup);

window.onload = setup;
