var accounts;
const save = () => {
    return localStorage.setItem('accounts', JSON.stringify(accounts))
}

export const storeAccounts = {
    get() {
        return JSON.parse(localStorage.getItem('accounts')) || []
    },
    set(value) {
        accounts = this.get()

        accounts.push(value)
        save()
    },
    update (index, newValue) {
        accounts = this.get()
        accounts[index] = newValue
        save()
    },
    delete(index) {
        accounts = this.get()
        accounts.splice(index, 1)

        save()
    }
}