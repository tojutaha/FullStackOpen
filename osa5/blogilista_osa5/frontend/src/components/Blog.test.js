import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog';

test('renders content', () => {

  const blog = {
    title: 'testTitle',
    author: 'author',
    url: 'url',
    likes: 42,
    user: 'test'
  }

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} blog = {blog} />)

  expect(screen.queryByText('testTitle')).toBeNull()

  const viewButton = screen.getByText('View')
  fireEvent.click(viewButton)
  console.log(screen.debug())

  const element = screen.getByText(/testTitle/i)
  expect(element).toBeInTheDocument()
})
/*
test('renders content', async () => {

  const blog = {
    title: 'testTitle',
    author: 'author',
    url: 'url',
    likes: 42,
    user: 'test'
  }

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog updateBlog={updateBlog} deleteBlog={deleteBlog} blog = {blog} />)
  console.log(screen.debug())

  expect(screen.queryByText('testTitle')).toBeNull()

  const viewButton = screen.getByText('View')
  fireEvent.click(viewButton)

  const element = await waitFor(() => screen.getByText('testTitle'))
  expect(element).toBeInTheDocument()
})
*/
