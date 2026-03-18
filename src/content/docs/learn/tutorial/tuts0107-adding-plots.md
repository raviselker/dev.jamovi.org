---
layout: ../layouts/BaseLayout.astro
title: "Adding Plots"
description: "Learn how to integrate ggplot2 into your jamovi analysis using the State/Render model."
---

In this section, we'll add a descriptive plot to our t-test using the popular `ggplot2` package.

## 1. Define the Image in YAML

Plots are items in your results, so we need to add an `Image` entry to `jamovi/ttest.r.yaml`.

```yaml
# ... (existing ttest table)
    - name: plot
      title: Descriptives Plot
      type: Image
      width:  400
      height: 300
      renderFun: .plot
```

*   **type: Image**: Tells jamovi to reserve space for a plot.
*   **renderFun: .plot**: The name of the function in your R code that will handle the drawing.

## 2. Configure Dependencies

To use `ggplot2`, your module must declare it as a dependency. 

1.  **DESCRIPTION:** Add `ggplot2` to the `Imports` line.
    ```text
    Imports: jmvcore, R6, ggplot2
    ```
2.  **NAMESPACE:** Ensure the package is available.
    ```text
    import(ggplot2)
    ```

## 3. The Plotting Model: State vs. Render

jamovi uses a two-stage system to make plotting fast and responsive:

1.  **`.run()` (State):** You calculate the means, errors, and levels, then save them to the image's **state**. 
2.  **`.plot()` (Render):** You take the data from the state and use `ggplot2` to draw the pixels.

> [!TIP]
> **Why separate them?**
> This allows the user to resize the plot in the jamovi UI without re-running the entire statistical analysis. Only the `.plot()` function is called during a resize.

## 4. Implementation in R

Open `R/ttest.b.R` and update your class definition. Notice we use `ggplot2::ggplot` to be explicit:

```r
ttestClass <- R6::R6Class("ttestClass",
    inherit = ttestBase,
    private = list(
        .run = function() {
            # ... (existing calculation and table population)

            # 1. Prepare Plot Data
            formula <- jmvcore::constructFormula(self$options$dep, self$options$group)
            formula <- as.formula(formula)

            means  <- aggregate(formula, self$data, mean)[,2]
            ses    <- aggregate(formula, self$data, function(x) sd(x)/sqrt(length(x)))[,2]
            sel    <- means - ses
            seu    <- means + ses
            levels <- base::levels(self$data[[self$options$group]])
            
            plotData <- data.frame(level=levels, mean=means, sel=sel, seu=seu)

            # 2. Save the data to the image state
            image <- self$results$plot
            image$setState(plotData)
        },

        .plot = function(image, ...) {
            # 3. Retrieve the data from state
            plotData <- image$state
            if (is.null(plotData))
                return(FALSE)

            # 4. Create the ggplot
            p <- ggplot2::ggplot(plotData, ggplot2::aes(x=level, y=mean)) +
                ggplot2::geom_errorbar(ggplot2::aes(ymin=sel, ymax=seu), width=.1) +
                ggplot2::geom_point() +
                ggplot2::labs(title=self$options$dep, x=self$options$group, y=self$options$dep) +
                ggplot2::theme_bw()

            # 5. Explicitly print the plot
            print(p)

            # 6. Return TRUE to signal success
            TRUE
        })
)
```

> [!IMPORTANT]
> **Don't forget the `TRUE`!**
> Returning `TRUE` notifies the rendering system that you have successfully plotted something. If you return `FALSE`, your plot will not appear.

And the result will look like this:

![final plot](../../../../assets/tuts0107-adding-plots-final.png)

**Next Step:** Your analysis is complete! Now let's learn how to [distribute your module](/tutorial/tuts0109-distributing-modules).
