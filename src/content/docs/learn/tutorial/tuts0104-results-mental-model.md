---
layout: ../layouts/BaseLayout.astro
title: "The jamovi Results Model"
description: "Understand the hierarchical relationship between your R code and the jamovi results panel."
---

Before we dive into building complex tables, it's important to understand the **Mental Model** of how jamovi handles results. In the previous section, we used a simple "text" box, but jamovi's true power lies in its **Rich Results** system.

## 1. The Container vs. The Content

Developing jamovi results is a two-step process:

1.  **The Container (`.r.yaml`):** You define *what* items will appear (tables, plots, etc.) and their structure (columns, titles, formats).
2.  **The Content (`.b.R`):** You perform calculations and "pour" them into those containers.

## 2. The Results Tree

Think of `self$results` as a tree that mirrors your `.r.yaml` file. If your results definition looks like this:

```yaml
# .r.yaml
items:
  - name: myTable
    type: Table
    ...
  - name: myPlot
    type: Image
    ...
```

Then in your R code, you access them using the same names:

```r
# .b.R
self$results$myTable  # Accesses the table
self$results$myPlot   # Accesses the plot
```

## 3. The Lifecycle: Init vs. Run

jamovi analyses go through two main phases:

*   **Init (Initialization):** jamovi looks at the `.r.yaml` and creates the "skeleton" of the results. This is why you see empty tables appear immediately when you drag a variable into a box.
*   **Run (Calculation):** Your `.run()` function in R executes, performs the heavy lifting, and populates the skeleton with data.

## 4. Why not just use `print()`?

While `print()` or `setContent()` works for quick debugging, they produce static text. jamovi's **Rich Tables** provide:
*   **Dynamic Updating:** Only the necessary cells update when an option changes.
*   **Professional Formatting:** Tables are automatically formatted for publication.
*   **Interactivity:** Users can click on results to see underlying data or export them to other formats.

**Next Step:** Now that you understand the model, let's [create a Rich Table](/tutorial/tuts0105-creating-rich-results) in your results definition.
