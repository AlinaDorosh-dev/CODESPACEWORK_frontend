/**
 * @author iRaphiki <imraphiki@gmail.com>
 */
import { Candidate } from '../models/candidate.model';

export class CandidateService {
    // GET: loginId (create user)
    static async getById(userId) {
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        if (!token) {
            return false;
        }

        // Backend request
        const request = await fetch(
            'http://localhost:8000/candidate/' + userId,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Candidate(data.data);
    }
    // PATCH: Update ==> userId || loginId
    static async editCandidate(userId, body) {
        // Saving token from session storage or local storage.
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        // Checking if token have data.
        if (!token) {
            return false;
        }
        // Backend request
        const request = await fetch(
            'http://localhost:8000/candidate/' + userId,
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
        return new Candidate(data.data);
    }

    // POST:  Create ==> userId || loginId
    static async newCandidate(body) {
        // Saving token from session storage or local storage.
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        // Checking if token have data.
        if (!token) {
            return false;
        }
        // Backend request
        const request = await fetch('http://localhost:8000/candidate/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': token,
            },
        });
        const data = await request.json();
        return new Candidate(data.data);
    }

    // POST
    static async uploadImage(file, _id) {
        // Saving token from session storage or local storage.
        const token =
            sessionStorage.getItem('accessToken') ||
            localStorage.getItem('accessToken');

        // Checking if token have data.
        if (!token) {
            return false;
        }
        const formData = new FormData();
        formData.append('file0', file);

        // Backend request
        const request = await fetch(
            'http://localhost:8000/candidate/' + _id + '/photo',
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Auth-token': token,
                },
            },
        );
        const data = await request.json();
        return new Candidate(data.data);
    }
}
