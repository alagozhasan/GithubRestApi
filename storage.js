class Storage {
    static getSearchedUsersFromStorage() {
        //Tüm kullanıcıları al
        let users;
        if (localStorage.getItem("searched") === null) {
            //starage boş
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSearchedUserToStorage(username) {
        //Kullanıcı ekle
        let users = this.getSearchedUsersFromStorage();

        //indexof
        if (users.indexOf(username) === -1) {
            users.push(username);
        } localStorage.setItem("searched", JSON.stringify(users));


    }
    static clearSearchedUserFromStorage() {
        //Tüm kullanıcıları sil
        localStorage.removeItem("searched");

    }
}