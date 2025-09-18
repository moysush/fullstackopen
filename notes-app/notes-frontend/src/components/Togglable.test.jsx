import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { beforeEach, describe } from 'vitest'

describe('<Togglable />', () => {
    beforeEach(() => {
        render(
            <Togglable buttonLabel="show...">
                <div>togglable content</div>
            </Togglable>
        )
    })

    // test('renders its children', () => {
    //     screen.queryByText('togglable content')
    // })

    test('at start the children are not displayed', () => {
        const element = screen.queryByText('togglable content')
        expect(element).toBeNull()
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const element = screen.getByText('togglable content')
        expect(element).toBeVisible()
    })

})