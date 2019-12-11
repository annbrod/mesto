class Api {
    constructor ({baseUrl, headers}) {
      this.baseUrl = baseUrl
      this.headers = headers
    }
  
    getUserInfo () {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Что-то пошло не так ${res.status}`)
        })
    }

    patchUserInfo (name, about) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status}. Что-то пошло не так:(`);
      })
    }

   

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method:'GET',
            headers: this.headers
        })
        .then(res => {
            console.log(res);
            if(res.ok){
                
                return res.json();
            }
            return Promise.reject(`${res.status}. Что-то пошло не так:(`);
        })
        
    }

    }

   
  
    const api = new Api({
        baseUrl: 'http://95.216.175.5/cohort6',
        headers: {
          authorization: '42a98203-de24-427c-bcb2-c8aceb066d38',
          'Content-Type': 'application/json'
        }
      });
 

