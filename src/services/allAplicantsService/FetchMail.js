/**
 * @fileoverview Asynchronous function to send an email
 * @author Daniel Sánchez Gonzalez
 */

import { EMPLOYER_JOBS } from "../../config/urls";

async function FetchMail (email, name, refused, job, acepted) {
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'auth-token': sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : localStorage.getItem('token') },
            body: JSON.stringify({ email: email, name: name, job: job, acepted: acepted, refused: refused })
        };
        const getDatas = async () => {
            try{
            const response = await fetch(`${EMPLOYER_JOBS}/email`, requestOptions)
            const data = await response.json();
            return true;
            }catch(error){
            return false;
            }
        
        }
        let datas = await getDatas();
        return datas;
    }

export default FetchMail;