import Header from "./Header.jsx";
import Result from "./Result.jsx"
import { useState, useEffect } from "react"

export default function App() {

  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  function handleChange(event) {
    const { value } = event.currentTarget;
    setUserName(value);
    console.log(userName)
  }

  function temporaryButton() {
    fetchUser()
  }

  async function fetchUser() {
    setLoading(true)

    try {
      const [userResponse, repoResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${userName}`),
        fetch(`https://api.github.com/users/${userName}/repos`)
      ]);

      if (!userResponse.ok || !repoResponse.ok) {
        setUserData(null)
        setRepos([])
        return
      }

      const user = await userResponse.json();
      const repositories = await repoResponse.json();

      setUserData(user)
      setRepos(repositories)
    } catch (err) {
      setError("Something went Wrong!")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("useEffect fired up!")
    if (!userName) return;

    const limitSearch = setTimeout(() => {
      console.log("Time Out!")
      fetchUser()
    }, 500);

    return () => clearTimeout(limitSearch)

  }, [userName])

  return (
    <>
      <Header />
      <div className="form-container">
        <form
          className="form"
          id="form"
        >
          <label htmlFor="userName">Search user name in git!</label>
          <input
            type="text"
            name="userName"
            placeholder="kenny-still-21"
            onChange={handleChange}
          />
          <button type="button" onClick={temporaryButton}>Search</button>
        </form>
      </div>

      <Result loading={loading} userData={userData} repos={repos} temporaryButton={temporaryButton} />
    </>
  )

}