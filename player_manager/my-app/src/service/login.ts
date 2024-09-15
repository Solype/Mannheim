
const fetcher = async (url : string, username : string, password : string) =>{
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
}

export const login = async (username : string, password : string) => {
    console.log(username, password);
    const response = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/login`, username, password);
    if (!response.ok) {
        throw new Error('Erreur lors de la connexion : ' + response.statusText);
    } else {
        const jsonResponse = await response.json();
        if (response.status === 200) {
        } else {
            throw new Error('Erreur lors de la connexion : ' + jsonResponse.content);
        }
    }
}

export const register = async (username : string, password : string, confirm : string) => {
    console.log(username, password, confirm);
    if (password !== confirm) {
        throw new Error('Les mots de passe ne sont pas identiques');
    }
    const response = await fetcher(`${process.env.NEXT_PUBLIC_API_URL}/register`, username, password);
    if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription : ' + response.statusText);
    } else {
        const jsonResponse = await response.json();
        if (jsonResponse.status === 200) {
        } else {
            throw new Error('Erreur lors de l\'inscription : ' + jsonResponse.content);
        }
    }
}
