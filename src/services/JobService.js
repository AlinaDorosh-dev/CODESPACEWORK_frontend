import { Job } from '../models/postAJob.model';

export class JobService {
    //GET: loginId (crear el job)
    static async getById(jobId) {
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');
        if (!token) {
            return false;
        }

        // Cambiar URL y en userid poner jobId
        //petición all backend
        const request = await fetch(
            'http://localhost:8000/job/job-single/' + jobId,

            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Job(data.data);
    }
    //PATCH: Update->JobId || loginID
    static async editjob(jobId, body) {
        //cogemos el token del local storage
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        //comprobamos si ha cogido el token
        if (!token) {
            return false;
        }
        // Peticion al backend
        try {
            const request = await fetch(
                `http://localhost:8000/job/edit-job/${jobId}`,
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
            return new Job(data.data);
        } catch (error) {}
    }

    //POST:  Create-> UserId || loginID
    static async newjob(body) {
        //cogemos el token del local storage
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        //comprobamos si ha cogido el token
        if (!token) {
            return false;
        }
        //Peticion al backend
        const request = await fetch('http://localhost:8000/job/post-job', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token,
            },
        });
        const data = await request.json();
        return new Job(data.data);
    }
}
