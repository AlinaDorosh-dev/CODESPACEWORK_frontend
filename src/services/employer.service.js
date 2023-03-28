import { Employer } from '../models/employer model';

export class EmployerService {
    //GET: loginId (crear el usuario)
    static async getById(userId) {
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        if (!token) {
            return false;
        }

        //petición all backend
        const request = await fetch(
            'http://localhost:8000/employer/' + userId,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Employer(data.data);
    }
    //PATCH: Update->UserId || loginID
    static async editemployer(userId, body) {
        //cogemos el token del local storage
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        //comprobamos si ha cogido el token
        if (!token) {
            return false;
        }
        // Peticion al backend
        const request = await fetch(
            'http://localhost:8000/employer/' + userId,
            {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Employer(data.data);
    }

    //POST:  Create-> UserId || loginID
    static async newemployer(body) {
        //cogemos el token del local storage
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        //comprobamos si ha cogido el token
        if (!token) {
            return false;
        }
        //Peticion al backend
        const request = await fetch('http://localhost:8000/employer', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token,
            },
        });
        const data = await request.json();
        return new Employer(data.data);
    }

    //POST
    static async uploadImage(file, _id) {
        //cogemos el token del local storage
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        //comprobamos si ha cogido el token
        if (!token) {
            return false;
        }
        const formData = new FormData();
        formData.append('file0', file);

        //Peticion al backend
        const request = await fetch(
            'http://localhost:8000/employer/' + _id + '/logo',
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Employer(data.data);
    }
}
