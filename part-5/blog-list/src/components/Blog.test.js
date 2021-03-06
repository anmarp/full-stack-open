import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blog',
    author: 'B. Logger',
    url: 'https://www.google.com/',
    likes: 0,
    user: {
      username: 'user',
      name: 'U. Ser',
      password: 'p4ssw0rd',
      blogs: []
    }
  }

  const mockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateLikes={mockHandler} />
    )
  })

  test('title and author are rendered by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('other details are not rendered by default', () => {
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.user.name)
  })

  test('clicking the view button renders the other details', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.user.name)
  })

  test('clicking the like button calls the event handler twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})