# Patch Prompter

# Overview
Patch Prompter is a node-based workflow for generating text and image-based AI prompts. 

For similar examples of patch programming, see [TouchDesigner](https://derivative.ca/), [vvvv](https://vvvv.org/), [Blender Geometry Nodes](https://docs.blender.org/manual/en/latest/modeling/geometry_nodes/introduction.html), [Max](https://cycling74.com/products/max), or [ComfyUI](https://www.comfy.org/).

While ComfyUI seeks to build complex and repeatable workflows for local genAI models, Patch Prompter is a thin layer for creating batches that can be sent to any AI model, saved, and shared. An observability and human-in-the-loop feedback system will help with how the prompt systems are built, and ultimately will help create more beautiful images and moving pictures with AI, driven by artists.

## Impetus

Right now, commercial artists using AI in their creative process for large studios are using their own unique workflows, built from a patchwork of different models. They use trial-and-error to build text prompts to realize their vision with genAI systems. These techniques, often shared online, sometimes do not even reflect the way the underlying systems work. By collecting data about what components of prompts work on these systems, creatives can share their successes with artists and get more consistent results, ultimately leading to better outcomes for clients, faster.

# Use Case & Workflow
The Use Case for Patch Prompter is for a Creative Director who is looking for a specific look and wants to roll out a particular style to a large team of artists to match, and improve upon over the course of a project.

1. The Creative Director uses Patch Prompter to generate a good "look" or example output for a project.
2. The Creative Director uses an up and down-voting system to tag the outputs they got along the way to getting their look.
3. The Creative Director downloads their best work, which both flags to the Patch Prompter database, that the image was downloaded (upvoting it highly). This download includes the prompt data in the image metadata.
4. Artist teams can then import the example works, and reconstitue the "patch" that created the prompt. They use this node graph to generate new content for a campaign, adding their own prompt components and improvements along the way.
5. The next time the Creative Director starts a project, they have new templates, and suggestions for prompt components (with example thumbnails) available so they never start from scratch again.
6. Executive Creative Directors can also observe across projects what outputs are working, and what prompts are consistently used, using Langsmith observability.
7. Stretch goal: Creative Directors can provide plain english descriptions of the project they're on, and receive suggested prompt components using RAG.

By using a system like this, the prompt data is always saved, easily accessible, including the details about what genAI model is used. The Patch Prompter features help with new improvements, but the prompt and model metadata should allow others not using Patch Prompter to recreate similar images using the basic ChatGPT UI as well.

# AI Features to Be Implemented
- List and briefly describe the AI components you plan to include:
  - Prompt engineering
  - Structured outputs
  - Retrieval-Augmented Generation (RAG) and vector databases
  - Evaluation frameworks
  - Observability tools
- Justify why each feature is relevant to your use case.

# Technical Approach
- Outline how the system would be built at a high level.
- Mention tools, models, or services you would use (e.g., LLM APIs, vector stores, Cursor).

# Example Prompts & Expected Outputs
- Include 1–2 sample prompts and describe the kind of responses your app would generate.
- Highlight any structured output or formatting strategies.

# Evaluation Strategy
- Briefly describe how you would assess your system’s effectiveness.
- Include any metrics or evaluation methods you would use.

# Observability Plan
- Note how you would track performance, errors, or usage patterns over time.

# Link to Proposal
- Upload your completed proposal as a README.md file in a public GitHub or BitBucket repo.
- Submit the link through the MBA Center under Week 7 - Project Week.
