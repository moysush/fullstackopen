import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe('blogs', () => {
    beforeEach(() => {
        const blog = {
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            user: {
                name: "test user"
            }
        }
        render(<Blog blog={blog} />)

    })
    test('blog renders the title and author', () => {

        screen.getByText(/React patterns/)
        const url = screen.queryByText("https://reactpatterns.com/")
        const likes = screen.queryByText(/Likes: 7/)

        // expect(titleAndAuthor).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test("blog's URL and number of likes are shown when the button is clicked", async () => {
        const user = userEvent.setup()
        await user.click(screen.getByText("View"))

        // screen.getByText("https://reactpatterns.com/")
    })

})