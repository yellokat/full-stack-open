import PropTypes from "prop-types";
import {useQuery} from "@apollo/client";
import {ALL_AUTHORS} from "../queries.js";

const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  const authors = response.data.allAuthors

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
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Authors
