//
// //
// // //
// Global Variables:
// // //
// //
//

const rootElem = document.getElementById("root");
const showsDropdown = document.getElementById("shows");
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

const selectedEp = async function () {
  let userShowChoiceValue = document.getElementById("shows").value;
  const response = await fetch(
    `https://api.tvmaze.com/shows/${userShowChoiceValue}/episodes`
  );

  const jsonObject = await response.json();

  makePageForEpisodes(jsonObject);
};

//
// //
// // //
// Functions:
// // //
// //
//

function setup() {
  const showsArr = getAllShows();

  showsArr.forEach((showObject) => {
    let newShowOption = document.createElement("option");
    newShowOption.value = showObject.id;
    newShowOption.innerText = showObject.name;
    showsDropdown.appendChild(newShowOption);
  });
}

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
  rootElem.innerHTML = "";
  rootElem.appendChild(mainHeader);
  episodesDropdown.innerHTML = "";
  episodeList.forEach((episode) => {
    rootElem.appendChild(createEpisodeCard(episode));
    episodesDropdown.options[episodesDropdown.options.length] = new Option(
      `S0${episode.season}E${
        episode.number < 10 ? "0" + episode.number : episode.number
      } - ${episode.name}`
    );
  });
}

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
      userSearchReturnedEpisodes === 1 ? "episode" : "episodes"
    }`;
  } else {
    mainHeaderLink.textContent =
      "sorry, your search query returned no matches...";
  }
  if (filter.length == 0) {
    mainHeaderLink.textContent = "GOT Episodes, Extracted from TVMaze.com";
  }
}

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

//
// //
// // //
// Listeners and Friends:
// // //
// //
//

episodesDropdown.onchange = displayOnlySelectedEpisode;
showsDropdown.onchange = selectedEp;

window.onload = setup;
