//You can edit ALL of the code here
function setup() {
  // fetching from the api:
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
    });
}

//selecting the "root" div in the html
const rootElem = document.getElementById("root");

//creating a header that will contain the title of the page that is linked to tv maze website
let mainHeader = document.createElement("h1");
rootElem.appendChild(mainHeader);

let mainHeaderLink = document.createElement("a");
mainHeaderLink.textContent = "GOT Episodes, Extracted from TVMaze.com";
mainHeaderLink.href = "https://www.tvmaze.com/";
mainHeaderLink.target = "_blank";
mainHeader.appendChild(mainHeaderLink);
//edit this to display the total number of episodes:
// rootElem.textContent = `Got ${episodeList.length} episode(s)`;

// this function renders the episodes on the page
function makePageForEpisodes(episodeList) {
  let subjectSel = document.getElementById("subject");
  episodeList.forEach((episode) => {
    let currEpisode = document.createElement("li");
    currEpisode.classList.add("episodes");
    let currEpisodeHeading = document.createElement("h2");
    currEpisodeHeading.classList.add("episodesHeadings");
    let episodeLink = document.createElement("A");
    episodeLink.classList.add("episodesLinks");
    episodeLink.href = episode._links.self.href.replace("api.", "");
    // console.log(episodeLink.href);
    episodeLink.target = "_blank";

    episodeLink.textContent = `${episode.name} - S0${episode.season}E${
      episode.number < 10 ? "0" + episode.number : episode.number
    }`;
    subjectSel.options[subjectSel.options.length] = new Option(
      `S0${episode.season}E${
        episode.number < 10 ? "0" + episode.number : episode.number
      } - ${episode.name}`
    );
    currEpisodeHeading.appendChild(episodeLink);

    let episodeImg = document.createElement("img");
    episodeImg.classList.add("episodesImages");
    episodeImg.src = episode.image.medium;

    let episodeDescription = document.createElement("p");
    episodeDescription.classList.add("episodesDescriptions");

    episodeDescription.innerHTML = episode.summary;

    rootElem.appendChild(currEpisode);
    currEpisode.appendChild(currEpisodeHeading);
    currEpisode.appendChild(episodeImg);
    currEpisode.appendChild(episodeDescription);
  });
  subjectSel.onchange = function () {
    let userSelected = subjectSel.value.substring(0, 6).toUpperCase();
    // console.log(userSelected);
    let documentEpisodes = rootElem.getElementsByTagName("li");
    let episodeNames = document.getElementsByClassName("episodesLinks");
    // console.log(`at zero: ${episodeNames[0].textContent.includes("S01E")}`);
    for (let i = 0; i < episodeNames.length; i++) {
      if (episodeNames[i].textContent.toUpperCase().includes(userSelected)) {
        documentEpisodes[i].style.display = "";
      } else {
        documentEpisodes[i].style.display = "none";
      }
    }
  };
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

window.onload = setup;
