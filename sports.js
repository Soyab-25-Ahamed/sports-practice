// get About players id
const playerInfo = document.getElementById('player-info');
// get Players Information id
const playerDetails = document.getElementById('player-details');
//  searchbar
const fiend = () => {
    playerInfo.innerHTML = '';
    const name = document.getElementById('about');
    const inputName = name.value;
    name.value = '';
    aboutInfo(inputName);
}
// About players Section
const aboutInfo = (data) => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => dispalay(data));
}

const dispalay = (info) => {
    info.teams.forEach(teams => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card  h-100">
                <img src="${teams.strTeamBadge}" class="card-img-top" alt="images">
                <div class="card-body">
                    <h5 class="card-title">${teams.strTeam}</h5>
                    <p class="card-text">${teams.strDescriptionEN.slice(0, 100)}</p>
                    <button onclick="more(${teams.idLeague})">Details</button>
                </div>
            </div>
        `;
        playerInfo.appendChild(div);
    });
}
// Players Information Section
const more = (id) => {
    const aboutPlayer = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`;
    fetch(aboutPlayer)
        .then(res => res.json())
        .then(data => loadMore(data));
}

const loadMore = (text) => {
    console.log(text);
    playerDetails.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${text.leagues[0].strBadge}" class="img-fluid rounded-start" alt="images">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${text.leagues[0].strCountry}</h5>
                <p class="card-text">${text.leagues[0].strDescriptionEN}</p>
            </div>
        </div>
    </div>
</div>
    `;
}