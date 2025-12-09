import { test, expect } from "@playwright/test";
import TodoMVCPage from "../pages/TodoMVCPage.js";

test("should add and complete todo", async ({ page }) => {
    const todoPage = new TodoMVCPage(page);
    await todoPage.goto();

    const taskName = "Write Code";

    const todoItem = todoPage.getTodoItem(taskName);

    await todoPage.addTodo(taskName);

    await todoPage.completeTodo(taskName);

    await todoPage.deleteTodo(taskName);

    await expect(todoItem).not.toBeVisible()
});