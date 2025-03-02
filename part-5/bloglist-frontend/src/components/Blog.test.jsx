import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('by default, title & author is found, url & likes is not', async () => {
  const blog = {
    'title': 'test title',
    'author': 'test author',
    'url': 'test url',
    'likes': 98765
  }

  const user = {
    'username': 'testusername',
    'user': 'testuser'
  }

  const mockOnUpdateHandler = vi.fn()
  const mockOnDeleteHandler = vi.fn()

  const { container } = render(<Blog blog={blog}
    currentUser={user}
    onUpdate={mockOnUpdateHandler}
    onRemove={mockOnDeleteHandler}/>)

  screen.debug()

  const titleElement = screen.queryByText('test title')
  const authorElement = screen.queryByText('test author')
  const urlElement = await screen.queryByText('test url')
  const likesElement = await screen.queryByText('98765')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})