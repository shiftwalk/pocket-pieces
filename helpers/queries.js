export const homeQuery = `{
  "home": *[_type == "home"][0]{
    title,
    introText,
    footerText,
    image {
      asset-> {
        ...
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
    posterVideoReel {
      asset-> {
        ...
      }
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  }
}`

export const aboutQuery = `{
  "about": *[_type == "about"][0]{
    title,
    heroText,
    reelImages[] {
      asset-> {
        ...
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
    aboutText,
    polaroids[] {
      text,
      images[] {
        asset-> {
          ...
        },
        caption,
        alt,
        hotspot {
          x,
          y
        },
      }
    },
    bioText,
    testimonials[] {
      text,
      images[] {
        asset-> {
          ...
        },
        caption,
        alt,
        hotspot {
          x,
          y
        },
      },
      instagramHandle
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  }
}`

export const infoQuery = `{
  "info": *[_type == "info"][0]{
    title,
    heroImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sections[] {
      heading,
      questions[] {
        question,
        answer
      }
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  }
}`

export const privacyQuery = `{
  "privacy": *[_type == "privacy"][0]{
    title,
    heroImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    sections[] {
      heading,
      questions[] {
        question,
        answer
      }
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  }
}`

export const contactQuery = `{
  "contact": *[_type == "contact"][0]{
    title,
    introText,
    heroImage {
      asset-> {
        ...
      },
      caption,
      alt,
      hostpot {
        x,
        y
      }
    },
    emails[] {
      title,
      address
    },
    socials[] {
      title,
      url
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  }
}`
