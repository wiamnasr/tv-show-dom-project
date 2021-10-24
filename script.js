//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let mainHeader = document.createElement("h1");

  rootElem.style.display = "flex";
  rootElem.style.flexFlow = "row wrap";
  rootElem.style.justifyContent = "center";
  rootElem.style.backgroundColor = "rgba(100,54,76,0.9)";
  rootElem.appendChild(mainHeader);
  mainHeader.style.display = "flex";
  mainHeader.style.justifyContent = "center";
  mainHeader.style.width = "100%";
  mainHeader.style.height = "200px";
  mainHeader.style.backgroundImage ="url(https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)";
  mainHeader.style.backgroundRepeat = "no-repeat";
  mainHeader.style.backgroundSize = "cover";
  mainHeader.style.backgroundPosition = "center";

  let mainHeaderLink = document.createElement("A");
  mainHeaderLink.textContent =
    "Game of Thrones Episodes, Extracted from TVMaze.com";
    mainHeaderLink.style.textShadow = "2px 2px 8px #FF0000";
  mainHeaderLink.href = "https://www.tvmaze.com/";
  mainHeaderLink.target = "_blank";
  mainHeaderLink.style.textDecoration = "none";
  mainHeaderLink.style.color = "white";
  mainHeaderLink.style.margin = "100px 0 0 0";
  mainHeader.appendChild(mainHeaderLink);

  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    let currEpisode = document.createElement("div");
    let currEpisodeHeading = document.createElement("h2");
    let episodeLink = document.createElement("A");
    episodeLink.href = episode._links.self.href.replace("api.", "");
    episodeLink.target = "_blank";

    episodeLink.textContent = `${episode.name} - S0${episode.season}E${
      episode.number < 10 ? "0" + episode.number : episode.number
    }`;
    currEpisodeHeading.appendChild(episodeLink);

    let episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;

    let episodeDescription = document.createElement("p");
    episodeDescription.innerHTML = episode.summary;
    episodeDescription.addEventListener(
      "mouseover",
      function (event) {
        // highlight the mouseover target
        event.target.style.color = "orange";
        event.target.style.fontSize = "16px";

        // reset the color after a short delay
        // setTimeout(function () {
        //   event.target.style.color = "";
        //   event.target.style.fontSize = "13px";
        // }, 10000);
      },
      false
    );
    episodeDescription.addEventListener("mouseout", function (event){
        event.target.style.color = "";
        event.target.style.fontSize = "13px";
    });

    rootElem.appendChild(currEpisode);
    currEpisode.appendChild(currEpisodeHeading);
    currEpisode.appendChild(episodeImg);
    currEpisode.appendChild(episodeDescription);

    currEpisode.style.width = "20%";
    currEpisode.style.height = "500px";
    // currEpisode.style.border = "none";
    currEpisode.style.margin = "50px 0 0 50px";
    currEpisode.style.backgroundColor = "rgba(0,120,80,0.9)";
    currEpisode.style.color = "white";
    currEpisode.style.border = "solid";
    currEpisode.style.borderColor = "white";
    currEpisode.style.borderRadius = "2.5%";

    currEpisodeHeading.style.width = "90%";
    currEpisodeHeading.style.margin = "5px 0 0 5%";

    currEpisodeHeading.style.border = "solid";
    currEpisodeHeading.style.borderRadius = "5%";

    episodeLink.style.textDecoration = "none";
    episodeLink.style.padding = "0 0 0 5%";
    episodeLink.style.fontSize = "15px";
    episodeLink.style.color = "white";

    episodeDescription.style.width = "90%";
    episodeDescription.style.fontSize = "13px";
    episodeDescription.style.padding = "10% 0 0 5%";
    episodeDescription.style.height = "170px";

    episodeImg.style.width = "90%";
    episodeImg.style.height = "200px";
    episodeImg.style.margin = "5% 0 0 5%";
  });
}

window.onload = setup;
