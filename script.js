//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// this function renders the episodes on the page
function makePageForEpisodes(episodeList) {
  //selecting the "root" div in the html
  const rootElem = document.getElementById("root");
  //creating a header that will contain the title of the page that is linked to tv maze website
  let mainHeader = document.createElement("h1");
  console.log(rootElem.id);
  rootElem.appendChild(mainHeader);

  let mainHeaderLink = document.createElement("a");
  mainHeaderLink.textContent =
    "Game of Thrones Episodes, Extracted from TVMaze.com";
  mainHeaderLink.href = "https://www.tvmaze.com/";
  mainHeaderLink.target = "_blank";
  mainHeader.appendChild(mainHeaderLink);

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
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
    episodeDescription.addEventListener(
      "mouseover",
      function (event) {
        // highlight the mouseover target
        event.target.style.color = "orange";
        event.target.style.fontSize = "15px";
      },
      false
    );
    episodeDescription.addEventListener("mouseout", function (event) {
      event.target.style.color = "";
      event.target.style.fontSize = "13px";
    });

    rootElem.appendChild(currEpisode);
    currEpisode.appendChild(currEpisodeHeading);
    currEpisode.appendChild(episodeImg);
    currEpisode.appendChild(episodeDescription);
  });

  /*
    🅢🅣🅨🅛🅘🅝🅖 😎
  */

  // Styling the rootElem
  rootElem.style.display = "flex";
  rootElem.style.flexFlow = "row wrap";
  rootElem.style.justifyContent = "center";
  rootElem.style.backgroundColor = "rgba(100,54,76,0.9)";

  // // Styling the mainHeader
  mainHeader.style.display = "flex";
  mainHeader.style.justifyContent = "center";
  mainHeader.style.width = "100%";
  mainHeader.style.height = "200px";
  mainHeader.style.backgroundImage =
    "url(https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)";
  mainHeader.style.backgroundRepeat = "no-repeat";
  mainHeader.style.backgroundSize = "cover";
  mainHeader.style.backgroundPosition = "center";

  // Styling the mainHeaderLink:
  mainHeaderLink.style.textShadow = "2px 2px 8px #FF0000";
  mainHeaderLink.style.textDecoration = "none";
  mainHeaderLink.style.color = "white";
  mainHeaderLink.style.margin = "100px 0 0 0";

  //selecting classes for episodes, episodesHeadings, episodesLinks, episodesImages and episodesDescriptions
  let episodes = document.getElementsByClassName("episodes");
  let episodesHeadings = document.getElementsByClassName("episodesHeadings");
  let episodesLinks = document.getElementsByClassName("episodesLinks");
  let episodesImages = document.getElementsByClassName("episodesImages");
  let episodesDescriptions = document.getElementsByClassName(
    "episodesDescriptions"
  );

  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      document.body.style.backgroundColor = "yellow";
      for (let i = 0; i < episodes.length - 1; i++) {
        // Styling the episodes:
        episodes[i].style.width = "70%";
        episodes[i].style.height = "500px";
        episodes[i].style.margin = "50px 0 0 10px";
        episodes[i].style.backgroundColor = "rgba(0,120,80,0.9)";
        episodes[i].style.color = "white";
        episodes[i].style.border = "solid";
        episodes[i].style.borderColor = "white";
        episodes[i].style.borderRadius = "2.5%";

        // Styling the episodesHeadings:
        episodesHeadings[i].style.width = "90%";
        episodesHeadings[i].style.margin = "5px 0 0 5%";
        episodesHeadings[i].style.border = "solid";
        episodesHeadings[i].style.borderRadius = "5%";

        // Styling the episodesLinks:
        episodesLinks[i].style.textDecoration = "none";
        episodesLinks[i].style.padding = "0 0 0 5%";
        episodesLinks[i].style.fontSize = "15px";
        episodesLinks[i].style.color = "white";

        // Styling episodesImages:
        episodesImages[i].style.width = "90%";
        episodesImages[i].style.height = "200px";
        episodesImages[i].style.margin = "5% 0 0 5%";

        // Styling episodesDescriptions:
        episodesDescriptions[i].style.width = "90%";
        episodesDescriptions[i].style.fontSize = "13px";
        episodesDescriptions[i].style.padding = "0 0 0 5%";
        episodesDescriptions[i].style.height = "170px";
      }
    } else {
      document.body.style.backgroundColor = "pink";
      for (let i = 0; i < episodes.length - 1; i++) {
        // Styling the episodes:
        episodes[i].style.width = "22%";
        episodes[i].style.height = "500px";
        episodes[i].style.margin = "50px 0 0 50px";
        episodes[i].style.backgroundColor = "rgba(0,120,80,0.9)";
        episodes[i].style.color = "white";
        episodes[i].style.border = "solid";
        episodes[i].style.borderColor = "white";
        episodes[i].style.borderRadius = "2.5%";

        // Styling the episodesHeadings:
        episodesHeadings[i].style.width = "90%";
        episodesHeadings[i].style.margin = "5px 0 0 5%";
        episodesHeadings[i].style.border = "solid";
        episodesHeadings[i].style.borderRadius = "5%";

        // Styling the episodesLinks:
        episodesLinks[i].style.textDecoration = "none";
        episodesLinks[i].style.padding = "0 0 0 5%";
        episodesLinks[i].style.fontSize = "15px";
        episodesLinks[i].style.color = "white";

        // Styling episodesImages:
        episodesImages[i].style.width = "90%";
        episodesImages[i].style.height = "200px";
        episodesImages[i].style.margin = "5% 0 0 5%";

        // Styling episodesDescriptions:
        episodesDescriptions[i].style.width = "90%";
        episodesDescriptions[i].style.fontSize = "13px";
        episodesDescriptions[i].style.padding = "0 0 0 5%";
        episodesDescriptions[i].style.height = "170px";
      }
    }
  }

  var x = window.matchMedia("(max-width: 700px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
}

window.onload = setup;
