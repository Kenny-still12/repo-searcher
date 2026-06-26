export default function Result({ loading, userData, temporaryButton }) {

    if (loading) {
        return (
            <div className="result-container">
                <p className="loading">Loading...</p>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="result-container">
                <p className="search">Looking for Someone?</p>
                <button onClick={temporaryButton}>Search Now</button>
            </div>
        )
    }

    return (
        <>
            <div className="result-container">
                <div className="user-info">
                    <a href={userData.html_url}><h1>{userData.login}</h1></a>
                    <img src={userData.avatar_url} alt="" />
                </div>
                <p className="bio">{userData.bio}</p>
                <p>{userData.repos_url}</p>
            </div>
        </>
    )
}