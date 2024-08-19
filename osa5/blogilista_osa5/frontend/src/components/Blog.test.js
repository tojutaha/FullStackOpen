import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog';

describe('', () => {

  const blog = {
    title: 'testTitle',
    author: 'author',
    url: 'url',
    likes: 42,
    user: 'test'
 }

  test('renders title', () => {

    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} blog = {blog} />)
    // screen.debug()

    const element = screen.getByText(/testTitle/i)
    expect(element).toBeInTheDocument()
  })

  test('renders title, author, url, likes and user when View button is pressed', () => {

    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} blog = {blog} />)

    expect(screen.queryByText('testTitle')).toBeNull()

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)
    // screen.debug()

    const titleElement = screen.getByText(/testTitle/i)
    expect(titleElement).toBeInTheDocument()

    const authorElement = screen.getByText(/author/i)
    expect(authorElement).toBeInTheDocument()

    const urlElement = screen.getByText(/url/i)
    expect(urlElement).toBeInTheDocument()

    const likesElement = screen.getByText(/42/i)
    expect(likesElement).toBeInTheDocument()

    // TODO: We dont have this yet in the Blog
    // const userElement = screen.getByText(/testUser/i)
    // expect(userElement).toBeInTheDocument()
  })

  test('clicking the like button calls event handler twice', async () => {

    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    render(<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} blog = {blog} />)

    expect(screen.queryByText('testTitle')).toBeNull()

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    const user = userEvent.setup()
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
