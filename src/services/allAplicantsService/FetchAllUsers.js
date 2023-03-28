/**
 * @fileoverview Asynchronous function to get all candidates
 * @author Daniel Sánchez Gonzalez
 */

import { CANDIDATES_URL } from '../../config/urls';

async function FetchAllUsers () {
    
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'auth-token': sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : localStorage.getItem('token')}, 
        };
        const getDatas = async () => {
            const response = await fetch(`${CANDIDATES_URL}`, requestOptions)
            const data = await response.json();
            return data;
        }
    
        try {
            let datas = await getDatas();
            return datas;
          } catch (error) {
            throw new Error('Error fetching job data');
          }
    }
    
    export default FetchAllUsers;