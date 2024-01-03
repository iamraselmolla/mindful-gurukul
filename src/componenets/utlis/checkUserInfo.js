export function checkLogin() {
    const user = localStorage.getItem('user')
    if (!user) {
        return false
    }
    return true
}

export function findName() {
    const nameJson = JSON.parse(localStorage.getItem('user'))
    if (nameJson) {
        const { name } = nameJson
        return name;
    }
}