import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './createBlogForm'

describe('Create Blog Form', () => {
  test('on submit, correct title/author/url must be passed as props', async () => {
    const mockHandler = vi.fn()
    const { container } = render(
      <CreateBlogForm handleCreateBlog={mockHandler} />,
    )

    // click on button to expand content
    const user = userEvent.setup()

    // enter text to textfields
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'new title')
    await user.type(inputs[1], 'new author')
    await user.type(inputs[2], 'new url')

    // click submit button
    const button = screen.getByText('create')
    await user.click(button)

    // verify props passed to handler
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('new title')
    expect(mockHandler.mock.calls[0][0].author).toBe('new author')
    expect(mockHandler.mock.calls[0][0].url).toBe('new url')
  })
})
