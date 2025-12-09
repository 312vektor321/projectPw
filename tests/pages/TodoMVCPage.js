// pages/TodoMVCPage.js
export default class TodoMVCPage {
    constructor(page) {
        this.page = page;
        this.input = page.getByPlaceholder("What needs to be done?");
    }

    async goto() {
        await this.page.goto("https://demo.playwright.dev/todomvc/");
    }

    async addTodo(taskName) {
        await this.input.fill(taskName);
        await this.input.press("Enter");
    }

    getTodoItem(taskName) {
        return this.page.getByTestId("todo-item").filter({ hasText: taskName });
    }

    async completeTodo(taskName) {
        const todoItem = this.getTodoItem(taskName);
        await todoItem.locator('input\[type="checkbox"\]').check();
    }

    async deleteTodo(taskName) {
        const todoItem = this.getTodoItem(taskName)
        await todoItem.hover()
        await todoItem.getByRole('button', { name: 'Delete' }).click();
    }
}