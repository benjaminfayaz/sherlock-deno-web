import React, { FormEvent, useState } from 'react'
import SearchIcon from "./SearchIcon.tsx";
import "../style/search.css";

type SearchFormProps = {
  onSubmit: (username: string) => void
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [username, setUsername] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(username);
  }

  return (
    <form onSubmit={submitForm}>
      <div className="input-wrapper">
        <input onChange={event => setUsername(event.target.value)} value={username} placeholder="Username" />
        <button type="submit"><SearchIcon /></button>
      </div>
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" />
          <div className="custom-checkbox"></div>
          Show all results
        </label>
        <label>
          <input type="checkbox" />
          <div className="custom-checkbox"></div>
          Export as
          <select name="export-format">
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </label>
      </div>
    </form>
  )
}
