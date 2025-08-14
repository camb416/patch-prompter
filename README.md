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

# AI Features to Be Implemented (for MVP v0.1)
- Prompt Engineering
  - The MVP for Prompt Patcher is essentially a playground-like tool for experimenting with prompt engineering. While there are many browser-based playgrounds for testing text-based LLMs, it remains difficult, outside of a ComfyUI environment, to make creative decisions around genAI prompts. By adding a scoring system to image outputs, data will be collected around successful prompts, in hopes of improving them alongside the development of new models.
- Observability Tools
  - By using Langsmith, Prompt Patcher creates an additional layer for executives and creative directors to see how images are being built by teams. The intention is to break down individual creative language and seek out how genAI systems tokenize for diffusion model outputs. In practice, this will look like stakeholders shuffling through outputs and inspecting the prompts that create great imagery, even if it's not the ones ultimately selected by the direct users of the software.

  The rationale behind leaning so hard into prompt engineering, is that the effectiveness of a creative service project is quite far downstream of the creative prompt. Evaluation, Observability and Structuring outputs offer the ability to drill deeper into the use of LLM prompts, but investing in the development of those systems may not prove a reasonable ROI when a better metric will be saving time and getting more and better images out of genAI models, without attempting to remove artists and creative pros from the process.
  
# Additional AI Features to be Implemented for Followup Releases

- Evaluation Frameworks (v1.1)
  - In future releases, metrics around "number of images generated per session" and "creative opportunity" and "project margin" may be able to feed back into the rubric for upvoting prompt components. Identifying that certain words lead to more profit on a project would be both hilarious and potentially meaningful.

- Structured outputs (v1.2)
  - While the intention is for a human-in-the-loop design for Patch Prompter, an additional agentic layer may be considered that would generate the patches automatically, by including the user-submitted ratings of prompt components to automatically generate patches that can be edited later.

- Observability Tools (v2.0)
  - In future releases, creating an opt-in to share more widely collected images from a genAI session may be included as part of the Prompt Patcher app.

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
