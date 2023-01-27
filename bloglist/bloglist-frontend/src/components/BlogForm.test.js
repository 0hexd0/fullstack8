import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


describe('<BlogForm />', () => {
  test('blogObject are constructed correctly',async () => {
    const addBlog = jest.fn()
    render(<BlogForm createBlog={addBlog}/>)
    const inputs = screen.getAllByRole('textbox')
    const user = userEvent.setup()
    await user.type(inputs[0], 'testing title' ) // add title
    await user.type(inputs[1], 'testing author' ) // add author
    await user.type(inputs[2], 'http://www.testingurl.com' ) // add url
    const button = screen.getByText('create')
    await user.click(button)
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing title' )
    expect(addBlog.mock.calls[0][0].author).toBe('testing author' )
    expect(addBlog.mock.calls[0][0].url).toBe('http://www.testingurl.com' )
  })
})