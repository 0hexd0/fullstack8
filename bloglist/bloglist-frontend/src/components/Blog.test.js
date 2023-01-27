import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const addLikes = jest.fn()

const user = {
  name: 'Superuser',
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzYzdiMTA2M2FlODk3OGZmYjM1MDZlZSIsImlhdCI6MTY3NDA0NDE4NCwiZXhwIjoxNjc0MjE2OTg0fQ.bqEcB1Ntt2jwHk86jMlVo-UsLdcFkhpE1tch3VzJoy0',
  username: 'test'
}

const blog = {
  title: 'My Book',
  author: 'AAA',
  url: '111',
  user: {
    username: 'test',
    name: 'Superuser',
    blogs: [
      '63c7c2523ae8978ffb350764'
    ],
    id: '63c7b1063ae8978ffb3506ee'
  },
  likes: 9,
  id: '63c7c2523ae8978ffb350764'
}

const canRemove = (blog) => blog.user && blog.user.username === user.username

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} canRemove={canRemove}  addLike={addLikes}/>).container
  })

  test('at start only the title row is displayed', () => {
    const titleRow = container.querySelector('.title-row')
    const detailRows = container.querySelector('.detail-rows')
    expect(titleRow).not.toHaveStyle('display: none')
    expect(detailRows).toHaveStyle('display: none')
  })

  test('after clicking the button, detail rows are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const detailRows = container.querySelector('.detail-rows')
    expect(detailRows).not.toHaveStyle('display: none')
  })

  test('likes button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect( addLikes.mock.calls).toHaveLength(2)
  })
})

