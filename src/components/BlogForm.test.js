import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

let component
const mockHandler = jest.fn()

let title, author, url

describe('Blog list tests', () => {

  beforeEach(() => {

    mockHandler.mock.calls = []
    component = render(
      <BlogForm
        addBlog={mockHandler}
        newBlog={{
          title: title,
          author: author,
          url: url
        }}
        handleTitleChange={({ target }) => mockHandler({ title: target.value })}
        handleAuthorChange={({ target }) => mockHandler({ author: target.value })}
        handleUrlChange={({ target }) => mockHandler({ url: target.value })}
      />
    )
  })

  test('5.16 ', () => {

    const author = component.container.querySelector('#testauthor')
    const title = component.container.querySelector('#testtitle')
    const url = component.container.querySelector('#testurl')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'aaaaaaaaa' }
    })

    fireEvent.change(title, {
      target: { value: 'bbbbbbbbbb' }
    })

    fireEvent.change(url, {
      target: { value: 'ccccccccccc' }
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(4)
    expect(mockHandler.mock.calls[0][0].author).toBe('aaaaaaaaa')
    expect(mockHandler.mock.calls[1][0].title).toBe('bbbbbbbbbb')
    expect(mockHandler.mock.calls[2][0].url).toBe('ccccccccccc')
  })
})