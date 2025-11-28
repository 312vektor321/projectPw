import { test, expect } from '@playwright/test';

test('filter completed todos', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const taskInput = page.locator('.new-todo');

    await taskInput.fill('Task 1');
    await taskInput.press('Enter');

    await taskInput.fill('Task 2');
    await taskInput.press('Enter');

    await expect(page.locator('.todo-list li', { hasText: 'Task 1' })).toBeVisible();
    await expect(page.locator('.todo-list li', { hasText: 'Task 2' })).toBeVisible();

    const firstTask = page.locator('.todo-list li:nth-child(1)');
    const toggleCheckbox = firstTask.locator('.toggle');

    await toggleCheckbox.click();

    await expect(firstTask).toHaveClass(/completed/);

    const completedFilter = page.locator('.filters li a:has-text("Completed")');
    await completedFilter.click();

    const visibleTodos = page.locator('.todo-list li:visible');

    await expect(visibleTodos).toHaveCount(1);

});