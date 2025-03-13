import PropTypes from "prop-types";
import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries.js";
import {useEffect, useState} from "react";
import Select from "react-select";

const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS)
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState(null);
  const [editAuthor, editAuthorResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      props.setError(messages)
    }
  })

  useEffect(() => {
    if (editAuthorResult.data && editAuthorResult.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [editAuthorResult.data])

  if (!props.show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  const authors = response.data.allAuthors
  const nameOptions = [...authors].map((author) => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: {
        name: selectedOption.label,
        setBornTo: Number(born)
      }
    })

    setSelectedOption(null)
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((a) => (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {
        (!props.isLoggedIn) ? null : (<>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={nameOptions}
            />
            <div>
              born
              <input
                value={born}
                onChange={({target}) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>)
      }
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Authors
