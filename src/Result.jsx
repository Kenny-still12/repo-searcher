export default function Result({ loading, userData, temporaryButton, repos }) {

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
                <h2>Repositories</h2>

                <ul>
                    {repos && repos.map(repo => (
                        <a href={repo.html_url}><li key={repo.id}>{repo.name}</li></a>
                    ))}
                </ul>
            </div>
        </>
    )
}