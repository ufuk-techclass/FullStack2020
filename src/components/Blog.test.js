import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
//import Togglable from './Togglable'

const blogData = {
  title: 'test-title-5',
  author: 'test-author-5',
  likes: 1,
  user: {
    username: 'test-username-5'
  }
}

let component
const mockHandler = jest.fn()

describe('Blog list tests', () => {

  beforeEach(() => {

    mockHandler.mock.calls = []
    component = render(
      <Blog blog={blogData} addLike={mockHandler} />
    )
  })

  test('5.13 Renders "title" (visible), does not render remaining properties(hided)', () => {

    const div = component.container.querySelector('.testInvisible')
    expect(div).toHaveStyle('display: none')

    const hiddenDiv = component.container.querySelector('.testVisible')
    expect(hiddenDiv).toHaveStyle('display: block')

  })


  test('5.14 Checks author, url and number of likes when "view" button is clicked', () => {

    //initially hidden
    const div = component.container.querySelector('.testInvisible')
    expect(div).toHaveStyle('display: none')

    //"view" button is clicked to show details
    const button = component.getByText('view')
    fireEvent.click(button)

    //elements are visible
    expect(div).toHaveStyle('display: block')

  })

  test('5.15 the like button is clicked twice, the event is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })

  test('other tests', () => {


    /*
      let componentA = render(
        <div className={'blogStyle'}>
          Title:1
          <Togglable buttonLabel="view">
            <div>Author:2</div>
            <div className="testStyle">URL:3</div>
            <div>Likes:4<button onClick={() => mockHandler()} >like2</button></div>
            <div>Added by:5</div>
          </Togglable>
        </div >
      )
    */


    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)


    // component.debug()

    //method1
    /* expect(component.container).toHaveTextContent(
       'kkk'
     )*/

    //method2

    const element = component.getByText(
      'like'
    )
    expect(element).toBeDefined()




    /*  const div = componentA.container.querySelector('.testStyle')
      expect(div).toHaveTextContent(
        'URL:'
      )

      expect(div).toBeDefined()
      expect(div).not.toHaveStyle('display: none')
    */

  })
})