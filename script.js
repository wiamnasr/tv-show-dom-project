//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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
    console.log(userSelected);
    let documentEpisodes = rootElem.getElementsByTagName("li");
    let episodeNames = document.getElementsByClassName("episodesLinks");
    console.log(`at zero: ${episodeNames[0].textContent.includes("S01E")}`);
    for (let i = 0; i < episodeNames.length; i++) {
      if (episodeNames[i].textContent.toUpperCase().includes(userSelected)) {
        documentEpisodes[i].style.display = "";
      } else {
        documentEpisodes[i].style.display = "none";
      }
    }
  };

  /*
    🅢🅣🅨🅛🅘🅝🅖 😎
  */

  // Styling the rootElem
  rootElem.style.display = "flex";
  rootElem.style.flexFlow = "row wrap";
  rootElem.style.justifyContent = "center";
  rootElem.style.backgroundColor = "rgba(100,54,76,0.9)";
  rootElem.style.listStyleType = "none";
  rootElem.style.maxWidth = "100%";

  // // Styling the mainHeader
  mainHeader.style.display = "flex";
  mainHeader.style.justifyContent = "center";
  mainHeader.style.width = "100%";
  mainHeader.style.height = "200px";
  mainHeader.style.backgroundImage =
    "url(https://images.unsplash.com/photo-1515255384510-23e8b6a6ca3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80)";
  mainHeader.style.backgroundRepeat = "no-repeat";
  mainHeader.style.backgroundSize = "cover";
  mainHeader.style.backgroundPosition = "center";

  // Styling the mainHeaderLink:
  mainHeaderLink.style.textShadow = "2px 2px 8px #FF0000";
  mainHeaderLink.style.textDecoration = "none";
  mainHeaderLink.style.color = "white";
  mainHeaderLink.style.margin = "80px 0 0 0";

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
      for (let i = 0; i < episodes.length; i++) {
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
        episodesDescriptions[i].style.overflowX = "scroll";

        /*
        Starting here, those need to be in the styling bit and accounted for in the media query for page responsiveness
    */
        episodesDescriptions[i].removeEventListener(
          "mouseover",
          function (event) {
            // highlight the mouseover target
            event.target.style.color = "orange";
            event.target.style.fontSize = "23px";
            // currEpisode.style.height = "600px";
            episodes[i].style.width = "23%";
            episodes[i].style.height = "510px";
          },
          true
        );

        /*
        Until here
    */
      }
    } else {
      document.body.style.backgroundColor = "pink";
      for (let i = 0; i < episodes.length; i++) {
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
        episodesDescriptions[i].style.overflowX = "auto";

        /*
        Starting here, those need to be in the styling bit and accounted for in the media query for page responsiveness
    */
        episodesDescriptions[i].addEventListener(
          "mouseover",
          function (event) {
            // highlight the mouseover target
            event.target.style.color = "orange";
            event.target.style.fontSize = "23px";
            // currEpisode.style.height = "600px";
            episodes[i].style.width = "23%";
            episodes[i].style.height = "510px";
          },
          false
        );
        episodesDescriptions[i].addEventListener("mouseout", function (event) {
          event.target.style.color = "";
          event.target.style.fontSize = "13px";
          // currEpisode.style.height = "500px";
          episodes[i].style.width = "22%";
          episodes[i].style.height = "500px";
        });
        /*
        Until here
    */
      }
    }
  }

  var x = window.matchMedia("(max-width: 700px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes
}

// Done with styling

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
