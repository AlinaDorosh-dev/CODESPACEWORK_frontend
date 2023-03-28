async function FetchUserData() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("accessToken")
                ? sessionStorage.getItem("accessToken")
                : localStorage.getItem("token"),
        },
    };
    const getUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/candidate/${sessionStorage.getItem(
                    "userId"
                )}`,
                requestOptions
            );
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.log(error.message);
        }
    };

    let user = await getUser();

    return user;
}

export default FetchUserData;
