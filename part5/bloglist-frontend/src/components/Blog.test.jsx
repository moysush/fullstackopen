import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import Blog from "./Blog"

test('blog renders the title and author', () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }

    render(<Blog blog={blog} />)

    screen.getByText(/React patterns/)
    const url = screen.queryByText("https://reactpatterns.com/")
    const likes = screen.queryByText(/Likes: 7/)

    // expect(titleAndAuthor).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
})