//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.style.display = "flex";
  rootElem.style.flexFlow = "row wrap";
  rootElem.style.justifyContent = "center";
  rootElem.style.backgroundColor = "rgba(100,54,76,0.9)";
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    let currEpisode = document.createElement("div");
    let currEpisodeHeading = document.createElement("h2");
    currEpisodeHeading.textContent = `${episode.name} - S0${
      episode.season
    }E${episode.number < 10 ? "0" + episode.number : episode.number}`;
    let episodeDescription = document.createElement("p");
    episodeDescription.innerHTML = episode.summary;
    episodeDescription.addEventListener(
      "mouseover",
      function (event) {
        // highlight the mouseover target
        event.target.style.color = "orange";
        
          // reset the color after a short delay
          setTimeout(function () {
            event.target.style.color = "";
            
          }, 100);
      },
      false
    );
    let episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;

    rootElem.appendChild(currEpisode);
    currEpisode.appendChild(currEpisodeHeading);
    currEpisode.appendChild(episodeDescription);
    currEpisode.appendChild(episodeImg);

    currEpisode.style.width = "20%";
    currEpisode.style.height = "500px";
    currEpisode.style.border = "none";
    currEpisode.style.margin = "50px 0 0 50px";
    currEpisode.style.backgroundColor = "rgba(0,120,80,0.9)";
    currEpisode.style.color = "white";

    currEpisodeHeading.style.width = "90%";
    currEpisodeHeading.style.margin = "5px 0 0 5%";

    currEpisodeHeading.style.border = "solid";
    currEpisodeHeading.style.borderRadius = "5%";

    episodeDescription.style.width = "90%";
    episodeDescription.style.fontSize = "13px";
    episodeDescription.style.padding = "10% 0 0 5%";
    episodeDescription.style.height = "170px";

    episodeImg.style.width = "80%";
    episodeImg.style.height = "140px";
    episodeImg.style.margin = "5% 0 0 10%";
  });
}

window.onload = setup;
