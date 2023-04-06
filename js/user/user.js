export const user = {
    get() {
       return JSON.parse(localStorage.getItem('currentUser')) || {}
    },
    set(data) {
        return localStorage.setItem('currentUser', JSON.stringify(data))
    },
    delete() {
        return localStorage.removeItem('currentUser')
    }
}

