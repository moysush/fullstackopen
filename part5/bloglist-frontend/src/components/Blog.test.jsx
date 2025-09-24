import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe('blogs', () => {
    let mockHandler
    beforeEach(() => {
        mockHandler = vi.fn()
        const blog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            user: {
                name: "test user"
            }
        }
        render(<Blog blog={blog} updatelikes={mockHandler} />)

    })
    test('blog renders the title and author', () => {

        screen.getByText(/React patterns/)
        const url = screen.queryByText("https://reactpatterns.com/")
        const likes = screen.queryByText(/Likes: 7/)

        // expect(titleAndAuthor).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    describe("blog's view button", () => {
        const user = userEvent.setup()

        test("blog's URL and number of likes are shown when the button is clicked", async () => {
            await user.click(screen.getByText("View"))
            expect(screen.getByText("https://reactpatterns.com/")).toBeDefined();
            screen.getByText(/Likes: 7/)
        })

        test("like button clicked twice", async () => {
            await user.click(screen.getByText("View"))
            // clicking twice
            await user.click(screen.getByText("Like"))
            await user.click(screen.getByText("Like"))
            // checking the function handler using mockHandler calls length
            expect(mockHandler.mock.calls.length).toBe(2)
        })
    })

})