# starterPage

Basic starter page using:
- Bootstrap
- Bootstrap icons
- JavaScript
- jQuery

## Custom Configuration

Add custom configuration by editing the lib/js/config.js file.
- Links: Add you own custom links by editing the existing links or appending to them.
- Username: Change you username by updating the username parameter.
- Backgrounds: Drop the file into the img directory and add the filename to the images array.
- Image path: Update this parameter if you want to point to a different images directory (**Note**: the files referenced by the images parameter must exist in the new directory).
- Search Engine: You can change the search engine by editing the search paramerter.



```
const settings = {
  links: {
    google: "https://www.google.com/",
    bing: "https://www.bing.com/",
    bootstrap: "https://getbootstrap.com/",
    Github: "https://github.com",
    jQuery: "https://jquery.com/",
  },
  username: "You",
  images: ["bg1.jpg", "bg2.png"],
  imagespath: "img/",
  search: "https://www.google.com/search",
};
```
