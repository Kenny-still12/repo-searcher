import Result from "./Result.jsx"
import { useState } from "react"

export default function App() {

  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  function handleChange(event) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setUserName(value);
    console.log(userName)
  }

  async function temporaryButton() {
    setLoading(true)

    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      setUserData(data)
    } catch (err) {
      setError("Something went Wrong!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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

      <Result loading={loading} userData={userData} temporaryButton={temporaryButton} />
    </>
  )

}