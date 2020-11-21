import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('submitting a new blog calls the event handler with the right details', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const blog = {
      title: 'Test Blog',
      author: 'T. Ester',
      url: 'https://www.google.com/'
    }

    const inputs = ['title', 'author', 'url']

    inputs.forEach(input => {
      const inputField = component.container.querySelector(`#${input}`)
      fireEvent.change(inputField, {
        target: { value: blog[input] }
      })
    })

    const form = component.container.querySelector('.form')

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      expect(createBlog.mock.calls[0][0][input]).toContain(blog[input])
    }
  })
})