---
layout: doc
aside: false
---

# <name_of_experiment>

## Videos

### <video_subheading>:

[<text_name_of_video>](link_to_required_video)

### Lagu paTa:

<!-- DO NOT DO: -->
<!-- <iframe width="420" height="315" src="https://youtu.be/ySn0PQEIvYg"></iframe> -->

<!-- INSTEAD DO: -->
<!-- <iframe :class="$style.video" src="https://www.youtube.com/embed/ySn0PQEIvYg"></iframe> -->

<iframe :class="$style.video" src="<source_of_video_with_youtube_dot_com_domain_in_embed_form>"></iframe>

<style module>

  .video {
    aspect-ratio: 304 / 154;
    width: 100%;
    border: none;
  }

</style>
