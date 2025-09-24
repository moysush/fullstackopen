import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("BlogForm tests", async () => {
    test("new blog is created with correct informations when called with form's event handler", async () => {
        const user = userEvent.setup()
        const mockHandler = vi.fn()

        render(<BlogForm newBlog={mockHandler} />)

        const screenByLabel = (label) => {
           return screen.getByLabelText(label)
        }

        await user.type(screenByLabel("Title:"), "Hello, Mars!")
        await user.type(screenByLabel("Author:"), "Sush")
        await user.type(screenByLabel("URL:"), "sush.hellomars.com")

        await user.click(screen.getByText("Create"))

        expect(mockHandler.mock.calls[0][0]).toStrictEqual(
            {
                title: 'Hello, Mars!', author: 'Sush', url: 'sush.hellomars.com'
            }
        )
    })
})