import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'

function CreateBlogForm({ onCreate }) {
  // create blog form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <Typography variant="h6">Create new</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onCreate({ title, author, url })
          setTitle('')
          setAuthor('')
          setUrl('')
        }}
      >
        <div>
          <TextField
            sx={{
              height: 35,
              '& .MuiInputBase-root': {
                height: 30, // Adjust the height here
              },
              '& .MuiInputBase-input': {
                padding: '8px', // Adjust padding for input content
              },
              '& .MuiFormLabel-root': {
                fontSize: '0.75rem', // Smaller font size for the label
                top: '-8px', // Adjust label position upwards when unfocused
              },
            }}
            label="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{
              height: 35,
              '& .MuiInputBase-root': {
                height: 30, // Adjust the height here
              },
              '& .MuiInputBase-input': {
                padding: '8px', // Adjust padding for input content
              },
              '& .MuiFormLabel-root': {
                fontSize: '0.75rem', // Smaller font size for the label
                top: '-8px', // Adjust label position upwards when unfocused
              },
            }}
            label="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{
              height: 35,
              '& .MuiInputBase-root': {
                height: 30, // Adjust the height here
              },
              '& .MuiInputBase-input': {
                padding: '8px', // Adjust padding for input content
              },
              '& .MuiFormLabel-root': {
                fontSize: '0.75rem', // Smaller font size for the label
                top: '-8px', // Adjust label position upwards when unfocused
              },
            }}
            label="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">create</Button>
      </form>
    </div>
  )
}

export default CreateBlogForm
