---
layout: ../layouts/BaseLayout.astro
title: "Distributing Modules"
description: "Share your jamovi module with others by side-loading .jmo files or submitting to the jamovi library."
---

Once your module is working as expected, it's time to share it with the world. There are two primary ways to distribute a jamovi module: **Side-loading** (for testing) and the **jamovi library** (for public release).

## 1. Side-loading via `.jmo` files

Every time you run `jmvtools::install()`, it produces a file with the `.jmo` extension in your module's root directory (e.g., `SuperAwesome.jmo`).

This single file **is** your module. It contains all the R code, YAML definitions, and metadata needed to run in jamovi.

### How to Side-load:
1.  Send the `.jmo` file to your colleagues or testers.
2.  In jamovi, open the **jamovi library** (the "plus" icon in the top-right corner).
3.  Select the **Side-load** tab.
4.  Choose the `.jmo` file to install it.

The module will be installed locally and appear in your ribbon menu just as if it were from the store.

## 2. Submitting to the jamovi library

To reach the entire jamovi community, you can submit your module to the official **jamovi library**. This makes your module browseable, searchable, and easy to install for any jamovi user.

### Submission Checklist:
-   **Documentation:** Ensure your analyses have clear titles and descriptions.
-   **Stability:** Verify that your module doesn't crash on empty datasets (using [Guard Clauses](/tutorial/tuts0106-debugging-an-analysis)).
-   **Metadata:** Check your `DESCRIPTION` file for a clear summary and author information.

### How to Submit:
If you are satisfied that your module is ready for broader distribution, please send an email to the jamovi team at **[contact@jamovi.org](mailto:contact@jamovi.org)**. Include a link to your module's source code (e.g., a GitHub repository) or attach the `.jmo` file.

We will review your module to ensure it meets basic quality and security standards and help you through the final steps of getting it listed in the library.

## 3. Versioning and Updates

As you continue to improve your module, remember to update the version number in `0000.yaml` and the `DESCRIPTION` file. jamovi uses these version numbers to notify users when an update is available in the library.

**Next Step:** You've completed the core tutorial series! For more advanced topics, check out the [Additional Notes](/tutorial/tuts0110-additional-notes).
