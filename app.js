//Elementleri seçerim
const githubform = document.getElementById("github-form");
const nameinput = document.getElementById("githubname");
const clearlastusers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();


eventlisteners();

function eventlisteners() {
    githubform.addEventListener("submit", getData);
    clearlastusers.addEventListener("click", clearAllSearched);
    document.addEventListener("DomContentLoaded", getAllSearched);
}
function getData(e) {
    let username = nameinput.value.trim();
    if (username === "") {
        alert("Lütfen geçerli bir kullanıcıadı giriniz. ")
    } else {

        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    //Hata mesajı
                    // console.log("Hata")
                    ui.showError("Kullanıcı bulunamadı");
                } else {
                    ui.addSearchedUserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfos(response.user);
                    ui.showRepoInfos(response.repo);

                }

            })
            .catch(err =>
                // console.log(err)
                ui.showError(err)
            )
    }

    ui.clearInput();//input temizle
    e.preventDefault();
}
function clearAllSearched(e) {
    //Tüm arananları temizle
    if (confirm("Emin misiniz ?")) {
        Storage.clearSearchedUserFromStorage();
        ui.clearALlSearchedFromUI();
    }

}
function getAllSearched(e) {
    // Arananları Storagedan al ve Uiye ekle

    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`;

    });

    lastUsers.innerHTML = result;

}