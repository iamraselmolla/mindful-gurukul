const userInfo = localStorage.getItem('user')

export function checkLogin() {
    if (!userInfo) {
        return false
    }
    return true
}

export function findName() {
    const nameJson = JSON.parse(userInfo)
    if (nameJson) {
        const { name } = nameJson
        return name;
    }
}


export function findUserId() {
    const nameJson = JSON.parse(userInfo)
    const { id } = nameJson;
    return id
}