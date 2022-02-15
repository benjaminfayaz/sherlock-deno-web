import React, { FormEvent, useState } from 'react'
import type { WebFormatterOptions } from "../adapter/web-formatter.ts"
import SearchIcon from "./SearchIcon.tsx";
import "../style/search.css";

type SearchFormProps = {
  onSubmit: (username: string, options: WebFormatterOptions) => void
}

type SearchFormEventTarget = EventTarget & {
  "show-all-checkbox": HTMLInputElement;
  "export-checkbox": HTMLInputElement;
  "export-format": HTMLSelectElement & {value: "csv" | "json"};
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [username, setUsername] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const eventTarget = event.target as SearchFormEventTarget;
    const showAll = eventTarget["show-all-checkbox"].checked;
    const exportFormat = (eventTarget["export-checkbox"].checked || undefined) && eventTarget["export-format"].value;

    onSubmit(username, {showAll, exportFormat});
  }

  return (
    <form onSubmit={submitForm}>
      <div className="input-wrapper">
        <input onChange={event => setUsername(event.target.value)} value={username} placeholder="Username" />
        <button type="submit"><SearchIcon /></button>
      </div>
      <div className="checkbox-wrapper">
        <label>
          <input name="show-all-checkbox" type="checkbox" />
          <div className="custom-checkbox"></div>
          Show all results
        </label>
        <label>
          <input name="export-checkbox" type="checkbox" />
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
