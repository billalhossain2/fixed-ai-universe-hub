const loadAi = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  //Implementation of async await
  // toggleSpinner('loading');
  // try{
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   displayAi(data.data.tools)
  //   toggleSpinner('loaded-data')
  // }
  // catch(error){
  //   console.log('Error:-', error)
  // }

  //Implementation of promise
  toggleSpinner("loading");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayAi(data.data.tools);
      toggleSpinner("loaded-data");
    });
};
const loadMoreBtn = document.getElementById("show-more");
//store all loaded ais from api
let allLoadedAis = [];

//store spliced data
let limitedAis = [];

const loadMoreAis = (allAis) => {
  allLoadedAis = allAis;

  if (allLoadedAis.length > 3) {
    limitedAis = [...limitedAis, ...allLoadedAis.splice(0, 3)];
    loadMoreBtn.classList.remove("d-none");
  } else if (allLoadedAis.length === 3) {
    limitedAis = [...limitedAis, ...allLoadedAis];
    loadMoreBtn.classList.add("d-none");
  }
  return limitedAis;
};

//events listeners
loadMoreBtn.addEventListener("click", () => {
  displayAi(allLoadedAis);
});

const sortAisByDate = () => {
  limitedAis.sort((a, b) => {
    return new Date(b.published_in) - new Date(a.published_in);
  });
};

//sort ais after clicking btn in decending order
document.getElementById("sortBtn").addEventListener("click", () => {
  sortAisByDate(limitedAis);
  displayAi(limitedAis, "sort");
});

const displayAi = (allAis, isSort) => {
  const allAiContainer = document.getElementById("all-ai-container");
  allAiContainer.innerHTML = "";

  // Show mor part
  if (!isSort) {
    allAis = loadMoreAis(allAis);
  }

  // if(allAis.length > 6){
  //   allAis = allAis.slice(0,3);
  //   showMore.classList.remove('d-none');
  // }
  // else{
  //   showMore.classList.add('d-none')
  // }

  allAis.forEach((ai) => {
    console.log(ai);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="col car-height">
                  <div class="card">
                    <img src="${
                      ai.image
                    }" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title fw-bold">Features</h5>
                      <ol>
                        ${ai.features.map((feature) => {
                          return `<li>${feature}</li>`;
                        })}
                      </ol>
                      <hr>
                      <div class="details d-flex justify-content-between align-items-center bg-light p-2">
                        <div class="name">
                            <h5 class="card-title fw-bolder fs-4">${
                              ai.name
                            }</h5>
                            <p><i class="fa-solid fa-calendar-days"></i> ${
                              ai.published_in
                            }</p>
                        </div>
                        <div class="modal-icon text-primary">
                            <button onclick="loadModalDetails('${
                              ai.id
                            }')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="fa-solid fa-arrow-right-to-bracket"></i>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        `;
    allAiContainer.appendChild(div);
  });
};

// loader part
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading === "loading") {
    loaderSection.classList.remove("d-none");
  } else if (isLoading === "loaded-data") {
    loaderSection.classList.add("d-none");
  }
};

const loadModalDetails = async (aiId) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${aiId}`;
  console.log(url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data);
  } catch (error) {
    console.log("Error:-", error);
  }
};

const displayModalDetails = (idAi) => {
  console.log("modal details", idAi);
  const detailsContainer = document.getElementById("modal-container");
  detailsContainer.innerHTML = "";
  const modalBody = document.createElement("div");

  modalBody.innerHTML = `
        <div id="modal-container" class="modal-body gap-5 d-lg-flex m-3">
        <div class="modal-details py-3 px-4 rounded-3 mt-4">
        <h4>${idAi.description}</h4>
        <div class="packes mt-4 d-lg-flex d-md-flex gap-3 justify-content-center">
          <div class="one bg-white p-2 rounded-3 mb-3 text-success ">
            <h5 class="plan fs-5 text-center fw-bold">${
              idAi.pricing[0].plan
            }</h5>
            <h5 class="price fs-5 text-center fw-bold">${
              idAi.pricing[0].price
            }</h5>
          </div>
          <div class="two bg-white p-3 rounded-3 mb-3 text-warning">
            <h5 class="plan fs-5 text-center fw-bold">${
              idAi.pricing[1].plan
            }</h5>
            <h5 class="price fs-5 text-center fw-bold">${
              idAi.pricing[1].price
            }</h5>
          </div>
          <div class="three bg-white p-3 rounded-3 mb-3 text-danger">
            <h5 class="plan fs-5 text-center fw-bold">${
              idAi.pricing[2].plan
            }</h5>
            <h5 class="price fs-5 text-center fw-bold">${
              idAi.pricing[2].price
            }</h5>
          </div>
        </div>
        <div class="inpormation d-flex justify-content-between mt-3">
          <div class="features">
            <h3>Featuras</h3>
            <ul>
              <li>${
                idAi.features["1"].feature_name
                  ? idAi.features["1"].feature_name
                  : "No found"
              }</li>
              <li>${
                idAi.features["2"].feature_name
                  ? idAi.features["2"].feature_name
                  : "No found"
              }</li>
              <li>${
                idAi.features["3"].feature_name
                  ? idAi.features["3"].feature_name
                  : "no found"
              }</li>
            </ul>
          </div>
          <div class="integrations">
            <h3>Integrations</h3>
            <ul>
              <li>${
                idAi.integrations["1"] ? idAi.integrations["1"] : "No found"
              }</li>
              <li>${
                idAi.integrations["2"] ? idAi.integrations["2"] : "No found"
              }</li>
              <li>${
                idAi.integrations["3"] ? idAi.integrations["3"] : "No found"
              }</li>
            </ul>
          </div>
        </div>
       </div>
       <div class="img-area px-4 py-3 rounded-3 mt-4">
        <div class="img-box">
          <div class="badge-container">
            <img class="img-fluid rounded-3" src="${idAi.image_link[0]}" alt="">
            <span class="badge rounded-pill bg-danger">
              ${idAi.accuracy.score}
            </span>
          </div>
        </div>
        <div class="img-details text-center mt-3">
          <h2>Hi, how are you doing today?</h2>
          <p class="fs-5">I'm doing well, thank you for asking. How can I assist you today?</p>
        </div>
       </div>
       </div>
    `;

  detailsContainer.appendChild(modalBody);
};

loadAi();
