import { expect, test } from "@playwright/test"

test.describe("Story Creation Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Start from the dashboard as specified in demo steps
    await page.goto("./dashboard")
  })

  test("1. Story Creation Initiation", async ({ page }) => {
    // Verify "New Story" button exists and click it
    const newStoryButton = page.getByRole("button", { name: "New Story" })
    await expect(newStoryButton).toBeVisible()
    await newStoryButton.click()

    // Verify story creation interface loads
    const storyCreationInterface = page.getByTestId("story-creation-interface")
    await expect(storyCreationInterface).toBeVisible()
  })

  test("2. Story Direction Input", async ({ page }) => {
    // Navigate to story creation
    await page.getByRole("button", { name: "New Story" }).click()

    // Enter story title
    const titleInput = page.getByLabel("Story Title")
    await titleInput.fill("The Mountain's Secret")
    await expect(titleInput).toHaveValue("The Mountain's Secret")

    // Input story direction
    const directionInput = page.getByLabel("Story Direction")
    await directionInput.fill("A mysterious mountain cave holds an ancient artifact")
    await expect(directionInput).toHaveValue("A mysterious mountain cave holds an ancient artifact")

    // Select genre
    const genreSelect = page.getByLabel("Genre")
    await genreSelect.selectOption("Fantasy")
    await expect(genreSelect).toHaveValue("Fantasy")

    // Verify all inputs are saved
    const saveIndicator = page.getByTestId("save-status")
    await expect(saveIndicator).toHaveText("All changes saved")
  })

  test("3. Element Selection", async ({ page }) => {
    // Navigate to story creation
    await page.getByRole("button", { name: "New Story" }).click()

    // Open element selector
    const elementSelector = page.getByRole("button", { name: "Select Elements" })
    await elementSelector.click()

    // Select character
    await page.getByRole("tab", { name: "Characters" }).click()
    await page.getByRole("button", { name: "Mountain Guide" }).click()

    // Select location
    await page.getByRole("tab", { name: "Locations" }).click()
    await page.getByRole("button", { name: "Misty Peaks" }).click()

    // Select item
    await page.getByRole("tab", { name: "Items" }).click()
    await page.getByRole("button", { name: "Ancient Map" }).click()

    // Verify elements appear in sidebar
    const sidebar = page.getByTestId("elements-sidebar")
    await expect(sidebar).toContainText("Mountain Guide")
    await expect(sidebar).toContainText("Misty Peaks")
    await expect(sidebar).toContainText("Ancient Map")
  })

  test("4. AI Generation", async ({ page }) => {
    // Navigate and setup story
    await page.getByRole("button", { name: "New Story" }).click()
    await page.getByLabel("Story Title").fill("The Mountain's Secret")

    // Click generate story
    const generateButton = page.getByRole("button", { name: "Generate Story" })
    await generateButton.click()

    // Verify loading state
    await expect(page.getByTestId("ai-generation-loading")).toBeVisible()

    // Verify content appears in editor
    const editor = page.getByTestId("story-editor")
    await expect(editor).not.toBeEmpty()

    // Confirm content includes selected elements
    const editorContent = await editor.textContent()
    expect(editorContent).toContain("Mountain Guide")
    expect(editorContent).toContain("Misty Peaks")
    expect(editorContent).toContain("Ancient Map")
  })

  test("5. Content Editing", async ({ page }) => {
    // Navigate to story with content
    await page.getByRole("button", { name: "New Story" }).click()
    await page.getByTestId("story-editor").click()

    // Edit first paragraph
    await page.keyboard.type("The morning mist clung to the mountains like a silk veil.")
    
    // Add new description
    await page.keyboard.press("Enter")
    await page.keyboard.type("The ancient stones whispered secrets of the past.")

    // Format text (bold, italic)
    await page.keyboard.press("Control+a")
    await page.getByRole("button", { name: "Bold" }).click()
    
    // Verify edits are preserved
    await page.reload()
    const editor = page.getByTestId("story-editor")
    await expect(editor).toContainText("The morning mist clung to the mountains")
  })

  test("6. Story Preview", async ({ page }) => {
    // Navigate to story with content
    await page.getByRole("button", { name: "New Story" }).click()

    // Click preview button
    await page.getByRole("button", { name: "Preview" }).click()

    // Verify formatted story display
    const preview = page.getByTestId("story-preview")
    await expect(preview).toBeVisible()

    // Check element references
    await expect(preview.getByTestId("element-reference")).toBeVisible()

    // Confirm layout matches expected design
    await expect(preview).toHaveScreenshot("story-preview.png")
  })

  test("7. Publishing Flow", async ({ page }) => {
    // Navigate to story with content
    await page.getByRole("button", { name: "New Story" }).click()

    // Click publish button
    const publishButton = page.getByRole("button", { name: "Publish" })
    await publishButton.click()

    // Verify confirmation dialog
    const confirmDialog = page.getByRole("dialog")
    await expect(confirmDialog).toBeVisible()

    // Confirm publication
    await page.getByRole("button", { name: "Confirm Publication" }).click()

    // Check story appears in public feed
    await page.goto("./public-feed")
    await expect(page.getByText("The Mountain's Secret")).toBeVisible()
  })
}) 