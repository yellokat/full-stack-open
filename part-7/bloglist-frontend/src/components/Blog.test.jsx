import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Single Blog Component', () => {
  test('by default, title & author is found, url & likes is not.', () => {
    const testBlogData = {
      'title': 'test title',
      'author': 'test author',
      'url': 'test url',
      'likes': 98765
    }

    const testUserData = {
      'username': 'testusername',
      'user': 'testuser'
    }

    const mockOnUpdateHandler = vi.fn()
    const mockOnDeleteHandler = vi.fn()

    const { container } = render(<Blog blog={testBlogData}
      currentUser={testUserData}
      onUpdate={mockOnUpdateHandler}
      onRemove={mockOnDeleteHandler}/>)

    const titleElement = screen.queryByText('test title')
    const authorElement = screen.queryByText('test author')
    const urlElement = screen.queryByText('test url')
    const likesElement = screen.queryByText('98765')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('when blog component is expanded, url & likes are also visible.', async () => {
    const testBlogData = {
      'title': 'test title',
      'author': 'test author',
      'url': 'test url',
      'likes': 98765
    }

    const testUserData = {
      'username': 'testusername',
      'user': 'testuser'
    }

    const mockOnUpdateHandler = vi.fn()
    const mockOnDeleteHandler = vi.fn()

    const { container } = render(<Blog blog={testBlogData}
      currentUser={testUserData}
      onUpdate={mockOnUpdateHandler}
      onRemove={mockOnDeleteHandler}/>)

    // click on button to expand content
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleElement = screen.queryByText('test title')
    const authorElement = screen.queryByText('test author')
    const urlElement = screen.queryByText('test url')
    const likesElement = screen.queryByText('98765')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test('when like button is pressed twice, the event handler is also called twice.', async () => {
    const testBlogData = {
      'title': 'test title',
      'author': 'test author',
      'url': 'test url',
      'likes': 98765
    }

    const testUserData = {
      'username': 'testusername',
      'user': 'testuser'
    }

    const mockOnUpdateHandler = vi.fn()
    const mockOnDeleteHandler = vi.fn()

    const { container } = render(<Blog blog={testBlogData}
      currentUser={testUserData}
      onUpdate={mockOnUpdateHandler}
      onRemove={mockOnDeleteHandler}/>)

    // click on button to expand content
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // click like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockOnUpdateHandler.mock.calls).toHaveLength(2)
  })
})