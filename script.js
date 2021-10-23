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
    currEpisodeHeading.textContent = `Episode's Name: ${episode.name} - S0${
      episode.season
    }E${episode.number < 10 ? "0" + episode.number : episode.number}`;
    let episodeDescription = document.createElement("p");
    episodeDescription.innerHTML = episode.summary;
    let episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;
    
    
    rootElem.appendChild(currEpisode);
    currEpisode.appendChild(currEpisodeHeading);
    currEpisodeHeading.appendChild(episodeDescription);
    currEpisode.appendChild(episodeImg);



    currEpisode.style.width = "25%";
    currEpisode.style.height = "500px";
    currEpisode.style.border = "none";
    currEpisode.style.margin = "50px 0 0 50px";
    currEpisode.style.backgroundColor = "rgba(0,120,80,0.9)";
    currEpisode.style.color = "white";


    currEpisodeHeading.style.width = "100%";
    currEpisodeHeading.style.margin = "0 0 0 0";
    currEpisodeHeading.style.height = "10%";
    currEpisodeHeading.style.border = "solid";
    currEpisodeHeading.style.borderRadius = "20%";

    episodeDescription.style.width = "90%";
    episodeDescription.style.fontSize = "13px";
    // episodeDescription.style.margin = "10% 0 0 5%";
    episodeDescription.style.height = "50%";

    

    episodeImg.style.width = "100%";
    episodeImg.style.height = "40%";
    episodeImg.style.margin = "55% 0 0 0"

     
    
    
    



    
    

  });
 
  

}

window.onload = setup;
